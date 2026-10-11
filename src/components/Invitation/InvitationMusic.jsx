import { useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './InvitationMusic.css';

export default function InvitationMusic({ ref, src, visible }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState('');

  async function play() {
    setError('');
    try {
      await audioRef.current?.play();
    } catch (error) {
      setPlaying(false);
      setError(
        error.name === 'NotAllowedError'
          ? 'Ketuk tombol untuk memutar musik.'
          : 'Musik belum dapat diputar. Coba kembali.',
      );
    }
  }

  useImperativeHandle(ref, () => ({ play }));

  function toggle() {
    if (audioRef.current?.paused) play();
    else audioRef.current?.pause();
  }

  return createPortal(
    <div className="invitation-music" hidden={!visible}>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setError('Musik tidak tersedia. Periksa tautan audio undangan.');
        }}
      />
      <button
        type="button"
        className={`invitation-music-button ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Jeda musik' : 'Putar musik'}
        aria-pressed={playing}
        title={playing ? 'Jeda musik' : 'Putar musik'}
      >
        <svg
          className="invitation-music-disc"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="24"
            cy="24"
            r="21"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="24" cy="24" r="16" stroke="currentColor" opacity=".35" />
          <circle cx="24" cy="24" r="11" stroke="currentColor" opacity=".35" />
          <path
            d="M25 15v16m0-14 8-2v13M25 19l8-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse cx="22" cy="31" rx="4" ry="3" fill="currentColor" />
          <ellipse cx="30" cy="28" rx="4" ry="3" fill="currentColor" />
        </svg>
        <span className="invitation-music-indicator" aria-hidden="true">
          {playing ? 'Ⅱ' : '▶'}
        </span>
      </button>
      {error && (
        <span className="invitation-music-message" role="status">
          {error}
        </span>
      )}
    </div>,
    document.body,
  );
}
