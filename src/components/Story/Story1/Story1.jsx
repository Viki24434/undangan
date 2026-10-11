import './Story1.css';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';

export default function Story1({ stories }) {
  return (
    <section className="story-1-container">
      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)', fontSize: '2.5rem' }}>Our Love Story</h2>
      
      <div className="story-1-timeline">
        {stories.map((story, index) => (
          <ScrollReveal
            as="div"
            key={index}
            className="story-1-item"
            animationClass="animate-soft-rise"
            delay={`delay-${Math.min(index * 200, 900)}`}
          >
            <h3>{story.title}</h3>
            <span>{story.date}</span>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{story.description}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}