export default function DesignQuickActions({
  frame,
  native,
  disabled,
  onAction,
}) {
  if (!frame?.toolbar) return null;
  return (
    <div
      className="designer-quick-actions"
      data-design-toolbar="true"
      role="toolbar"
      aria-label="Aksi cepat ornamen"
      style={frame.toolbar}
    >
      {[
        ['move', '✥', 'Geser ornamen terpilih'],
        ['duplicate', '⧉', 'Duplikat ornamen', native],
        ['front', '↑', 'Majukan lapisan'],
        ['back', '↓', 'Mundurkan lapisan'],
        ['center-x', '↔', 'Rata tengah horizontal'],
        ['center-y', '↕', 'Rata tengah vertikal'],
        ['flip', '⇄', 'Balik horizontal'],
        [
          native ? 'hide' : 'delete',
          '×',
          native ? 'Sembunyikan ornamen terpilih' : 'Hapus ornamen terpilih',
        ],
      ].map(([action, icon, label, unavailable]) => (
        <button
          key={action}
          type="button"
          aria-label={label}
          title={
            unavailable ? 'Duplikat tersedia untuk ornamen tambahan' : label
          }
          disabled={disabled || unavailable}
          data-design-handle={action === 'move' ? 'move' : undefined}
          onClick={() => {
            if (action !== 'move') onAction(action);
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
