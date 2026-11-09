import { availableComponents } from './componentVariants';
import DesignVariantThumbnail from './DesignVariantThumbnail';

export default function DesignComponentPicker({
  metadata,
  values = {},
  disabled,
  onChange,
  section,
}) {
  if (!metadata) return null;
  const fields = availableComponents(metadata);
  const active = fields.find((field) => field.section === section);
  const defaultFor = (field) =>
    metadata.defaults[field.key] ??
    (field.key === 'gallery' && metadata.wedding ? 2 : field.fallback);
  return (
    <section className="designer-component-picker">
      <h3>{active ? `Tampilan ${active.label}` : 'Desain bagian ini'}</h3>
      <p>
        {active
          ? 'Klik susunan yang kamu suka. Ilustrasi menunjukkan bentuk komponen.'
          : 'Pilih ornamen pada preview untuk mengubah posisi dan animasinya.'}
      </p>
      {active && (
        <>
          <div className="designer-variant-cards">
            {active.options.map(([value, label]) => (
              <button
                key={value}
                type="button"
                disabled={disabled}
                aria-label={`Pakai ${label}`}
                aria-pressed={
                  (values[active.key] ?? defaultFor(active)) === value
                }
                onClick={() => onChange(active, String(value))}
              >
                <DesignVariantThumbnail kind={active.key} value={value} />
                <span>{label}</span>
                {(values[active.key] ?? defaultFor(active)) === value && (
                  <b aria-hidden="true">✓</b>
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="designer-restore-variant"
            disabled={disabled || values[active.key] === undefined}
            onClick={() => onChange(active, 'inherit')}
          >
            Kembali ke bawaan {active.label}
          </button>
        </>
      )}
      <details className="designer-all-variants">
        <summary>Semua variasi komponen</summary>
        <div className="admin-form">
          {fields.map((field) => {
            const defaultValue = defaultFor(field);
            const defaultLabel = field.options.find(
              ([value]) => value === defaultValue,
            )?.[1];
            return (
              <label key={field.key}>
                {field.label}
                <select
                  aria-label={`Variasi ${field.key}`}
                  value={values[field.key] ?? 'inherit'}
                  disabled={disabled}
                  onChange={(event) => onChange(field, event.target.value)}
                >
                  <option value="inherit">Bawaan · {defaultLabel}</option>
                  {field.options.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            );
          })}
        </div>
      </details>
    </section>
  );
}
