import { Link } from 'react-router-dom';
import './MobileWrapper.css';

export default function MobileWrapper({
  children,
  bgImage,
  backTo = '/katalog',
  onBack,
  editTo,
  orderTo,
  orderError,
}) {
  const defaultBg =
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80';

  return (
    <div
      className="mw-desktop-bg"
      style={{ backgroundImage: `url(${bgImage || defaultBg})` }}
    >
      <div className="mw-overlay"></div>

      {onBack ? (
        <button
          type="button"
          className="mw-close-btn mw-admin-back"
          onClick={onBack}
        >
          ← Kembali ke editor
        </button>
      ) : (
        <Link
          to={backTo}
          className={`mw-close-btn ${backTo.startsWith('/admin') ? 'mw-admin-back' : ''}`}
        >
          {backTo.startsWith('/admin')
            ? '← Kembali ke editor'
            : '← Kembali ke katalog'}
        </Link>
      )}
      {editTo && (
        <Link to={editTo} className="mw-edit-btn">
          Edit template ini ↗
        </Link>
      )}
      {orderTo !== undefined &&
        (orderTo ? (
          <a
            href={orderTo}
            className="mw-order-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pesan template ini ↗
          </a>
        ) : (
          <span className="mw-order-btn is-disabled">
            WhatsApp belum diatur
          </span>
        ))}
      {orderError && (
        <p className="mw-order-error" role="status">
          {orderError}
        </p>
      )}

      <div className="mw-device">{children}</div>
    </div>
  );
}
