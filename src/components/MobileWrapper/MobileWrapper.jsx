import React from 'react';
import { Link } from 'react-router-dom';
import './MobileWrapper.css';

export default function MobileWrapper({
  children,
  bgImage,
  backTo = '/katalog',
}) {
  const defaultBg =
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80';

  return (
    <div
      className="mw-desktop-bg"
      style={{ backgroundImage: `url(${bgImage || defaultBg})` }}
    >
      <div className="mw-overlay"></div>

      <Link
        to={backTo}
        className={`mw-close-btn ${backTo.startsWith('/admin') ? 'mw-admin-back' : ''}`}
      >
        {backTo.startsWith('/admin')
          ? '← Kembali ke editor'
          : '← Kembali ke katalog'}
      </Link>

      <div className="mw-device">{children}</div>
    </div>
  );
}
