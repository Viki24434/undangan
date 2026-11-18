export default function DesignTemplateDetails({
  panelRef,
  open,
  onToggle,
  templates,
  sourceId,
  sourceLocked,
  values,
  onChange,
  onSource,
  onSave,
  disabled,
}) {
  return (
    <details
      id="designer-template-details"
      ref={panelRef}
      className="designer-template-details"
      open={open}
      onToggle={(event) => onToggle(event.currentTarget.open)}
    >
      <summary>
        <span>Template baru</span>
        <small>{values.name || 'Atur nama & paket sebelum menyimpan'}</small>
      </summary>
      <div className="admin-form">
        <label>
          Template dasar
          <select
            aria-label="Template dasar"
            value={sourceId}
            disabled={disabled || sourceLocked}
            onChange={(event) => onSource(event.target.value)}
          >
            {templates.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Nama template baru
          <input
            value={values.name}
            maxLength={160}
            disabled={disabled}
            onChange={(event) => onChange('name', event.target.value)}
          />
        </label>
        <label>
          Kategori acara
          <input
            value={values.category}
            maxLength={80}
            disabled={disabled}
            onChange={(event) => onChange('category', event.target.value)}
          />
        </label>
        <label>
          Paket template
          <select
            aria-label="Paket template"
            value={values.packageId}
            disabled={disabled}
            onChange={(event) => onChange('packageId', event.target.value)}
          >
            {['silver', 'gold', 'platinum', 'exclusive'].map((key) => (
              <option key={key} value={key}>
                {key[0].toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="admin-button"
          disabled={disabled}
          onClick={onSave}
        >
          Buat template custom
        </button>
      </div>
    </details>
  );
}
