import { useEffect, useRef, useState } from 'react';
import {
  clampDesign,
  designGeometry,
  designMatrix,
  designPoint,
  findDesignElement,
  canvasPoint,
  designBounds,
  snapDesign,
} from './designGeometry';

function frameFor(element, host) {
  if (!element || !element.offsetWidth || !element.offsetHeight) return null;
  const geometry = designGeometry(element);
  const origin = canvasPoint(host, geometry);
  const matrix = designMatrix(host).inverse().multiply(geometry.matrix);
  const bounds = designBounds(element, host);
  const toolbarWidth = Math.min(300, host.clientWidth - 16);
  const toolbarTop =
    bounds.top - 88 >= host.scrollTop + 8
      ? bounds.top - 88
      : bounds.bottom + 16;
  return {
    width: geometry.width,
    height: geometry.height,
    transform: `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${origin.x}, ${origin.y})`,
    toolbar: {
      width: toolbarWidth,
      left: clampDesign(
        (bounds.left + bounds.right - toolbarWidth) / 2,
        host.scrollLeft + 8,
        host.scrollLeft + host.clientWidth - toolbarWidth - 8,
      ),
      top: clampDesign(
        toolbarTop,
        host.scrollTop + 8,
        host.scrollTop + host.clientHeight - 48,
      ),
    },
  };
}

