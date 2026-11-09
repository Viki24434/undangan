import { useEffect, useId, useRef, useState } from 'react';

function splitLayers(value) {
  const layers = [];
  let depth = 0;
  let quote = '';
  let start = 0;
  for (let index = 0; index < value.length; index++) {
    const character = value[index];
    if (quote) {
      if (character === quote && value[index - 1] !== '\\') quote = '';
    } else if (character === '"' || character === "'") quote = character;
    else if (character === '(') depth++;
    else if (character === ')') depth--;
    else if (character === ',' && depth === 0) {
      layers.push(value.slice(start, index).trim());
      start = index + 1;
    }
  }
  layers.push(value.slice(start).trim());
  return layers;
}

export default function useDesignBackdrops(root, enabled) {
  const [backdrops, setBackdrops] = useState([]);
  const mounts = useRef(new WeakMap());
  const sequence = useRef(0);
  const prefix = useId();
  useEffect(() => {
    const host = root.current;
    if (!host || !enabled) return;
    const nodes = new Set();
    let scheduled;
    const scan = () => {
      const next = [];
      for (const node of host.querySelectorAll(
        '.invitation-section, .invitation-closing',
      )) {
        nodes.add(node);
        if (!mounts.current.has(node))
          mounts.current.set(node, `${prefix}-${sequence.current++}`);
        const mount = mounts.current.get(node);
        node.dataset.designBackdropMount = mount;
        for (const side of ['before', 'after']) {
          const className = `design-backdrop-${side}`;
          node.classList.remove(className);
          const computed = getComputedStyle(node, `::${side}`);
          const images = splitLayers(computed.backgroundImage);
          if (!images.some((image) => image.startsWith('url('))) continue;
          const positions = splitLayers(computed.backgroundPosition);
          const sizes = splitLayers(computed.backgroundSize);
          const repeats = splitLayers(computed.backgroundRepeat);
          const style = Object.fromEntries(
            [
              'position',
              'left',
              'right',
              'top',
              'bottom',
              'width',
              'height',
              'aspectRatio',
              'opacity',
              'transform',
              'transformOrigin',
              'zIndex',
              'filter',
              'mixBlendMode',
            ].map((key) => [key, computed[key]]),
          );
          const layers = images.flatMap((image, index) =>
            image.startsWith('url(')
              ? [
                  {
                    image,
                    position: positions[index % positions.length],
                    size: sizes[index % sizes.length],
                    repeat: repeats[index % repeats.length],
                  },
                ]
              : [],
          );
          next.push({ mount, side, style, layers });
        }
      }
      setBackdrops((current) =>
        JSON.stringify(current) === JSON.stringify(next) ? current : next,
      );
      nodes.forEach((node) => {
        for (const side of ['before', 'after'])
          if (
            next.some(
              (item) =>
                item.mount === node.dataset.designBackdropMount &&
                item.side === side,
            )
          )
            node.classList.add(`design-backdrop-${side}`);
      });
    };
    const refresh = () => {
      cancelAnimationFrame(scheduled);
      scheduled = requestAnimationFrame(scan);
    };
    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(host, { subtree: true, childList: true });
    const resize = new ResizeObserver(refresh);
    resize.observe(host);
    host.addEventListener('load', refresh, true);
    window.addEventListener('resize', refresh);
    return () => {
      cancelAnimationFrame(scheduled);
      observer.disconnect();
      resize.disconnect();
      host.removeEventListener('load', refresh, true);
      window.removeEventListener('resize', refresh);
      nodes.forEach((node) =>
        node.classList.remove(
          'design-backdrop-before',
          'design-backdrop-after',
        ),
      );
    };
  }, [root, enabled, prefix]);
  return backdrops;
}
