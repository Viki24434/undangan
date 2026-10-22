export function processGuestSpreadsheet(type, payload) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('../workers/guestSpreadsheet.worker.js', import.meta.url),
      { type: 'module' },
    );
    const finish = (error, result) => {
      window.clearTimeout(timer);
      worker.terminate();
      if (error) reject(error);
      else resolve(result);
    };
    const timer = window.setTimeout(
      () =>
        finish(
          new Error(
            'File terlalu rumit untuk diproses. Gunakan format contoh Excel.',
          ),
        ),
      20000,
    );
    worker.onmessage = ({ data }) =>
      finish(data.error ? new Error(data.error) : null, data.result);
    worker.onerror = () =>
      finish(
        new Error(
          'Excel belum dapat diproses. Muat ulang halaman lalu coba lagi.',
        ),
      );
    worker.postMessage({ type, payload });
  });
}

export function downloadGuestSpreadsheet(buffer, filename) {
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
