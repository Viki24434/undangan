const entries = new Map();
const lifetime = 10_000;

function subscribe(promise, signal) {
  if (!signal) return promise;
  if (signal.aborted)
    return Promise.reject(
      new DOMException('Permintaan dibatalkan.', 'AbortError'),
    );

  return new Promise((resolve, reject) => {
    const abort = () =>
      reject(new DOMException('Permintaan dibatalkan.', 'AbortError'));
    signal.addEventListener('abort', abort, { once: true });
    promise
      .then(resolve, reject)
      .finally(() => signal.removeEventListener('abort', abort));
  });
}

export function cachedCatalog(key, load, signal) {
  if (signal?.aborted)
    return Promise.reject(
      new DOMException('Permintaan dibatalkan.', 'AbortError'),
    );
  let entry = entries.get(key);
  if (!entry || (entry.expires && entry.expires <= Date.now())) {
    entry = { expires: 0, promise: null };
    entry.promise = Promise.resolve()
      .then(load)
      .then((value) => {
        entry.expires = Date.now() + lifetime;
        return value;
      })
      .catch((error) => {
        if (entries.get(key) === entry) entries.delete(key);
        throw error;
      });
    entries.set(key, entry);
  }
  return subscribe(entry.promise, signal);
}

export function invalidateCatalog() {
  entries.clear();
}
