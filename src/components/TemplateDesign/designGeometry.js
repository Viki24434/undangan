export function findDesignElement(host, selection) {
  if (!host || !selection) return null;
  const attribute =
    selection.type === 'native' ? 'data-design-native' : 'data-design-layer';
  return host.querySelector(
    `[${attribute}="${CSS.escape(selection.key || selection.id)}"]`,
  );
}

export function designMatrix(element) {
  let matrix = new DOMMatrix();
  for (
    let node = element;
    node instanceof HTMLElement;
    node = node.parentElement
  ) {
    const style = getComputedStyle(node);
    const rotation =
      style.rotate === 'none' ? 0 : parseFloat(style.rotate.split(' ').at(-1));
    const scale =
      style.scale === 'none' ? [1, 1] : style.scale.split(' ').map(Number);
    const own = new DOMMatrix()
      .rotate(rotation || 0)
      .scale(scale[0], scale[1] ?? scale[0])
      .multiply(
        new DOMMatrix(style.transform === 'none' ? undefined : style.transform),
      );
    matrix = own.multiply(matrix);
  }
  return new DOMMatrix([matrix.a, matrix.b, matrix.c, matrix.d, 0, 0]);
}

export function designGeometry(element) {
  const style = getComputedStyle(element);
  const extra = (keys) =>
    style.boxSizing === 'border-box'
      ? 0
      : keys.reduce((sum, key) => sum + (parseFloat(style[key]) || 0), 0);
  const width =
    (parseFloat(style.width) || element.offsetWidth) +
    extra([
      'paddingLeft',
      'paddingRight',
      'borderLeftWidth',
      'borderRightWidth',
    ]);
  const height =
    (parseFloat(style.height) || element.offsetHeight) +
    extra([
      'paddingTop',
      'paddingBottom',
      'borderTopWidth',
      'borderBottomWidth',
    ]);
  const matrix = designMatrix(element);
  const corners = [
    matrix.transformPoint({ x: 0, y: 0 }),
    matrix.transformPoint({ x: width, y: 0 }),
    matrix.transformPoint({ x: 0, y: height }),
    matrix.transformPoint({ x: width, y: height }),
  ];
  const rect = element.getBoundingClientRect();
  return {
    width,
    height,
    matrix,
    x: rect.left - Math.min(...corners.map((point) => point.x)),
    y: rect.top - Math.min(...corners.map((point) => point.y)),
  };
}

export function designPoint(geometry, x, y) {
  const point = geometry.matrix.transformPoint({ x, y });
  return { x: geometry.x + point.x, y: geometry.y + point.y };
}

export const clampDesign = (value, min, max) =>
  Math.max(min, Math.min(max, value));

export function canvasPoint(host, point) {
  const geometry = designGeometry(host);
  const local = geometry.matrix.inverse().transformPoint({
    x: point.x - geometry.x,
    y: point.y - geometry.y,
  });
  return {
    x: local.x - host.clientLeft + host.scrollLeft,
    y: local.y - host.clientTop + host.scrollTop,
  };
}

export function designBounds(element, parent) {
  const geometry = designGeometry(element);
  const corners = [
    [0, 0],
    [geometry.width, 0],
    [0, geometry.height],
    [geometry.width, geometry.height],
  ].map(([x, y]) => canvasPoint(parent, designPoint(geometry, x, y)));
  return {
    left: Math.min(...corners.map((point) => point.x)),
    right: Math.max(...corners.map((point) => point.x)),
    top: Math.min(...corners.map((point) => point.y)),
    bottom: Math.max(...corners.map((point) => point.y)),
  };
}

export function snapDesign(element, parent, host, axes = { x: true, y: true }) {
  const bounds = designBounds(element, parent);
  const parentGeometry = designGeometry(parent);
  const delta = { x: 0, y: 0 };
  const guides = [];
  for (const [axis, length, start, end] of [
    ['x', parent.clientWidth, bounds.left, bounds.right],
    ['y', parent.clientHeight, bounds.top, bounds.bottom],
  ]) {
    if (!axes[axis]) continue;
    const scale =
      axis === 'x'
        ? Math.hypot(parentGeometry.matrix.a, parentGeometry.matrix.b)
        : Math.hypot(parentGeometry.matrix.c, parentGeometry.matrix.d);
    let closest = 6 / (scale || 1);
    let target;
    for (const position of [0, length / 2, length]) {
      for (const point of [start, (start + end) / 2, end]) {
        if (Math.abs(position - point) < closest) {
          closest = Math.abs(position - point);
          delta[axis] = position - point;
          target = position;
        }
      }
    }
    if (target === undefined) continue;
    const endpoints =
      axis === 'x'
        ? [
            [target, 0],
            [target, parent.clientHeight],
          ]
        : [
            [0, target],
            [parent.clientWidth, target],
          ];
    const [first, last] = endpoints.map(([x, y]) =>
      canvasPoint(
        host,
        designPoint(
          parentGeometry,
          x + parent.clientLeft,
          y + parent.clientTop,
        ),
      ),
    );
    guides.push({
      x: first.x,
      y: first.y,
      width: Math.hypot(last.x - first.x, last.y - first.y),
      angle: (Math.atan2(last.y - first.y, last.x - first.x) * 180) / Math.PI,
    });
  }
  return { delta, guides };
}
