import { useEffect, useRef, useState } from 'react';
import ImageField from './ImageField';
import RepeatableFields from './RepeatableFields';
import { prayerTemplates } from './prayerTemplates';
import { packageName } from '../../config/invitationPackages';

export default function InvitationForm({
  form,
  templates,
  onChange,
  onTemplateChange,
  onSubmit,
  busy,
  localOnly = false,
  onUploadStatus,
  templateMode = false,
  themeDefaults = {},
}) {
  const data = form.data;
  const formRef = useRef(form);
  useEffect(() => {
    formRef.current = form;
  }, [form]);
  const [pendingUploads, setPendingUploads] = useState(0);
  function uploadPending(delta) {
    setPendingUploads((count) => Math.max(0, count + delta));
    onUploadStatus?.(delta);
  }
  function uploadedDetail(key, value, personKey) {
    const current = formRef.current;
    onChange({
      ...current,
      data: {
        ...current.data,
        ...(personKey
          ? { [personKey]: { ...current.data[personKey], [key]: value } }
          : { [key]: value }),
      },
    });
  }
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
      <fieldset disabled={busy || pendingUploads > 0}>
        <section className="admin-form-section">
          <h2>{templateMode ? 'Default template' : 'Informasi undangan'}</h2>
          <div className="admin-field-grid">
            {templateMode ? (
              <>
                <label>
                  Judul default (opsional)
                  <input
                    maxLength={160}
                    value={data.title || ''}
                    onChange={(event) => detail('title', event.target.value)}
                  />
                </label>
                <label>
                  Tanggal & waktu acara default (WIB)
                  <input
                    type="datetime-local"
                    required
                    value={(data.targetDate || '').slice(0, 16)}
                    onChange={(event) =>
                      detail(
                        'targetDate',
                        `${event.target.value}:00+07:00`,
                      )
                    }
                  />
                </label>
              </>
            ) : (
              <label>
                Judul undangan
                <input
                  required
                  maxLength={160}
                  value={form.title}
                  onChange={(event) => field('title', event.target.value)}
                />
              </label>
            )}
            {!localOnly && !templateMode && (
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
            )}
            {!templateMode && (
              <>
                <label>
                  Template
                  <select
                    disabled={localOnly}
                    value={form.templateId}
                    onChange={(event) => onTemplateChange(event.target.value)}
                  >
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name} — {packageName(template.packageId)}
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
              </>
            )}
            {!localOnly && !templateMode && (
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
            )}
            <ImageField
              label={templateMode ? 'Foto default cover' : 'Foto cover'}
              value={data.image || ''}
              onChange={(value) => uploadedDetail('image', value)}
              localOnly={localOnly}
              onPending={uploadPending}
            />
          </div>
        </section>
        {templateMode && (
          <section className="admin-form-section">
            <h2>Warna & font template</h2>
            <div className="admin-field-grid">
              {[
                ['background', 'Warna latar', themeDefaults.background],
                ['accent', 'Warna utama / aksen', themeDefaults.accent],
              ].map(([key, label, fallback]) => (
                <label key={key}>
                  {label}
                  <input
                    type="color"
                    value={data.theme?.[key] || fallback || '#ffffff'}
                    onChange={(event) =>
                      detail('theme', {
                        ...data.theme,
                        [key]: event.target.value,
                      })
                    }
                  />
                </label>
              ))}
              <label>
                Font
                <select
                  value={data.theme?.font || 'default'}
                  onChange={(event) =>
                    detail('theme', {
                      ...data.theme,
                      font: event.target.value,
                    })
                  }
                >
                  <option value="default">Bawaan template</option>
                  <option value="classic">Serif klasik</option>
                  <option value="modern">Sans modern</option>
                </select>
              </label>
            </div>
            <small>
              Pilih warna untuk mengubah latar dan aksen; font aman tanpa
              memasukkan kode CSS.
            </small>
          </section>
        )}
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
        <section className="admin-form-section">
          <h2>Tampilan slideshow</h2>
          <label>
            Cahaya matahari pada slideshow
            <select
              value={data.sunlightEnabled === false ? 'off' : 'on'}
              onChange={(event) =>
                detail('sunlightEnabled', event.target.value === 'on')
              }
            >
              <option value="on">Aktif</option>
              <option value="off">Nonaktif</option>
            </select>
            <small>
              Cahaya lembut dari atas foto. Gradasi bawah tetap aktif.
            </small>
          </label>
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
                  ].map(([property, title]) =>
                    property === 'photo' ? (
                      <ImageField
                        key={property}
                        label="Foto mempelai"
                        value={data[key].photo || ''}
                        onChange={(value) =>
                          uploadedDetail('photo', value, key)
                        }
                        localOnly={localOnly}
                        onPending={uploadPending}
                      />
                    ) : (
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
                    ),
                  )}
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
        {templateMode && (
          <section className="admin-form-section">
            <h2>Teks tambahan template</h2>
            <div className="admin-field-grid">
              {Object.entries(data)
                .filter(
                  ([key, value]) =>
                    typeof value === 'string' &&
                    ![
                      'title',
                      'targetDate',
                      'image',
                      'musicUrl',
                      'videoUrl',
                      'honoree',
                      'family',
                      'heading',
                      'introduction',
                    ].includes(key),
                )
                .map(([key, value]) => (
                  <label key={key}>
                    {key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (letter) => letter.toUpperCase())}
                    {value.length > 100 ? (
                      <textarea
                        rows={3}
                        maxLength={3000}
                        value={value}
                        onChange={(event) => detail(key, event.target.value)}
                      />
                    ) : (
                      <input
                        maxLength={600}
                        value={value}
                        onChange={(event) => detail(key, event.target.value)}
                      />
                    )}
                  </label>
                ))}
            </div>
          </section>
        )}
        <RepeatableFields
          title="Jadwal & lokasi"
          items={data.events}
          fields={[
            ...(templateMode
              ? [{ key: 'date', label: 'Tanggal acara' }]
              : []),
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
            <small>
              Pilih doa untuk menambahkannya ke daftar, lalu edit bila perlu.
            </small>
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
          <div className="admin-panel-heading">
            <h2>Foto slideshow & galeri</h2>
            <button
              type="button"
              className="admin-text-button"
              disabled={(data.photos || []).length >= 30}
              onClick={() => detail('photos', [...(data.photos || []), ''])}
            >
              Tambah foto
            </button>
          </div>
          <div className="admin-field-grid">
            {(data.photos || []).map((photo, index) => (
              <div className="admin-repeat-item" key={index}>
                <ImageField
                  label={'Foto ' + (index + 1)}
                  value={photo}
                  localOnly={localOnly}
                  onPending={uploadPending}
                  onChange={(value) =>
                    uploadedDetail(
                      'photos',
                      (formRef.current.data.photos || []).map(
                        (item, itemIndex) =>
                          itemIndex === index ? value : item,
                      ),
                    )
                  }
                />
                <button
                  type="button"
                  className="admin-text-danger"
                  onClick={() =>
                    detail(
                      'photos',
                      data.photos.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  Hapus foto
                </button>
              </div>
            ))}
          </div>
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
          <p>
            {templateMode
              ? 'Perubahan menjadi konten default untuk template ini.'
              : localOnly
              ? 'Perubahan disimpan di browser perangkat ini.'
              : 'Draft dapat dipreview sebelum diterbitkan.'}
          </p>
          <button className="admin-button" type="submit">
            {busy
              ? 'Menyimpan…'
              : templateMode
                ? 'Simpan template'
                : localOnly
                ? 'Simpan di perangkat'
                : 'Simpan undangan'}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
