export default function RepeatableFields({
  title,
  items = [],
  fields,
  onChange,
  addLabel = 'Tambah',
}) {
  function update(index, field, value) {
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  }
  return (
    <section className="admin-form-section">
      <div className="admin-panel-heading">
        <h2>{title}</h2>
        <button
          type="button"
          className="admin-button secondary"
          onClick={() =>
            onChange([
              ...items,
              Object.fromEntries(fields.map((field) => [field.key, ''])),
            ])
          }
        >
          + {addLabel}
        </button>
      </div>
      {items.length === 0 && <p>Belum ada data. Tambahkan jika dibutuhkan.</p>}
      {items.map((item, index) => (
        <div className="admin-repeatable" key={index}>
          <div className="admin-field-grid">
            {fields.map((field) => (
              <label key={field.key}>
                {field.label}
                <input
                  type={field.type || 'text'}
                  required
                  value={item[field.key] || ''}
                  maxLength={field.max || 600}
                  onChange={(event) =>
                    update(index, field.key, event.target.value)
                  }
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            className="admin-text-danger"
            onClick={() =>
              onChange(items.filter((_, itemIndex) => itemIndex !== index))
            }
          >
            Hapus {index + 1}
          </button>
        </div>
      ))}
    </section>
  );
}
