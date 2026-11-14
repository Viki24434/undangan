import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { packageName, packagePriceText } from '../../config/invitationPackages';
import './TemplateComparison.css';

export default function TemplateComparison({ templates, pricing, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialog}
      className="template-comparison"
      aria-labelledby="comparison-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="template-comparison__body">
        <header>
          <div>
            <span>PILIH DENGAN LEBIH YAKIN</span>
            <h2 id="comparison-title">Mana yang paling kamu?</h2>
            <p>Bandingkan gaya dan paket, lalu coba demo favoritmu.</p>
          </div>
          <button
            type="button"
            aria-label="Tutup perbandingan"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div
          className="template-comparison__grid"
          style={{ '--comparison-columns': templates.length }}
        >
          {templates.map((template) => {
            const item = pricing.packages.find(
              (entry) => entry.id === template.packageId,
            );
            return (
              <article key={template.id}>
                <img
                  src={template.img}
                  alt={`Suasana tema ${template.name}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="template-comparison__copy">
                  <span>
                    {template.category} · {packageName(template.packageId)}
                  </span>
                  <h3>{template.name}</h3>
                  <strong>
                    {packagePriceText(
                      item || { id: template.packageId },
                      pricing,
                    )}
                  </strong>
                  <p>{template.description}</p>
                  <div
                    className="template-comparison__palette"
                    aria-label="Palet warna"
                  >
                    {template.palette?.map((color, index) => (
                      <i
                        key={`${color}-${index}`}
                        style={{ background: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <h4>Fitur paket</h4>
                  <ul>
                    {item?.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <Link className="comparison-demo" to={`/t/${template.id}`}>
                    Buka demo ↗
                  </Link>
                  <Link className="comparison-edit" to={`/edit/${template.id}`}>
                    Coba edit tema ini
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
