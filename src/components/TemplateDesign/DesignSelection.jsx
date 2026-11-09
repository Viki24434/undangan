const handles = [
  ['nw', 'kiri atas'],
  ['n', 'atas'],
  ['ne', 'kanan atas'],
  ['e', 'kanan'],
  ['se', 'kanan bawah'],
  ['s', 'bawah'],
  ['sw', 'kiri bawah'],
  ['w', 'kiri'],
];

export default function DesignSelection({ frame }) {
  if (!frame) return null;
  const { width, height, transform } = frame;
  return (
    <div className="designer-selection" style={{ width, height, transform }}>
      <span className="designer-selection-line" />
      <button
        type="button"
        className="designer-rotate-handle"
        data-design-handle="rotate"
        aria-label="Putar ornamen"
        title="Tarik untuk memutar. Shift: kelipatan 15 derajat."
      >
        ↻
      </button>
      {handles.map(([direction, label]) => (
        <button
          key={direction}
          type="button"
          className="designer-selection-handle"
          data-design-handle={direction}
          aria-label={`Ubah ukuran ${label}`}
          title={`Tarik untuk mengubah ukuran ${label}`}
        />
      ))}
    </div>
  );
}
