import { gradientCss } from '../../config/themeGradients';

export default function DesignGradientEditor({
  value,
  label,
  disabled,
  onChange,
}) {
  const updateStop = (index, patch) =>
    onChange({
      ...value,
      stops: value.stops.map((stop, item) =>
        item === index ? { ...stop, ...patch } : stop,
      ),
    });
  return (
    <div className="designer-gradient-editor">
      <div
        className="designer-gradient-preview"
        style={{ background: gradientCss(value) }}
        aria-label={`Preview gradasi ${label}`}
      />
      <label>
        Arah gradasi ({value.angle}°)
        <input
          aria-label={`Rotasi gradasi ${label}`}
          type="range"
          min="0"
          max="360"
          step="1"
          value={value.angle}
          disabled={disabled}
          onChange={(event) =>
            onChange({ ...value, angle: Number(event.target.value) })
          }
        />
      </label>
      <input
        aria-label={`Sudut gradasi ${label}`}
        type="number"
        min="0"
        max="360"
        value={value.angle}
        disabled={disabled}
        onChange={(event) =>
          onChange({
            ...value,
            angle: Math.max(0, Math.min(360, Number(event.target.value))),
          })
        }
      />
      <div className="designer-gradient-directions">
        {[
          [0, '↑'],
          [90, '→'],
          [180, '↓'],
          [270, '←'],
        ].map(([angle, icon]) => (
          <button
            type="button"
            key={angle}
            aria-label={`Arah ${angle} derajat ${label}`}
            disabled={disabled}
            onClick={() => onChange({ ...value, angle })}
          >
            {icon}
          </button>
        ))}
        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onChange({
              ...value,
              stops: value.stops
                .map((stop) => ({ ...stop, position: 100 - stop.position }))
                .reverse(),
            })
          }
        >
          Balik warna
        </button>
      </div>
      {value.stops.map((stop, index) => (
        <div className="designer-gradient-stop" key={index}>
          <label>
            Warna {index + 1}
            <input
              type="color"
              aria-label={`Warna ${index + 1} gradasi ${label}`}
              value={stop.color}
              disabled={disabled}
              onChange={(event) =>
                updateStop(index, { color: event.target.value })
              }
            />
          </label>
          <label>
            Posisi (%)
            <input
              type="number"
              aria-label={`Posisi warna ${index + 1} gradasi ${label}`}
              min="0"
              max="100"
              value={stop.position}
              disabled={disabled}
              onChange={(event) =>
                updateStop(index, {
                  position: Math.max(
                    0,
                    Math.min(100, Number(event.target.value)),
                  ),
                })
              }
            />
          </label>
          <label>
            Opasitas
            <input
              aria-label={`Opasitas warna ${index + 1} gradasi ${label}`}
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={stop.opacity ?? 1}
              disabled={disabled}
              onChange={(event) =>
                updateStop(index, { opacity: Number(event.target.value) })
              }
            />
          </label>
          <button
            type="button"
            aria-label={`Hapus warna ${index + 1} gradasi ${label}`}
            disabled={disabled || value.stops.length <= 2}
            onClick={() =>
              onChange({
                ...value,
                stops: value.stops.filter((_, item) => item !== index),
              })
            }
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        disabled={disabled || value.stops.length >= 5}
        onClick={() =>
          onChange({
            ...value,
            stops: [
              ...value.stops,
              { color: '#ffffff', position: 50, opacity: 1 },
            ],
          })
        }
      >
        + Tambah warna
      </button>
    </div>
  );
}
