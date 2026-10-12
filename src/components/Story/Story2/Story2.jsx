import AnimatedText from '../../AnimatedText/AnimatedText';
import './Story2.css';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';

export default function Story2({ stories }) {
  return (
    <section className="invitation-section story-2">
      <ScrollReveal animationClass="animate-soft-rise">
        <span className="invitation-kicker">CHAPTERS OF OUR STORY</span>
        <h2>
          <AnimatedText text="Perjalanan kami" />
        </h2>
        <p>Setiap langkah kecil membawa kami ke hari yang istimewa ini.</p>
      </ScrollReveal>
      <ol className="story-2__timeline">
        {stories.map((story, index) => (
          <li className="story-2__entry" key={`${story.date}-${story.title}`}>
            <span className="story-2__number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <ScrollReveal
              as="article"
              animationClass={
                index % 2 === 0 ? 'animate-slide-left' : 'animate-slide-right'
              }
              delay={`delay-${Math.min(index * 100, 900)}`}
            >
              <span className="story-2__date">{story.date}</span>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
