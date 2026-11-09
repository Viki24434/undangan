import { useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useInvitation } from '../Invitation/InvitationContext';
import { DesignEditorContext } from './DesignEditorContext';
import { DESIGN_SECTIONS, NATIVE_SELECTOR, entryFrames } from './designConfig';
import DesignLayer from './DesignLayer';
import useDesignBackdrops from './useDesignBackdrops';
import DesignBackdrops from './DesignBackdrops';
import DesignNativeArtwork from './DesignNativeArtwork';
import './TemplateDesignRuntime.css';
import {
  themeAttributes,
  themePalette,
  themeStyles,
} from '../../config/invitationTheme';

export default function TemplateDesignRuntime({ root }) {
  const invitation = useInvitation();
  const editor = useContext(DesignEditorContext);
  const design = invitation?.data.design;
  const theme = invitation?.data.theme;
  const [targets, setTargets] = useState([]);
  const [geometryVersion, setGeometryVersion] = useState(0);
  const [nativeTargets, setNativeTargets] = useState([]);
  const original = useRef(new Map());
  const runtimeId = useId();
  const mountKeys = useRef(new WeakMap());
  const sequence = useRef(0);
  const active = Boolean(design || editor || theme?.sections);
  const editing = Boolean(editor && !editor.playing);
  const backdrops = useDesignBackdrops(root, active);

  useEffect(() => {
    if (!editing || !root.current) return;
    const host = root.current;
    let frame;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        setGeometryVersion((value) => value + 1),
      );
    };
    host.addEventListener('load', refresh, true);
    return () => {
      host.removeEventListener('load', refresh, true);
      cancelAnimationFrame(frame);
    };
  }, [editing, root]);

  useEffect(() => {
    if (!root.current || !active) return;
    const host = root.current;
    const scan = () => {
      const next = DESIGN_SECTIONS.flatMap((section) => {
        const node = host.querySelector(section.selector);
        if (!node) return [];
        if (!mountKeys.current.has(node))
          mountKeys.current.set(node, `${runtimeId}-${sequence.current++}`);
        const mount = mountKeys.current.get(node);
        node.dataset.designMount = mount;
        return [{ ...section, mount }];
      });
      setTargets((current) =>
        current.length === next.length &&
        current.every((section, index) => section.mount === next[index].mount)
          ? current
          : next,
      );
    };
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(host, { subtree: true, childList: true });
    return () => observer.disconnect();
  }, [root, active, runtimeId]);

  useEffect(() => {
    const animations = [];
    const observers = [];
    const natives = [];
    const themeAttributeSnapshots = [];
    const palette = {
      global: editor && root.current ? themePalette(root.current) : {},
      sections: {},
    };
    const artworkSnapshots = new Map();
    const snapshots = original.current;
    for (const backdrop of backdrops) {
      const group = root.current?.querySelector(
        `[data-backdrop-group="${backdrop.mount}-${backdrop.side}"]`,
      );
      if (!group) continue;
      Object.assign(group.style, backdrop.style);
      snapshots.set(group, group.getAttribute('style'));
      group.querySelectorAll('[data-backdrop-index]').forEach((element) => {
        const layer = backdrop.layers[Number(element.dataset.backdropIndex)];
        Object.assign(element.style, {
          backgroundImage: layer.image,
          backgroundPosition: layer.position,
          backgroundSize: layer.size,
          backgroundRepeat: layer.repeat,
        });
        snapshots.set(element, element.getAttribute('style'));
      });
    }
    for (const section of targets) {
      const node = root.current?.querySelector(
        `[data-design-mount="${section.mount}"]`,
      );
      if (!node) continue;
      if (editor) node.dataset.designEditing = String(!editor.playing);
      const sectionStyle = node.getAttribute('style');
      const sectionTheme = theme?.sections?.[section.id];
      if (sectionTheme) {
        Object.entries(themeStyles(sectionTheme)).forEach(([key, value]) => {
          if (key.startsWith('--')) node.style.setProperty(key, value);
          else node.style[key] = value;
        });
        Object.entries(themeAttributes(sectionTheme)).forEach(
          ([key, value]) => {
            themeAttributeSnapshots.push([node, key, node.getAttribute(key)]);
            node.setAttribute(key, value);
          },
        );
      }
      if (editor) palette.sections[section.id] = themePalette(node);
      if (getComputedStyle(node).position === 'static')
        node.style.position = 'relative';
      const setting = design?.sections?.[section.id];
      const frames = entryFrames(setting?.reveal);
      if (
        frames &&
        (!editor || editor.playing) &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        const observer = new IntersectionObserver(
          ([record]) => {
            if (!record.isIntersecting) return;
            node.style.opacity = '1';
            animations.push(
              node.animate(frames, {
                duration: (setting.duration || 1) * 1000,
                easing:
                  setting.reveal === 'type' ? 'steps(24, end)' : 'ease-out',
                fill: 'backwards',
              }),
            );
            observer.disconnect();
          },
          { threshold: 0.03 },
        );
        observer.observe(node);
        observers.push(observer);
      }
      const nativeNodes = [
        ...Array.from(node.querySelectorAll(NATIVE_SELECTOR)),
        ...Array.from(
          root.current?.querySelectorAll(
            `[data-divider-section="${section.id}"] [data-design-ornament]`,
          ) || [],
        ),
      ]
        .filter((item) => !item.closest('[data-design-layer]'))
        .sort(
          (a, b) =>
            Number(a.dataset.designExtra === 'true') -
            Number(b.dataset.designExtra === 'true'),
        );
      const occurrences = new Map();
      nativeNodes.forEach((element, index) => {
        const asset =
          element.dataset.designKey ||
          element.dataset.ornament ||
          Array.from(element.classList).find(
            (name) =>
              name.startsWith('champagne-scenery__layer--') ||
              name.startsWith('platinum-chapter__art--'),
          ) ||
          'Ornamen bingkai';
        const identifier = asset.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        const occurrence = occurrences.get(identifier) || 0;
        occurrences.set(identifier, occurrence + 1);
        const key = `${section.id}:${identifier}:${occurrence}`;
        const legacyKey = `${section.id}:${index}`;
        element.dataset.designNative = key;
        element.dataset.designSection = section.id;
        if (editor) element.dataset.designEditing = String(!editor.playing);
        if (!mountKeys.current.has(element))
          mountKeys.current.set(element, `${runtimeId}-${sequence.current++}`);
        const artworkMount = mountKeys.current.get(element);
        element.dataset.designNativeMount = artworkMount;
        if (!snapshots.has(element))
          snapshots.set(element, element.getAttribute('style'));
        const patch = design?.native?.[key] || design?.native?.[legacyKey];
        const parent = element.offsetParent || node;
        const style = getComputedStyle(element);
        const geometry = {
          x: (element.offsetLeft / (parent.clientWidth || 1)) * 100,
          y: (element.offsetTop / (parent.clientHeight || 1)) * 100,
          width: (element.offsetWidth / (parent.clientWidth || 1)) * 100,
          ...(style.height !== 'auto' &&
            element.offsetHeight > 0 && {
              height: (element.offsetHeight / (parent.clientHeight || 1)) * 100,
            }),
          rotate: 0,
          opacity: Number(style.opacity),
          zIndex: Math.max(-5, Math.min(50, Number(style.zIndex) || 1)),
          flipX: false,
          flipY: false,
          hidden: false,
          entry: 'inherit',
          motion: 'inherit',
          duration: 6,
          delay: 0,
          entryDuration: 1,
        };
        natives.push({
          key,
          legacyKey,
          section: section.id,
          label: asset.replace(
            /^(champagne-scenery__layer--|platinum-chapter__art--)/,
            '',
          ),
          displayLabel: element.dataset.designOrnament,
          mount: artworkMount,
          element,
          parent,
          defaults: geometry,
        });
        if (patch) {
          if (patch.asset || patch.src) {
            element.classList.add('template-design-has-replacement');
            element.style.backgroundImage = 'none';
            element.style.fontSize = '0';
          }
          element.classList.toggle(
            'template-design-sized',
            Boolean(patch.height),
          );
          if (patch.height)
            element.querySelectorAll('svg').forEach((artwork) => {
              artworkSnapshots.set(
                artwork,
                artwork.getAttribute('preserveAspectRatio'),
              );
              artwork.setAttribute('preserveAspectRatio', 'none');
            });
          element.style.setProperty('--design-native-opacity', patch.opacity);
          Object.assign(element.style, {
            left: `${patch.x}%`,
            top: `${patch.y}%`,
            right: 'auto',
            bottom: 'auto',
            width: `${patch.width}%`,
            opacity: patch.opacity,
            zIndex: patch.zIndex,
            rotate: `${patch.rotate}deg`,
            scale: `${patch.flipX ? -1 : 1} ${patch.flipY ? -1 : 1}`,
            ...(patch.height && { height: `${patch.height}%` }),
            ...(patch.hidden && { display: 'none' }),
          });
          if (patch.motion !== 'inherit') {
            element.classList.add('template-design-native-motion');
            element.dataset.designMotion = patch.motion;
            element.style.animationName =
              {
                sway: 'designSway',
                float: 'designFloat',
                pulse: 'designPulse',
                spin: 'designSpin',
                flutter: 'designFlutter',
              }[patch.motion] || 'none';
            element.style.animationDuration = `${patch.duration}s`;
            element.style.animationTimingFunction =
              patch.motion === 'spin' ? 'linear' : 'ease-in-out';
            element.style.animationIterationCount = 'infinite';
            element.style.animationDelay = '0s';
          }
          const entry = entryFrames(patch.entry, patch.opacity);
          if (
            entry &&
            (!editor || editor.playing) &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ) {
            const observer = new IntersectionObserver(
              ([record]) => {
                if (!record.isIntersecting) return;
                animations.push(
                  element.animate(entry, {
                    duration: patch.entryDuration * 1000,
                    delay: patch.delay * 1000,
                    easing:
                      patch.entry === 'type' ? 'steps(24, end)' : 'ease-out',
                    fill: 'backwards',
                  }),
                );
                observer.disconnect();
              },
              { threshold: 0.02 },
            );
            observer.observe(element);
            observers.push(observer);
          }
        }
      });
      node.dataset.designScope = section.id;
      if (editor)
        node.dataset.designActive = String(editor.section === section.id);
      if (editor) node.dataset.designEditing = String(!editor.playing);
      if (!original.current.has(node)) original.current.set(node, sectionStyle);
    }
    editor?.onScan({
      sections: targets.flatMap((section) => {
        const node = root.current?.querySelector(
          `[data-design-mount="${section.mount}"]`,
        );
        return node ? [{ ...section, node }] : [];
      }),
      natives,
      palette,
    });
    const nextNativeTargets = natives.map(({ key, legacyKey, mount }) => ({
      key,
      legacyKey,
      mount,
    }));
    setNativeTargets((current) =>
      JSON.stringify(current) === JSON.stringify(nextNativeTargets)
        ? current
        : nextNativeTargets,
    );
    return () => {
      animations.forEach((animation) => animation.cancel());
      observers.forEach((observer) => observer.disconnect());
      themeAttributeSnapshots.forEach(([node, key, value]) => {
        if (value === null) node.removeAttribute(key);
        else node.setAttribute(key, value);
      });
      artworkSnapshots.forEach((ratio, artwork) => {
        if (ratio === null) artwork.removeAttribute('preserveAspectRatio');
        else artwork.setAttribute('preserveAspectRatio', ratio);
      });
      for (const [element, style] of snapshots) {
        if (style === null) element.removeAttribute('style');
        else element.setAttribute('style', style);
        element.classList.remove('template-design-native-motion');
        element.classList.remove('template-design-sized');
        element.classList.remove('template-design-has-replacement');
        delete element.dataset.designMotion;
      }
    };
  }, [
    targets,
    design,
    editor,
    root,
    geometryVersion,
    theme,
    backdrops,
    runtimeId,
  ]);

  return (
    <>
      <DesignBackdrops items={backdrops} />
      {targets.map((section) => {
        const node = document.querySelector(
          `[data-design-mount="${section.mount}"]`,
        );
        return node
          ? createPortal(
              <div className="template-design-layer" aria-hidden="true">
                {editing && (
                  <span className="designer-section-badge">
                    {section.label}
                  </span>
                )}
                {(design?.sections?.[section.id]?.items || []).map((item) => (
                  <DesignLayer
                    key={item.id}
                    item={item}
                    section={section.id}
                    playing={!editor || editor.playing}
                  />
                ))}
              </div>,
              node,
              section.id,
            )
          : null;
      })}
      {nativeTargets.map((target) => {
        const patch =
          design?.native?.[target.key] || design?.native?.[target.legacyKey];
        if (!patch?.asset && !patch?.src) return null;
        const element = document.querySelector(
          `[data-design-native-mount="${target.mount}"]`,
        );
        return element
          ? createPortal(
              <DesignNativeArtwork asset={patch.asset} src={patch.src} />,
              element,
              `replacement-${target.mount}`,
            )
          : null;
      })}
    </>
  );
}
