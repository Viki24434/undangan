import { useState } from 'react';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Gift2.css';

export default function Gift2({ banks }) {
  const [copied, setCopied] = useState('');
  const [copyError, setCopyError] = useState('');

  async function copyAccount(accountNumber) {
    setCopyError('');
    setCopied('');
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(accountNumber);
    } catch {
      setCopyError(
        'Nomor belum bisa disalin otomatis. Silakan salin nomor yang ditampilkan.',
      );
    }
  }

  return (
    <section className="invitation-section gift-2">
      <span className="invitation-kicker">A TOKEN OF LOVE</span>
      <h2>Wedding gift</h2>
      <p>
        Doa restu dan kehadiranmu adalah hadiah terindah. Jika berkenan,
        ungkapan kasih dapat dikirim melalui:
      </p>
      <div className="gift-2__cards">
        {banks.map((bank, index) => (
          <ScrollReveal
            as="article"
            className="gift-2__card"
            animationClass="animate-soft-rise"
            delay={`delay-${Math.min(index * 200, 900)}`}
            key={`${bank.name}-${bank.rek}-${index}`}
          >
            <span className="gift-2__ornament" aria-hidden="true">
              ✧
            </span>
            <h3>{bank.name}</h3>
            <p className="gift-2__account">{bank.rek}</p>
            <p>a.n. {bank.owner}</p>
            <button
              className="invitation-button invitation-button-outline"
              type="button"
              onClick={() => copyAccount(bank.rek)}
            >
              {copied === bank.rek ? '✓ Berhasil disalin' : 'Salin rekening'}
            </button>
          </ScrollReveal>
        ))}
      </div>
      <p className="gift-2__status" role="status">
        {copyError || (copied ? 'Nomor rekening berhasil disalin.' : '')}
      </p>
    </section>
  );
}
