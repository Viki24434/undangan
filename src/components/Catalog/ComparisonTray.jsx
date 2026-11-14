export default function ComparisonTray({
  templates,
  onRemove,
  onClear,
  onOpen,
}) {
  if (!templates.length) return null;
  return (
    <aside
      className="catalog-comparison-tray"
      aria-label="Pilihan perbandingan"
    >
      <div className="catalog-comparison-tray__selection">
        <span>
          {templates.length}/3 <strong>pilihanmu</strong>
        </span>
        <div>
          {templates.map((template) => (
            <button
              type="button"
              key={template.id}
              onClick={() => onRemove(template.id)}
              aria-label={`Hapus ${template.name} dari perbandingan`}
              title={`Hapus ${template.name}`}
            >
              <img src={template.img} alt="" />
              <span aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      </div>
      <div className="catalog-comparison-tray__actions">
        <button
          type="button"
          className="invite-button small"
          disabled={templates.length < 2}
          onClick={onOpen}
        >
          Bandingkan
          {templates.length > 1 ? ` (${templates.length})` : ' · pilih 1 lagi'}
        </button>
        <button
          type="button"
          className="catalog-clear-comparison"
          onClick={onClear}
        >
          Kosongkan
        </button>
      </div>
    </aside>
  );
}
