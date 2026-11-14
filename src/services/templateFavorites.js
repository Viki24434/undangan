const key = 'ciptain:favorite-templates:v1';
const listeners = new Set();
const empty = [];
let snapshot = empty;
let loaded = false;
let storageError = '';

function read() {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value)
      ? [
          ...new Set(
            value.filter((id) => typeof id === 'string' && id.length <= 80),
          ),
        ].slice(0, 500)
      : [];
  } catch {
    return [];
  }
}

function publish() {
  listeners.forEach((listener) => listener());
}

function receiveStorage(event) {
  if (event.key !== key && event.key !== null) return;
  snapshot = read();
  storageError = '';
  publish();
}

export function subscribeFavorites(listener) {
  if (!loaded) {
    if (!storageError) snapshot = read();
    loaded = true;
  }
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener('storage', receiveStorage);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      window.removeEventListener('storage', receiveStorage);
      loaded = false;
    }
  };
}

export function favoriteSnapshot() {
  return snapshot;
}

export function favoriteStorageError() {
  return storageError;
}

export function toggleFavorite(id) {
  const current = loaded ? snapshot : read();
  snapshot = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id].slice(-500);
  try {
    localStorage.setItem(key, JSON.stringify(snapshot));
    storageError = '';
  } catch {
    storageError =
      'Favorit berlaku selama halaman ini terbuka. Browser belum mengizinkan penyimpanan di perangkat.';
  }
  loaded = true;
  publish();
}
