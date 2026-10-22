import { useState } from 'react';
import { cleanGuest } from '../../../services/guestList';

export default function GuestEntryForm({ guest, onSave, onCancel, disabled }) {
  const [form, setForm] = useState(
    guest || { name: '', phone: '', group: '', note: '' },
  );
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    try {
      onSave(cleanGuest(form));
      if (!guest) setForm({ name: '', phone: '', group: '', note: '' });
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="admin-panel guest-entry">
      <h2>{guest ? 'Edit tamu' : 'Tambahkan tamu'}</h2>
      <form className="admin-form" onSubmit={submit}>
        <fieldset disabled={disabled} className="guest-form-grid">
          {[
            ['name', 'Nama tamu', 80, 'Nama yang tampil pada cover'],
            ['phone', 'No. WhatsApp', 30, 'Opsional, contoh 081234567890'],
            ['group', 'Kelompok', 60, 'Opsional, contoh Keluarga'],
            ['note', 'Catatan', 200, 'Opsional'],
          ].map(([key, label, maxLength, placeholder]) => (
            <label key={key}>
              {label}
              {key === 'name' ? ' *' : ''}
              <input
                name={key}
                value={form[key]}
                onChange={(event) =>
                  setForm({ ...form, [key]: event.target.value })
                }
                required={key === 'name'}
                maxLength={maxLength}
                type={key === 'phone' ? 'tel' : 'text'}
                placeholder={placeholder}
              />
            </label>
          ))}
        </fieldset>
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}
        <div className="admin-actions">
          <button type="submit" className="admin-button" disabled={disabled}>
            {guest ? 'Terapkan perubahan' : '+ Tambahkan ke daftar'}
          </button>
          {guest && (
            <button
              type="button"
              className="admin-button secondary"
              onClick={onCancel}
            >
              Batal edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
