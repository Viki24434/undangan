import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Story4.css';

export default function Story4({ stories = [] }) {
  return (
    <section className="invitation-section story-4" id="invitation-story">
      <span className="invitation-kicker">EVERY CHAPTER BROUGHT US HERE</span>
      <h2>Jejak menuju hari ini</h2>
      <p>Setiap pertemuan meninggalkan cerita.</p>
      <ol>
        {stories.map((story, index) => (
          <li key={`${story.title}-${index}`}>
            <ScrollReveal
              as="article"
              animationClass={
                index % 2 ? 'animate-slide-right' : 'animate-slide-left'
              }
            >
              <span className="story-4__marker" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <time>{story.date}</time>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
