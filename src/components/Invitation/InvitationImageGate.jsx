import { useEffect, useState } from 'react';
import { loadOpeningImage } from './invitationImages';
import './InvitationImageGate.css';

const completed = new Set();

export default function InvitationImageGate({ signature, children }) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({
    signature: '',
    done: 0,
    failed: 0,
    ready: false,
  });
  const [bypass, setBypass] = useState('');
  useEffect(() => {
    if (completed.has(signature)) return;
    let active = true;
    const sources = JSON.parse(signature);
    let cursor = 0;
    let done = 0;
    let failed = 0;
    async function worker() {
      while (active && cursor < sources.length) {
        const source = sources[cursor++];
        try {
          await loadOpeningImage(source);
        } catch {
          failed++;
        }
        done++;
        if (active) {
          if (done === sources.length && !failed) {
            completed.add(signature);
            if (completed.size > 100)
              completed.delete(completed.values().next().value);
          }
          setState({
            signature,
            done,
            failed,
            ready: done === sources.length && !failed,
          });
        }
      }
    }
    Promise.all(
      Array.from({ length: Math.min(6, sources.length) }, worker),
    ).then(() => {
      if (active && !sources.length) {
        completed.add(signature);
        setState({ signature, done: 0, failed: 0, ready: true });
      }
    });
    return () => {
      active = false;
    };
  }, [signature, attempt]);
  const total = JSON.parse(signature).length;
  const current =
    state.signature === signature
      ? state
      : { done: 0, failed: 0, ready: false };
  if (current.ready || completed.has(signature) || bypass === signature)
    return children;
  const finished = current.done === total;
  return (
    <div className="invitation-image-loading" role="status" aria-live="polite">
      <span className="invitation-image-loading__flower" aria-hidden="true">
        ✧
      </span>
      <h2>Menyiapkan cerita indah…</h2>
      <p>
        {finished && current.failed
          ? `${current.failed} gambar belum dapat dimuat. Periksa koneksi lalu coba kembali.`
          : 'Foto dan ornamen sedang disiapkan sebelum undangan dibuka.'}
      </p>
      <progress
        value={current.done}
        max={total || 1}
        aria-label="Pemuatan gambar undangan"
      />
      <small>
        {current.done} / {total} gambar
      </small>
      {finished && current.failed > 0 && (
        <div>
          <button
            type="button"
            onClick={() => {
              setState({ signature: '', done: 0, failed: 0, ready: false });
              setAttempt((value) => value + 1);
            }}
          >
            Coba muat gambar lagi
          </button>
          <button type="button" onClick={() => setBypass(signature)}>
            Lanjutkan dengan gambar tersedia
          </button>
        </div>
      )}
    </div>
  );
}
