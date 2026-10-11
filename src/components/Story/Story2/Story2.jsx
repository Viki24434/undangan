import './Story2.css';

export default function Story2({ stories }) {
  return (
    <section className="invitation-section story-2">
      <span className="invitation-kicker">CHAPTERS OF OUR STORY</span>
      <h2>Perjalanan kami</h2>
      <p>Setiap langkah kecil membawa kami ke hari yang istimewa ini.</p>
      <ol className="story-2__timeline">
        {stories.map((story, index) => (
          <li className="story-2__entry" key={`${story.date}-${story.title}`}>
            <span className="story-2__number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <article>
              <span className="story-2__date">{story.date}</span>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
