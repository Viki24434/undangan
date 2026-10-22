import { useRef, useState } from 'react';
import { invitationGuestUrl } from '../../../services/guestList';
import {
  GUEST_MESSAGE_LIMIT,
  GUEST_MESSAGE_PRESETS,
  GUEST_MESSAGE_TAGS,
  guestMessageError,
  renderGuestMessage,
} from '../../../services/guestMessage';

export default function GuestMessageEditor({
  value,
  invitation,
  sampleName,
  disabled,
  onChange,
}) {
  const editor = useRef(null);
  const [name, setName] = useState(sampleName || 'Nama Tamu');
  const error = guestMessageError(value);
  const previewName = name.trim() || 'Nama Tamu';
  const preview = renderGuestMessage(value, {
    name: previewName,
    title: invitation.title,
    link: invitationGuestUrl(invitation.slug, previewName),
  });

  function insertTag(tag) {
    const input = editor.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const next = value.slice(0, start) + tag + value.slice(end);
    if (next.length > GUEST_MESSAGE_LIMIT) return;
    onChange(next);
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + tag.length, start + tag.length);
    });
  }

  return (
    <section className="admin-panel guest-message-editor">
      <div className="admin-panel-heading">
        <div>
          <h2>Pesan WhatsApp</h2>
          <p>
            Sesuaikan sapaan, salam, dan isi pesan untuk undangan ini. Pesan
            bawaan menggunakan sapaan netral.
          </p>
        </div>
      </div>
      <div className="admin-actions guest-message-presets">
        {GUEST_MESSAGE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            className="admin-button secondary"
            disabled={disabled}
            onClick={() => onChange(preset.template)}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <div className="guest-message-grid">
        <div className="admin-form">
          <label>
            Isi pesan
            <textarea
              ref={editor}
              value={value}
              rows={18}
              maxLength={GUEST_MESSAGE_LIMIT}
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby="guest-message-help"
              onChange={(event) => onChange(event.target.value)}
            />
          </label>
          <div className="guest-message-help" id="guest-message-help">
            <p>
              Klik tag untuk menyisipkan data otomatis. Tag link pribadi wajib
              ada. Klik Simpan daftar tamu setelah selesai mengubah pesan.
            </p>
            <div className="admin-actions guest-message-tags">
              {GUEST_MESSAGE_TAGS.map(({ tag, label }) => (
                <button
                  key={tag}
                  type="button"
                  className="admin-button secondary"
                  disabled={disabled}
                  title={tag}
                  onClick={() => insertTag(tag)}
                >
                  + {label}
                </button>
              ))}
            </div>
            <small>
              {value.length.toLocaleString('id-ID')} / 6.000 karakter
            </small>
          </div>
          {error && (
            <p className="admin-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <div className="guest-message-preview">
          <h3>Pratinjau pesan</h3>
          <div className="admin-form">
            <label>
              Nama tamu untuk pratinjau
              <input
                value={name}
                maxLength={80}
                disabled={disabled}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>
          <div
            className="guest-message-bubble"
            aria-label="Pratinjau isi pesan"
          >
            {preview || 'Isi pesan untuk melihat pratinjau.'}
          </div>
          <p>
            Nama dan link pada pesan yang dibuka dari tabel mengikuti tamu yang
            dipilih. Pratinjau ini tidak mengubah nama dalam daftar tamu.
          </p>
        </div>
      </div>
    </section>
  );
}
