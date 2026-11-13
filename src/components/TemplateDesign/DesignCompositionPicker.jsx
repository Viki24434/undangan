import { DESIGN_COMPOSITIONS, compositionValues } from './designCompositions';
import './DesignCompositionPicker.css';

export default function DesignCompositionPicker({
  metadata,
  values = {},
  disabled,
  onApply,
}) {
  if (!metadata) return null;
  return (
    <details className="designer-compositions">
      <summary>
        Susunan siap pakai <span>{DESIGN_COMPOSITIONS.length} pilihan</span>
      </summary>
      <p>
        Pilih susunan untuk memulai. Lanjutkan dengan mengatur tiap bagian
        sesuai ceritamu.
      </p>
      <div className="designer-compositions__grid">
        {DESIGN_COMPOSITIONS.map((preset) => {
          const choices = compositionValues(preset, metadata);
          const selected = Object.entries(choices).every(
            ([key, value]) =>
              (values[key] ?? metadata.defaults[key] ?? 1) === value,
          );
          return (
            <button
              type="button"
              key={preset.id}
              disabled={disabled}
              aria-label={`Terapkan susunan ${preset.name}`}
              aria-pressed={selected}
              onClick={() => onApply(preset, choices)}
            >
              <strong>{preset.name}</strong>
              <span>{preset.description}</span>
              <small>
                {selected ? 'Sedang dipakai ✓' : 'Terapkan susunan ↗'}
              </small>
            </button>
          );
        })}
      </div>
    </details>
  );
}
