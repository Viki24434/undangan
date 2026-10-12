import AnimatedText from '../../AnimatedText/AnimatedText';
import './Hero2.css';
import HeroSlideshow from '../HeroSlideshow';

export default function Hero2({
  image,
  images,
  sunlightEnabled,
  subtitle,
  title,
  date,
  children,
}) {
  return (
    <section className="invitation-hero hero-2">
      <HeroSlideshow
        image={image}
        images={images}
        sunlightEnabled={sunlightEnabled}
      />
      {children}
      <div className="invitation-hero-copy hero-2__copy">
        <span className="invitation-kicker animate-fade-in-down delay-300">
          {subtitle}
        </span>
        <h1 className="animate-blur-reveal delay-500">
          <AnimatedText text={title} effect="scramble" />
        </h1>
        <span className="invitation-divider" aria-hidden="true">
          ✧
        </span>
        <p className="animate-fade-in-up delay-700">{date}</p>
        <a
          className="invitation-scroll animate-fade-in-up delay-900"
          href="#invitation-intro"
        >
          Jelajahi cerita kami <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