export default function useDesignCanvas({
  scroller,
  selected,
  section,
  design,
  runtime,
  disabled,
  keepRatio,
  onSelect,
  onChange,
  onSection,
  zoom = 1,
  snapping = true,
}) {
  const [frame, setFrame] = useState(null);
  const [guides, setGuides] = useState([]);
  const action = useRef(null);

  useEffect(() => {
    const host = scroller.current;
    if (!host) return;
    let scheduled;
    const refresh = () => {
      cancelAnimationFrame(scheduled);
      scheduled = requestAnimationFrame(() => {
        const next = disabled
          ? null
          : frameFor(findDesignElement(host, selected), host);
        setFrame((current) =>
          JSON.stringify(current) === JSON.stringify(next) ? current : next,
        );
      });
    };
    refresh();
    host.addEventListener('scroll', refresh);
    host.addEventListener('load', refresh, true);
    const observer = new ResizeObserver(refresh);
    observer.observe(host);
    const element = findDesignElement(host, selected);
    if (element) observer.observe(element);
    window.addEventListener('resize', refresh);
    return () => {
      cancelAnimationFrame(scheduled);
      observer.disconnect();
      host.removeEventListener('scroll', refresh);
      host.removeEventListener('load', refresh, true);
      window.removeEventListener('resize', refresh);
    };
  }, [scroller, selected, design, runtime, disabled, section, zoom]);

  function itemFor(selection) {
    if (selection?.type !== 'native')
      return design.sections[section]?.items?.find(
        (item) => item.id === selection?.id,
      );
    const native = runtime.natives.find((item) => item.key === selection.key);
    return (
      design.native[selection.key] ||
      design.native[native?.legacyKey] ||
      native?.defaults
    );
  }

  function restore(current) {
    if (current.style === null) current.element.removeAttribute('style');
    else current.element.setAttribute('style', current.style);
    current.element.classList.toggle('template-design-sized', current.sized);
    current.artworks.forEach(([artwork, ratio]) => {
      if (ratio === null) artwork.removeAttribute('preserveAspectRatio');
      else artwork.setAttribute('preserveAspectRatio', ratio);
    });
    setFrame(frameFor(current.element, current.host));
  }

  function finish(event, cancelled = false) {
    const current = action.current;
    if (!current || current.pointer !== event.pointerId) return;
    action.current = null;
    setGuides([]);
    if (current.host.hasPointerCapture(event.pointerId))
      current.host.releasePointerCapture(event.pointerId);
    if (current.moved && !cancelled)
      onChange(current.patch, current.selection, current.original);
    else restore(current);
  }

  function pointerDown(event) {
    if (disabled || event.button !== 0 || action.current) return;
    if (
      event.target.closest('[data-design-toolbar]') &&
      !event.target.closest('[data-design-handle]')
    )
      return;
    const handle = event.target.closest('[data-design-handle]');
    const element = handle
      ? findDesignElement(scroller.current, selected)
      : event.target.closest('[data-design-native], [data-design-layer]');
    const scope = (element || event.target).closest('[data-design-scope]');
    if (!element) {
      if (
        scope &&
        !event.target.closest('button, a, input, select, textarea')
      ) {
        event.preventDefault();
        onSection?.(scope.dataset.designScope);
        onSelect(null);
      }
      return;
    }
    if (element.dataset.designSection || scope)
      onSection?.(element.dataset.designSection || scope.dataset.designScope);
    const selection = element.dataset.designNative
      ? { type: 'native', key: element.dataset.designNative }
      : { type: 'added', id: element.dataset.designLayer };
    const original = itemFor(selection);
    if (!original) return;
    event.preventDefault();
    event.stopPropagation();
    onSelect(selection);
    const host = scroller.current;
    host.focus({ preventScroll: true });
    const parent = element.offsetParent || element.parentElement;
    const geometry = designGeometry(element);
    const mode = handle?.dataset.designHandle || 'move';
    const sx = mode.includes('w') ? -1 : mode.includes('e') ? 1 : 0;
    const sy = mode.includes('n') ? -1 : mode.includes('s') ? 1 : 0;
    const origin = getComputedStyle(element)
      .transformOrigin.split(' ')
      .map(parseFloat);
    const pivot = designPoint(geometry, origin[0], origin[1]);
    action.current = {
      host,
      element,
      selection,
      original,
      mode,
      sx,
      sy,
      geometry,
      pivot,
      angle: Math.atan2(event.clientY - pivot.y, event.clientX - pivot.x),
      inverse: geometry.matrix.inverse(),
      parentInverse: designMatrix(parent).inverse(),
      parentWidth: parent.clientWidth || 1,
      parentHeight: parent.clientHeight || 1,
      parent,
      anchor: designPoint(
        geometry,
        sx < 0 ? geometry.width : sx > 0 ? 0 : geometry.width / 2,
        sy < 0 ? geometry.height : sy > 0 ? 0 : geometry.height / 2,
      ),
      style: element.getAttribute('style'),
      sized: element.classList.contains('template-design-sized'),
      artworks: Array.from(element.querySelectorAll('svg')).map((artwork) => [
        artwork,
        artwork.getAttribute('preserveAspectRatio'),
      ]),
      pointer: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      patch: {},
    };
    host.setPointerCapture(event.pointerId);
    setFrame(frameFor(element, host));
  }

  function pointerMove(event) {
    const current = action.current;
    if (!current || current.pointer !== event.pointerId) return;
    const dx = event.clientX - current.startX;
    const dy = event.clientY - current.startY;
    if (!current.moved && Math.abs(dx) + Math.abs(dy) < 2) return;
    current.moved = true;
    const { original, element, geometry, parentWidth, parentHeight } = current;
    let patch;
    if (current.mode === 'move') {
      const delta = current.parentInverse.transformPoint({ x: dx, y: dy });
      if (event.shiftKey) {
        if (Math.abs(dx) > Math.abs(dy)) delta.y = 0;
        else delta.x = 0;
      }
      patch = {
        x: clampDesign(original.x + (delta.x / parentWidth) * 100, -200, 300),
        y: clampDesign(original.y + (delta.y / parentHeight) * 100, -200, 300),
      };
    } else if (current.mode === 'rotate') {
      const angle = Math.atan2(
        event.clientY - current.pivot.y,
        event.clientX - current.pivot.x,
      );
      const delta = Math.atan2(
        Math.sin(angle - current.angle),
        Math.cos(angle - current.angle),
      );
      const sign = Math.sign(
        current.parentInverse.a * current.parentInverse.d -
          current.parentInverse.b * current.parentInverse.c,
      );
      let rotate = original.rotate + ((delta * 180) / Math.PI) * sign;
      if (event.shiftKey) rotate = Math.round(rotate / 15) * 15;
      patch = { rotate: clampDesign(rotate, -360, 360) };
      element.style.rotate = `${patch.rotate}deg`;
    } else {
      const delta = current.inverse.transformPoint({ x: dx, y: dy });
      const { sx, sy } = current;
      let width = clampDesign(
        geometry.width + sx * delta.x,
        parentWidth / 100,
        parentWidth * 4,
      );
      let height = clampDesign(
        geometry.height + sy * delta.y,
        parentHeight / 100,
        parentHeight * 4,
      );
      if (!sx) width = (original.width / 100) * parentWidth;
      if (!sy && original.height !== undefined)
        height = (original.height / 100) * parentHeight;
      if (sx && sy && keepRatio !== event.shiftKey) {
        const scaleX = (sx * delta.x) / geometry.width;
        const scaleY = (sy * delta.y) / geometry.height;
        const scale = clampDesign(
          1 + (Math.abs(scaleX) > Math.abs(scaleY) ? scaleX : scaleY),
          Math.max(
            parentWidth / 100 / geometry.width,
            parentHeight / 100 / geometry.height,
          ),
          Math.min(
            (parentWidth * 4) / geometry.width,
            (parentHeight * 4) / geometry.height,
          ),
        );
        width = geometry.width * scale;
        height = geometry.height * scale;
      }
      element.style.width = `${(width / parentWidth) * 100}%`;
      element.style.height = `${(height / parentHeight) * 100}%`;
      element.style.left = `${original.x}%`;
      element.style.top = `${original.y}%`;
      element.style.right = 'auto';
      element.style.bottom = 'auto';
      element.classList.add('template-design-sized');
      current.artworks.forEach(([artwork]) =>
        artwork.setAttribute('preserveAspectRatio', 'none'),
      );
      const next = designGeometry(element);
      const anchor = designPoint(
        next,
        sx < 0 ? next.width : sx > 0 ? 0 : next.width / 2,
        sy < 0 ? next.height : sy > 0 ? 0 : next.height / 2,
      );
      const shift = current.parentInverse.transformPoint({
        x: current.anchor.x - anchor.x,
        y: current.anchor.y - anchor.y,
      });
      patch = {
        width: clampDesign((width / parentWidth) * 100, 1, 400),
        height: clampDesign((height / parentHeight) * 100, 1, 400),
        x: clampDesign(original.x + (shift.x / parentWidth) * 100, -200, 300),
        y: clampDesign(original.y + (shift.y / parentHeight) * 100, -200, 300),
      };
    }
    if ('x' in patch)
      Object.assign(element.style, {
        left: `${patch.x}%`,
        top: `${patch.y}%`,
        right: 'auto',
        bottom: 'auto',
      });
    if (current.mode === 'move' && snapping && !event.altKey) {
      const axes = { x: true, y: true };
      if (event.shiftKey) axes[Math.abs(dx) > Math.abs(dy) ? 'y' : 'x'] = false;
      const snap = snapDesign(element, current.parent, current.host, axes);
      patch.x = clampDesign(
        patch.x + (snap.delta.x / parentWidth) * 100,
        -200,
        300,
      );
      patch.y = clampDesign(
        patch.y + (snap.delta.y / parentHeight) * 100,
        -200,
        300,
      );
      element.style.left = `${patch.x}%`;
      element.style.top = `${patch.y}%`;
      setGuides(snap.guides);
    } else setGuides([]);
    current.patch = patch;
    setFrame(frameFor(element, current.host));
  }

  function keyDown(event) {
    if (disabled || /^(INPUT|SELECT|TEXTAREA)$/.test(event.target.tagName))
      return;
    if (event.key === 'Escape') {
      event.preventDefault();
      if (action.current) finish({ pointerId: action.current.pointer }, true);
      else onSelect(null);
      return;
    }
    const direction = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    }[event.key];
    if (!direction || event.ctrlKey || event.metaKey || action.current) return;
    const element = findDesignElement(scroller.current, selected);
    const item = itemFor(selected);
    if (!element || !item) return;
    event.preventDefault();
    const parent = element.offsetParent || element.parentElement;
    const step = event.shiftKey ? 10 : 1;
    onChange(
      {
        x: clampDesign(
          item.x + ((direction[0] * step) / (parent.clientWidth || 1)) * 100,
          -200,
          300,
        ),
        y: clampDesign(
          item.y + ((direction[1] * step) / (parent.clientHeight || 1)) * 100,
          -200,
          300,
        ),
      },
      selected,
      item,
    );
  }

  return {
    frame: disabled ? null : frame,
    guides: disabled ? [] : guides,
    handlers: {
      onPointerDownCapture: pointerDown,
      onPointerMove: pointerMove,
      onPointerUp: (event) => finish(event),
      onPointerCancel: (event) => finish(event, true),
      onLostPointerCapture: (event) => finish(event, true),
      onKeyDown: keyDown,
    },
  };
}
