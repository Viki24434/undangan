import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Story3.css';

export default function Story3({ stories = [] }) {
  return (
    <section className="invitation-section story-3" id="invitation-story">
      <span className="invitation-kicker">LITTLE MOMENTS, OUR STORY</span>
      <h2>Halaman cerita kami</h2>
      <div className="story-3__chapters">
        {stories.map((story, index) => (
          <ScrollReveal
            as="article"
            className="story-3__chapter invitation-surface"
            animationClass="animate-soft-rise"
            key={`${story.title}-${index}`}
          >
            <span className="story-3__number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <time>{story.date}</time>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
