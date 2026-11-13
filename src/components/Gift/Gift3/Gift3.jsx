import useCopyText from '../../../hooks/useCopyText';
import './Gift3.css';

export default function Gift3({ banks = [] }) {
  const { copied, error, copy } = useCopyText();
  return (
    <section className="invitation-section gift-3" id="invitation-gift">
      <span className="invitation-kicker">A LITTLE GIFT, A LOT OF LOVE</span>
      <h2>Tanda kasih</h2>
      <p>Kehadiran dan doa baikmu adalah hadiah terindah bagi kami.</p>
      <div className="gift-3__accounts">
        {banks.map((bank, index) => (
          <details
            className="gift-3__account invitation-surface"
            key={`${bank.name}-${index}`}
            open={index === 0}
          >
            <summary>
              <span>
                <strong>{bank.name}</strong>
                <small>{bank.owner}</small>
              </span>
              <b aria-hidden="true">+</b>
            </summary>
            <div className="gift-3__details">
              <span className="gift-3__number">{bank.rek}</span>
              <button
                className="invitation-button invitation-button-outline"
                type="button"
                onClick={() => copy(bank.rek)}
              >
                {copied === String(bank.rek)
                  ? '✓ Berhasil disalin'
                  : 'Salin rekening'}
              </button>
            </div>
          </details>
        ))}
      </div>
      <p role="status">
        {error || (copied ? 'Nomor rekening berhasil disalin.' : '')}
      </p>
    </section>
  );
}
