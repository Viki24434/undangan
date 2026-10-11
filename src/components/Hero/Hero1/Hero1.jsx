import './Hero1.css';

export default function Hero1({ bgImage, subtitle, title, quote, children }) {
  return (
    <section
      className="hero-1-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-1-overlay"></div>
      {children}

      <div className="hero-1-content">
        <p className="hero-1-subtitle animate-fade-in-down delay-300">
          {subtitle}
        </p>

        <h1 className="hero-1-title animate-zoom-in has-delay delay-500">
          {title}
        </h1>

        {quote && (
          <p className="hero-1-quote animate-fade-in-up has-delay delay-700">
            "{quote}"
          </p>
        )}
      </div>
    </section>
  );
}
