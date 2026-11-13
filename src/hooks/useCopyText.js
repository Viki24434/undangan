import { useState } from 'react';

export default function useCopyText() {
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');
  async function copy(value) {
    setCopied('');
    setError('');
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(String(value));
    } catch {
      setError(
        'Belum bisa disalin otomatis. Silakan salin nomor yang ditampilkan.',
      );
    }
  }
  return { copied, error, copy };
}
