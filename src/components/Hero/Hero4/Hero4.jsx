import HeroSlideshow from '../HeroSlideshow';
import AnimatedText from '../../AnimatedText/AnimatedText';
import './Hero4.css';

export default function Hero4({
  image,
  images,
  sunlightEnabled,
  subtitle,
  title,
  date,
  bottomOrnament,
  children,
}) {
  return (
    <section className="invitation-hero hero-4">
      <div className="hero-4__photograph">
        <HeroSlideshow
          image={image}
          images={images}
          sunlightEnabled={sunlightEnabled}
        />
        <span className="hero-4__edition" aria-hidden="true">
          A DAY TO REMEMBER
        </span>
      </div>
      {children}
      <div className="invitation-hero-copy hero-4__copy animate-soft-rise">
        <span className="invitation-kicker">{subtitle}</span>
        <h1>
          <AnimatedText text={title} effect="type" />
        </h1>
        <p>{date}</p>
        <a className="invitation-scroll" href="#invitation-intro">
          Jelajahi cerita kami <span aria-hidden="true">↓</span>
        </a>
        {bottomOrnament && (
          <div
            className="hero-4__ornament"
            data-design-ornament="hero-bottom"
            data-design-key="hero-bottom"
            aria-hidden="true"
          >
            <img
              src={bottomOrnament}
              alt=""
              decoding="async"
              draggable="false"
            />
          </div>
        )}
      </div>
    </section>
  );
}
