import { useState } from 'react';
import Button from '../../Button/Button';
import './Gift1.css';

export default function Gift1({ banks }) {
  const [copied, setCopied] = useState('');
  const [copyError, setCopyError] = useState('');

  const handleCopy = async (rek) => {
    setCopyError('');
    setCopied('');
    try {
      await navigator.clipboard.writeText(rek);
      setCopied(rek);
    } catch {
      setCopyError(
        'Nomor belum bisa disalin otomatis. Silakan salin nomor yang ditampilkan.',
      );
    }
  };

  return (
    <section className="gift-1-container">
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-accent)',
          fontSize: '2.5rem',
        }}
      >
        Wedding Gift
      </h2>
      <p style={{ maxWidth: '400px', margin: '10px auto 30px' }}>
        Bagi bapak/ibu/saudara/i yang ingin mengirimkan hadiah, silakan
        mengirimkannya melalui:
      </p>

      {banks.map((bank, index) => (
        <div key={index} className="gift-1-card animate-fade-in-up">
          <h3>{bank.name}</h3>
          <p
            style={{
              fontSize: '1.2rem',
              letterSpacing: '2px',
              margin: '10px 0',
            }}
          >
            {bank.rek}
          </p>
          <p style={{ marginBottom: '20px' }}>a.n {bank.owner}</p>
          <Button
            variant="outline"
            onClick={() => handleCopy(bank.rek)}
            style={{
              width: '100%',
              borderColor: 'var(--color-accent)',
              color: 'var(--color-text)',
            }}
          >
            {copied === bank.rek ? '✓ Berhasil Disalin' : 'Salin No. Rekening'}
          </Button>
        </div>
      ))}
      <p role="status">
        {copyError || (copied ? 'Nomor rekening berhasil disalin.' : '')}
      </p>
    </section>
  );
}
