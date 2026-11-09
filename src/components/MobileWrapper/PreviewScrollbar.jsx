import { useEffect, useId, useRef, useState } from 'react';
import './PreviewScrollbar.css';

export default function PreviewScrollbar({ targetRef, className = '' }) {
  const rail = useRef(null);
  const drag = useRef(null);
  const id = useId();
  const [status, setStatus] = useState({
    visible: false,
    percent: 0,
    controls: '',
    thumbHeight: 28,
    thumbTop: 0,
  });

  useEffect(() => {
    const target = targetRef.current;
    const bar = rail.current;
    if (!target || !bar) return;
    const originalId = target.id;
    if (!originalId) target.id = `preview-scroll-${id}`;
    let scheduled;
    let content;
    const measure = () => {
      const maximum = Math.max(0, target.scrollHeight - target.clientHeight);
      const height = bar.clientHeight;
      const thumbHeight = Math.min(
        height,
        Math.max(
          28,
          (height * target.clientHeight) / (target.scrollHeight || 1),
        ),
      );
      const progress = maximum
        ? Math.max(0, Math.min(1, target.scrollTop / maximum))
        : 0;
      const next = {
        visible: maximum > 1 && height > 0,
        percent: Math.round(progress * 100),
        controls: target.id,
        thumbHeight,
        thumbTop: progress * (height - thumbHeight),
      };
      setStatus((current) =>
        JSON.stringify(current) === JSON.stringify(next) ? current : next,
      );
      const nextContent = target.firstElementChild;
      if (content !== nextContent) {
        if (content) resize.unobserve(content);
        if (nextContent) resize.observe(nextContent);
        content = nextContent;
      }
    };
    const refresh = () => {
      cancelAnimationFrame(scheduled);
      scheduled = requestAnimationFrame(measure);
    };
    const wheel = (event) => {
      if (!bar.clientHeight || target.scrollHeight <= target.clientHeight)
        return;
      event.preventDefault();
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? target.clientHeight
            : 1;
      target.scrollTop += event.deltaY * unit;
    };
    const resize = new ResizeObserver(refresh);
    resize.observe(target);
    resize.observe(bar);
    const observer = new MutationObserver(refresh);
    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'hidden'],
    });
    target.addEventListener('scroll', refresh, { passive: true });
    target.addEventListener('load', refresh, true);
    bar.addEventListener('wheel', wheel, { passive: false });
    refresh();
    return () => {
      cancelAnimationFrame(scheduled);
      resize.disconnect();
      observer.disconnect();
      target.removeEventListener('scroll', refresh);
      target.removeEventListener('load', refresh, true);
      bar.removeEventListener('wheel', wheel);
      if (!originalId && target.id === `preview-scroll-${id}`)
        target.removeAttribute('id');
    };
  }, [targetRef, id]);

  function move(event, offset) {
    const target = targetRef.current;
    const bar = rail.current;
    if (!target || !bar) return;
    const bounds = bar.getBoundingClientRect();
    const localY =
      ((event.clientY - bounds.top) / (bounds.height || 1)) * bar.clientHeight;
    const travel = bar.clientHeight - status.thumbHeight;
    const progress =
      travel > 0 ? Math.max(0, Math.min(1, (localY - offset) / travel)) : 0;
    target.scrollTop =
      progress * Math.max(0, target.scrollHeight - target.clientHeight);
  }

  function release(event) {
    if (drag.current?.pointer !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div
      ref={rail}
      className={`preview-scrollbar ${className}`}
      role="scrollbar"
      aria-label="Gulir isi preview"
      aria-controls={status.controls || undefined}
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={status.percent}
      aria-hidden={!status.visible}
      tabIndex={status.visible ? 0 : -1}
      style={{ visibility: status.visible ? 'visible' : 'hidden' }}
      onPointerDown={(event) => {
        if (event.button !== 0 || !status.visible) return;
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
        const bounds = event.currentTarget.getBoundingClientRect();
        const localY =
          ((event.clientY - bounds.top) / (bounds.height || 1)) *
          event.currentTarget.clientHeight;
        const offset = event.target.closest('.preview-scrollbar-thumb')
          ? localY - status.thumbTop
          : status.thumbHeight / 2;
        drag.current = { pointer: event.pointerId, offset };
        event.currentTarget.setPointerCapture(event.pointerId);
        move(event, offset);
      }}
      onPointerMove={(event) => {
        if (drag.current?.pointer === event.pointerId)
          move(event, drag.current.offset);
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={() => {
        drag.current = null;
      }}
      onKeyDown={(event) => {
        const target = targetRef.current;
        if (!target) return;
        const maximum = Math.max(0, target.scrollHeight - target.clientHeight);
        const next = {
          Home: 0,
          End: maximum,
          ArrowUp: target.scrollTop - 40,
          ArrowDown: target.scrollTop + 40,
          PageUp: target.scrollTop - target.clientHeight * 0.9,
          PageDown: target.scrollTop + target.clientHeight * 0.9,
          ' ':
            target.scrollTop +
            target.clientHeight * 0.9 * (event.shiftKey ? -1 : 1),
        }[event.key];
        if (next !== undefined) {
          event.preventDefault();
          target.scrollTop = Math.max(0, Math.min(maximum, next));
        }
      }}
    >
      <span
        className="preview-scrollbar-thumb"
        style={{
          height: status.thumbHeight,
          transform: `translateY(${status.thumbTop}px)`,
        }}
      />
    </div>
  );
}
