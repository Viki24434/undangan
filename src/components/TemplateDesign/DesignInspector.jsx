import { DESIGN_ENTRIES, DESIGN_MOTIONS } from './designConfig';

export default function DesignInspector({
  item,
  native,
  onChange,
  onReset,
  onDuplicate,
  onReplace,
  disabled,
}) {
  if (!item)
    return (
      <div className="designer-empty">
        <h3>Pilih ornamen</h3>
        <p>
          Klik ornamen pada preview atau pilih dari daftar lapisan untuk
          mengatur tampilannya.
        </p>
      </div>
    );
  return (
    <div className="admin-form designer-inspector">
      <h3>Pengaturan ornamen</h3>
      <fieldset disabled={disabled}>
        <button
          className="admin-button secondary"
          type="button"
          onClick={onReplace}
        >
          Ganti gambar ornamen
        </button>
        <div className="designer-control-grid">
          {[
            ['x', 'Posisi X (%)', -200, 300, 0.5],
            ['y', 'Posisi Y (%)', -200, 300, 0.5],
            ['width', 'Lebar (%)', 1, 400, 0.5],
            ...(item.height !== undefined
              ? [['height', 'Tinggi (%)', 1, 400, 0.5]]
              : []),
            [
              'rotate',
              native ? 'Rotasi tambahan (°)' : 'Rotasi (°)',
              -360,
              360,
              1,
            ],
            ['zIndex', 'Urutan lapisan', -5, 50, 1],
          ].map(([key, label, min, max, step]) => (
            <label key={key}>
              {label}
              <input
                aria-label={label}
                type="number"
                min={min}
                max={max}
                step={step}
                value={Number((item[key] ?? 30).toFixed(2))}
                onChange={(event) => {
                  if (event.target.value !== '')
                    onChange({
                      [key]: Math.min(
                        max,
                        Math.max(min, Number(event.target.value)),
                      ),
                    });
                }}
              />
            </label>
          ))}
        </div>
        <label>
          Opasitas ({Math.round(item.opacity * 100)}%)
          <input
            aria-label="Opasitas ornamen"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={item.opacity}
            onChange={(event) =>
              onChange({ opacity: Number(event.target.value) })
            }
          />
        </label>
        <div className="designer-switches">
          {[
            ['flipX', 'Cerminkan horizontal'],
            ['flipY', 'Cerminkan vertikal'],
            ['hidden', 'Sembunyikan ornamen'],
          ].map(([key, label]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={!!item[key]}
                onChange={(event) => onChange({ [key]: event.target.checked })}
              />
              {label}
            </label>
          ))}
        </div>
        <label>
          Animasi masuk
          <select
            aria-label="Animasi masuk"
            value={item.entry}
            onChange={(event) =>
              onChange({
                entry: event.target.value,
                ...(native &&
                  item.motion === 'inherit' &&
                  event.target.value !== 'inherit' && { motion: 'none' }),
              })
            }
          >
            {DESIGN_ENTRIES.filter(([key]) => native || key !== 'inherit').map(
              ([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ),
            )}
          </select>
        </label>
        <div className="designer-control-grid">
          <label>
            Durasi masuk (detik)
            <input
              type="number"
              min="0.2"
              max="8"
              step="0.1"
              value={item.entryDuration}
              onChange={(event) =>
                onChange({
                  entryDuration: Math.max(
                    0.2,
                    Math.min(8, Number(event.target.value)),
                  ),
                })
              }
            />
          </label>
          <label>
            Jeda masuk (detik)
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={item.delay}
              onChange={(event) =>
                onChange({
                  delay: Math.max(0, Math.min(10, Number(event.target.value))),
                })
              }
            />
          </label>
        </div>
        <label>
          Gerak berulang
          <select
            aria-label="Gerak berulang"
            value={item.motion}
            onChange={(event) => onChange({ motion: event.target.value })}
          >
            {DESIGN_MOTIONS.filter(([key]) => native || key !== 'inherit').map(
              ([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ),
            )}
          </select>
        </label>
        <label>
          Durasi satu gerakan (detik)
          <input
            type="number"
            min="0.2"
            max="30"
            step="0.1"
            value={item.duration}
            onChange={(event) =>
              onChange({
                duration: Math.max(
                  0.2,
                  Math.min(30, Number(event.target.value)),
                ),
              })
            }
          />
        </label>
        <div className="admin-actions">
          <button
            className="admin-button secondary"
            type="button"
            onClick={onReset}
          >
            {native ? 'Pulihkan ornamen' : 'Hapus ornamen'}
          </button>
          {!native && (
            <button
              className="admin-button secondary"
              type="button"
              onClick={onDuplicate}
            >
              Duplikat
            </button>
          )}
        </div>
      </fieldset>
    </div>
  );
}
