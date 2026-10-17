import './Cover1.css';

export default function Cover1({
  title,
  subtitle,
  guestName,
  onOpen,
  isOpened,
  bgImage,
  children,
}) {
  return (
    <div
      className={`cover-1-wrapper ${isOpened ? 'is-opened' : ''}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="cover-1-overlay"></div>
      {children}

      <div className="cover-1-content animate-blur-reveal">
        <p
          className="animate-fade-in-down"
          style={{ letterSpacing: '3px', textTransform: 'uppercase' }}
        >
          {subtitle}
        </p>
        <h1 className="cover-1-title animate-zoom-in has-delay delay-300">
          {title}
        </h1>

        <div
          className="animate-fade-in-up has-delay delay-500"
          style={{ marginTop: '40px' }}
        >
          {guestName && (
            <>
              <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <h3
                className="cover-1-guest-name"
                style={{
                  fontSize: '1.5rem',
                  margin: '0 0 20px 0',
                  borderBottom: '1px solid var(--color-accent)',
                  display: 'inline-block',
                  paddingBottom: '5px',
                }}
              >
                {guestName}
              </h3>
              <br />
            </>
          )}
          <button
            onClick={onOpen}
            className="animate-pulse"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-bg)',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Buka Undangan 💌
          </button>
        </div>
      </div>
    </div>
  );
}
