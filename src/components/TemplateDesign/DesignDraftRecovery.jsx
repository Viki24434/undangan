export default function DesignDraftRecovery({
  draft,
  changed,
  onRestore,
  onDiscard,
}) {
  return (
    <section
      className="designer-draft-recovery"
      aria-label="Pemulihan draft desain"
    >
      <div>
        <h2>Draft desain tersedia</h2>
        <p>
          Perubahan di perangkat ini disimpan pada{' '}
          {new Date(draft.savedAt).toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
          .
        </p>
        {changed && (
          <p>
            Versi server sudah berubah sejak draft dibuat. Periksa hasil
            pemulihan sebelum menyimpan ke server.
          </p>
        )}
      </div>
      <div className="admin-actions">
        <button type="button" className="admin-button" onClick={onRestore}>
          Pulihkan desain
        </button>
        <button
          type="button"
          className="admin-button secondary"
          onClick={onDiscard}
        >
          Buang draft perangkat
        </button>
      </div>
    </section>
  );
}
