import { useState } from 'react';
import RepeatableFields from './RepeatableFields';
import { prayerTemplates } from './prayerTemplates';

export default function InvitationForm({
  form,
  templates,
  onChange,
  onTemplateChange,
  onSubmit,
  busy,
}) {
  const data = form.data;
  const [selectedPrayerTemplate, setSelectedPrayerTemplate] = useState('');
  function field(key, value) {
    onChange({ ...form, [key]: value });
  }
  function detail(key, value) {
    onChange({ ...form, data: { ...data, [key]: value } });
  }
  function person(key, field, value) {
    detail(key, { ...data[key], [field]: value });
  }
  function addPrayerTemplate() {
    const template = prayerTemplates.find(
      (item) => item.id === selectedPrayerTemplate,
    );
    if (!template) return;
    detail('prayers', [
      ...(data.prayers || []),
      {
        title: template.title,
        text: template.text,
        arabic: template.arabic,
        source: template.source,
      },
    ]);
    setSelectedPrayerTemplate('');
  }
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <fieldset disabled={busy}>
        <section className="admin-form-section">
          <h2>Informasi undangan</h2>
          <div className="admin-field-grid">
            <label>
              Judul undangan
              <input
                required
                maxLength={160}
                value={form.title}
                onChange={(event) => field('title', event.target.value)}
              />
            </label>
            <label>
              Tautan undangan
              <input
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                maxLength={80}
                placeholder="aditya-sarah"
                value={form.slug}
                onChange={(event) => field('slug', event.target.value)}
              />
              <small>Huruf kecil, angka, dan tanda hubung.</small>
            </label>
            <label>
              Template
              <select
                value={form.templateId}
                onChange={(event) => onTemplateChange(event.target.value)}
              >
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tanggal & waktu acara (WIB)
              <input
                type="datetime-local"
                required
                value={form.eventDate}
                onChange={(event) => field('eventDate', event.target.value)}
              />
            </label>
            <label>
              Status
              <select
                value={form.status}
                onChange={(event) => field('status', event.target.value)}
              >
                <option value="draft">Draft — hanya admin</option>
                <option value="published">Terbit — bisa dibuka tamu</option>
              </select>
            </label>
            <label>
              Foto cover
              <input
                type="url"
                required
                value={data.image || ''}
                onChange={(event) => detail('image', event.target.value)}
              />
            </label>
          </div>
        </section>
        <section className="admin-form-section">
          <h2>Musik undangan</h2>
          <div className="admin-field-grid">
            <label>
              Musik latar
              <select
                value={data.musicEnabled === false ? 'off' : 'on'}
                onChange={(event) =>
                  detail('musicEnabled', event.target.value === 'on')
                }
              >
                <option value="on">Aktif</option>
                <option value="off">Nonaktif</option>
              </select>
            </label>
            <label>
              URL audio pilihan (opsional)
              <input
                type="url"
                value={data.musicUrl || ''}
                placeholder="https://contoh.com/musik.mp3"
                onChange={(event) => detail('musicUrl', event.target.value)}
              />
              <small>
                Kosongkan untuk musik bawaan tema. Gunakan tautan langsung file
                audio.
              </small>
            </label>
          </div>
        </section>
        {data.groom && data.bride ? (
          <section className="admin-form-section">
            <h2>Profil mempelai</h2>
            <div className="admin-field-grid">
              {[
                ['groom', 'Mempelai pria'],
                ['bride', 'Mempelai wanita'],
              ].map(([key, label]) => (
                <div className="admin-person" key={key}>
                  <h3>{label}</h3>
                  {[
                    ['name', 'Nama'],
                    ['father', 'Nama ayah'],
                    ['mother', 'Nama ibu'],
                    ['photo', 'URL foto'],
                  ].map(([property, title]) => (
                    <label key={property}>
                      {title}
                      <input
                        required
                        type={property === 'photo' ? 'url' : 'text'}
                        maxLength={600}
                        value={data[key][property] || ''}
                        onChange={(event) =>
                          person(key, property, event.target.value)
                        }
                      />
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="admin-form-section">
            <h2>Tokoh & cerita acara</h2>
            <div className="admin-field-grid">
              {[
                ['honoree', 'Nama yang dirayakan'],
                ['family', 'Keluarga'],
                ['heading', 'Judul pembuka'],
                ['introduction', 'Kalimat undangan'],
              ].map(([key, label]) => (
                <label key={key}>
                  {label}
                  <textarea
                    required
                    rows={2}
                    maxLength={600}
                    value={data[key] || ''}
                    onChange={(event) => detail(key, event.target.value)}
                  />
                </label>
              ))}
            </div>
          </section>
        )}
        <RepeatableFields
          title="Jadwal & lokasi"
          items={data.events}
          fields={[
            { key: 'title', label: 'Nama acara' },
            { key: 'time', label: 'Waktu (contoh 09.00–10.00 WIB)' },
            { key: 'venue', label: 'Nama tempat' },
            { key: 'address', label: 'Alamat' },
          ]}
          onChange={(value) => detail('events', value)}
          addLabel="Acara"
        />
        <RepeatableFields
          title="Susunan acara (opsional)"
          items={data.agenda || []}
          fields={[
            { key: 'time', label: 'Waktu' },
            { key: 'title', label: 'Nama kegiatan' },
            {
              key: 'description',
              label: 'Keterangan (opsional)',
              type: 'textarea',
              required: false,
              max: 1000,
            },
          ]}
          onChange={(value) => detail('agenda', value)}
          addLabel="Kegiatan"
        />
        <section className="admin-form-section">
          <h2>Video (opsional)</h2>
          <label>
            Tautan YouTube, Vimeo, atau file video HTTPS
            <input
              type="url"
              value={data.videoUrl || ''}
              placeholder="https://youtu.be/..."
              onChange={(event) => detail('videoUrl', event.target.value)}
            />
            <small>
              Mendukung tautan YouTube, Vimeo, atau video MP4/WebM/OGG langsung.
            </small>
          </label>
        </section>
        <section className="admin-form-section">
          <div className="admin-panel-heading">
            <h2>Template doa siap pakai</h2>
            <small>Pilih doa untuk menambahkannya ke daftar, lalu edit bila perlu.</small>
          </div>
          <div className="admin-field-grid">
            <label>
              Pilih template doa
              <select
                value={selectedPrayerTemplate}
                onChange={(event) =>
                  setSelectedPrayerTemplate(event.target.value)
                }
              >
                <option value="">Pilih doa siap pakai</option>
                {prayerTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.source
                      ? `${template.title} — ${template.source}`
                      : template.title}
                  </option>
                ))}
              </select>
            </label>
            <div className="admin-prayer-template-action">
              <button
                className="admin-button secondary"
                type="button"
                disabled={!selectedPrayerTemplate}
                onClick={addPrayerTemplate}
              >
                + Tambahkan doa
              </button>
            </div>
          </div>
        </section>
        <RepeatableFields
          title="Daftar doa (opsional)"
          items={data.prayers || []}
          fields={[
            { key: 'title', label: 'Judul doa' },
            {
              key: 'arabic',
              label: 'Teks Arab (opsional)',
              type: 'textarea',
              required: false,
              max: 3000,
            },
            {
              key: 'text',
              label: 'Terjemahan / isi doa',
              type: 'textarea',
              max: 3000,
            },
            {
              key: 'source',
              label: 'Sumber (opsional)',
              required: false,
              max: 300,
            },
          ]}
          onChange={(value) => detail('prayers', value)}
          addLabel="Doa"
        />
        {data.groom && (
          <RepeatableFields
            title="Cerita perjalanan"
            items={data.stories}
            fields={[
              { key: 'title', label: 'Judul' },
              { key: 'date', label: 'Periode' },
              { key: 'description', label: 'Cerita' },
            ]}
            onChange={(value) => detail('stories', value)}
            addLabel="Cerita"
          />
        )}
        <section className="admin-form-section">
          <h2>Galeri foto</h2>
          <label>
            URL foto, satu per baris
            <textarea
              rows={5}
              value={(data.photos || []).join('\n')}
              onChange={(event) =>
                detail('photos', event.target.value.split('\n'))
              }
            />
          </label>
        </section>
        {data.groom && (
          <RepeatableFields
            title="Rekening hadiah"
            items={data.banks}
            fields={[
              { key: 'name', label: 'Nama bank' },
              { key: 'rek', label: 'Nomor rekening' },
              { key: 'owner', label: 'Pemilik rekening' },
            ]}
            onChange={(value) => detail('banks', value)}
            addLabel="Rekening"
          />
        )}
        {!data.groom && (
          <RepeatableFields
            title="Catatan & dress code"
            items={data.notes}
            fields={[
              { key: 'title', label: 'Judul' },
              { key: 'description', label: 'Informasi' },
            ]}
            onChange={(value) => detail('notes', value)}
            addLabel="Catatan"
          />
        )}
        <div className="admin-save-bar">
          <p>Draft dapat dipreview sebelum diterbitkan.</p>
          <button className="admin-button" type="submit">
            {busy ? 'Menyimpan…' : 'Simpan undangan'}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
