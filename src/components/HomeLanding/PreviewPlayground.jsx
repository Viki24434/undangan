import { useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import './PreviewPlayground.css';

function PreviewPhone({ template, recipient }) {
  const [opened, setOpened] = useState(false);
  const wedding = template.presentation.kind === 'wedding';
  const to = `/t/${template.id}${recipient.trim() ? `?${new URLSearchParams({ to: recipient.trim() })}` : ''}`;
  return (
    <div
      className={`invite-phone playground-phone ${opened ? 'is-opened' : ''}`}
      style={{ '--preview-accent': template.palette?.[1] || '#d7c59a' }}
    >
      <div className="invite-phone-bar" />
      <img src={template.img} alt="" fetchPriority="high" decoding="async" />
      <div className="invite-phone-content">
        {opened ? (
          <div className="playground-mini-story">
            <span aria-hidden="true">✧</span>
            <small>SATU HARI, SEJUTA CERITA</small>
            <h2>{wedding ? 'Hari bahagia kami' : 'Waktunya merayakan!'}</h2>
            <p>
              {recipient.trim() ? `${recipient.trim()},` : 'Kamu diundang'}
              <br />
              hadir melengkapi cerita ini.
            </p>
            <Link to={to}>Jelajahi demo lengkap ↗</Link>
            <button type="button" onClick={() => setOpened(false)}>
              ↻ Ulangi cover
            </button>
          </div>
        ) : (
          <div className="playground-cover">
            <span className="playground-cover__eyebrow">
              {wedding ? 'THE WEDDING OF' : 'A LITTLE CELEBRATION'}
            </span>
            <h2>
              {wedding ? (
                <>
                  Alya <em>&</em> Raka
                </>
              ) : (
                <>
                  Happy
                  <br />
                  <em>Birthday</em>Nara
                </>
              )}
            </h2>
            <p>
              {wedding ? 'SEBUAH AWAL YANG INDAH' : 'HARI KECIL, BAHAGIA BESAR'}
            </p>
            <div className="invite-phone-rule" aria-hidden="true">
              ✧
            </div>
            {recipient.trim() && (
              <div className="playground-recipient" aria-live="polite">
                <small>Dengan hangat kami mengundang</small>
                <strong>{recipient.trim()}</strong>
              </div>
            )}
            <button
              className="invite-preview-button"
              type="button"
              onClick={() => setOpened(true)}
            >
              Coba buka undangan ↗
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PreviewPlayground({ catalog }) {
  const [packageId, setPackageId] = useState('gold');
  const [recipient, setRecipient] = useState('');
  const choices = [
    ['gold', 'Gold', 'Klasik & personal'],
    ['platinum', 'Platinum', 'Sinematik & berkesan'],
    ['silver', 'Silver', 'Perayaan penuh warna'],
  ].flatMap(([id, label, description]) => {
    const template = catalog.templates.find((item) => item.packageId === id);
    return template ? [{ id, label, description, template }] : [];
  });
  const active = choices.find((item) => item.id === packageId) || choices[0];
  return (
    <div className="preview-playground">
      <div className="playground-topline">
        <span className="playground-live-dot" /> COBA DULU, JATUH HATI KEMUDIAN{' '}
        <span aria-hidden="true">↙</span>
      </div>
      <div className="playground-stage">
        <div className="playground-orbit" aria-hidden="true" />
        <span className="playground-caption">
          a little preview of your beautiful day
        </span>
        <span
          className="playground-spark playground-spark--one"
          aria-hidden="true"
        >
          ✳
        </span>
        <span
          className="playground-spark playground-spark--two"
          aria-hidden="true"
        >
          ✧
        </span>
        {active ? (
          <PreviewPhone
            key={active.template.id}
            template={active.template}
            recipient={recipient}
          />
        ) : (
          <div className="playground-placeholder" role="status">
            <span aria-hidden="true">✧</span>
            <p>
              {catalog.loading
                ? 'Menyiapkan inspirasi…'
                : 'Temukan inspirasimu di katalog.'}
            </p>
          </div>
        )}
        {active && (
          <span className="playground-theme-label">{active.template.name}</span>
        )}
      </div>
      <div className="playground-controls">
        <div
          className="playground-styles"
          role="group"
          aria-label="Coba gaya undangan"
        >
          {choices.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={active?.id === item.id}
              onClick={() => setPackageId(item.id)}
            >
              <span>{item.label}</span>
              <small>{item.description}</small>
            </button>
          ))}
        </div>
        <label className="playground-name">
          <span>
            Coba nama penerima <small>opsional</small>
          </span>
          <input
            type="text"
            maxLength={80}
            value={recipient}
            placeholder="Misalnya: Viki & keluarga"
            onChange={(event) => setRecipient(event.target.value)}
          />
        </label>
        <div className="playground-footnote">
          <small>Simulasi cover. Lihat seluruh desain di demo.</small>
          <Link
            to={
              active
                ? `/t/${active.template.id}${recipient.trim() ? `?${new URLSearchParams({ to: recipient.trim() })}` : ''}`
                : '/katalog'
            }
          >
            Buka demo <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
