import { useEffect, useRef, useState } from 'react';
import {
  removeDesignDraft,
  writeDesignDraft,
} from '../../services/designDrafts';

export default function useDesignDraft({
  key,
  sourceId,
  baseline,
  value,
  enabled,
}) {
  const [status, setStatus] = useState(null);
  const pending = useRef(null);
  const timer = useRef(null);
  const written = useRef(null);
  const serialized = JSON.stringify(value);

  useEffect(() => {
    if (!enabled || !baseline) {
      pending.current = null;
      return;
    }
    function persist() {
      try {
        if (serialized === baseline) {
          if (written.current?.key === key) {
            removeDesignDraft(key, written.current.serialized);
            written.current = null;
          }
          setStatus(null);
        } else {
          const savedAt = new Date().toISOString();
          const stored = writeDesignDraft(key, {
            version: 1,
            sourceId,
            baseline,
            savedAt,
            value: JSON.parse(serialized),
          });
          written.current = { key, serialized: stored };
          setStatus({ key, serialized, savedAt });
        }
      } catch {
        setStatus({
          key,
          error:
            'Draft otomatis gagal disimpan. Periksa ruang penyimpanan browser dan simpan desain ke server.',
        });
      }
    }
    pending.current = persist;
    timer.current = setTimeout(persist, 700);
    return () => clearTimeout(timer.current);
  }, [key, sourceId, baseline, serialized, enabled]);

  useEffect(() => {
    const flush = () => pending.current?.();
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    window.addEventListener('pagehide', flush);
    window.addEventListener('beforeunload', flush);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      flush();
      window.removeEventListener('pagehide', flush);
      window.removeEventListener('beforeunload', flush);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  function clear() {
    pending.current = null;
    clearTimeout(timer.current);
    try {
      removeDesignDraft(key);
      setStatus(null);
    } catch {
      setStatus({
        key,
        error:
          'Draft perangkat belum dapat dihapus. Data yang disimpan ke server tetap tersedia.',
      });
    }
  }

  return {
    clear,
    status: status?.key === key ? status : null,
    saving:
      enabled && serialized !== baseline && status?.serialized !== serialized,
  };
}
