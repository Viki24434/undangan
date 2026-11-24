import './BrandLogo.css';

export default function BrandLogo({ surface = false }) {
  return (
    <span className={`brand-logo${surface ? ' brand-logo--surface' : ''}`}>
      <img
        className="brand-logo__symbol"
        src="/assets/brand/logo-symbol.png"
        alt=""
        width="360"
        height="375"
      />
      <img
        className="brand-logo__wordmark"
        src="/assets/brand/logo-wordmark.png"
        alt="Ciptala — Ubah Ide Menjadi Nyata"
        width="816"
        height="276"
      />
    </span>
  );
}
