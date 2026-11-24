import './TemplateHistory.css';

export default function TemplateSaveConflict({ disabled, onReload, onCopy }) {
  return (
    <section
      className="template-save-conflict"
      aria-label="Bentrok perubahan template"
      role="alert"
    >
      <h2>Versi server sudah berubah</h2>
      <p>
        Perubahan Anda masih ada di editor. Memuat versi server akan mengganti
        isi editor saat ini.
      </p>
      <div className="admin-actions">
        <button
          type="button"
          className="admin-button secondary"
          disabled={disabled}
          onClick={onReload}
        >
          Muat versi server
        </button>
        {onCopy && (
          <button
            type="button"
            className="admin-button"
            disabled={disabled}
            onClick={onCopy}
          >
            Simpan sebagai template baru
          </button>
        )}
      </div>
    </section>
  );
}
