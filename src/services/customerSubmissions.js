import { apiRequest, API_BASE_URL } from './api';
import { localPreview } from './localDrafts';
import { guestId } from './guestList';
import { guestMessageError } from './guestMessage';

const attempts = new Map();
const hex = (buffer) =>
  Array.from(new Uint8Array(buffer), (value) =>
    value.toString(16).padStart(2, '0'),
  ).join('');

async function digest(value) {
  if (!crypto.subtle)
    throw new Error('Pengiriman memerlukan koneksi HTTPS atau localhost.');
  return hex(await crypto.subtle.digest('SHA-256', value));
}

function storedAttempt(id, fingerprint) {
  const key = `ciptain:submission-attempt:${id}`;
  const candidates = [attempts.get(key)];
  for (const name of ['localStorage', 'sessionStorage']) {
    try {
      candidates.push(JSON.parse(globalThis[name].getItem(key) || 'null'));
    } catch {
      continue;
    }
  }
  let attempt = candidates.find(
    (candidate) => candidate?.fingerprint === fingerprint,
  );
  if (attempt?.fingerprint !== fingerprint) {
    attempt = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : guestId().replace(
            /^(........)(....)(....)(....)(............)$/,
            '$1-$2-$3-$4-$5',
          ),
      token: hex(crypto.getRandomValues(new Uint8Array(32))),
      fingerprint,
    };
    attempts.set(key, attempt);
    try {
      localStorage.setItem(key, JSON.stringify(attempt));
    } catch {
      try {
        sessionStorage.setItem(key, JSON.stringify(attempt));
      } catch {
        return attempt;
      }
    }
  }
  return attempt;
}

async function request(path, { token, ...options } = {}) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 30000);
  try {
    return await apiRequest(path, {
      ...options,
      credentials: 'omit',
      signal: controller.signal,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } catch (error) {
    if (error.name === 'AbortError')
      throw new Error(
        'Pengiriman belum mendapat respons. Klik kirim lagi untuk melanjutkan kiriman yang sama.',
        { cause: error },
      );
    throw error;
  } finally {
    window.clearTimeout(timer);
  }
}

async function prepare(form, guestList, contact, onProgress) {
  const messageError = guestMessageError(guestList.messageTemplate);
  if (messageError) throw new Error(messageError);
  if (!form.title.trim() || !form.data.events?.length)
    throw new Error('Lengkapi judul undangan dan minimal satu jadwal acara.');
  const preview = localPreview(form);
  const images = new Map();
  const dataUrls = new Map();
  let total = 0;
  async function walk(value) {
    if (typeof value === 'string' && value.startsWith('data:')) {
      if (!/^data:image\/(jpeg|png|webp);base64,/i.test(value))
        throw new Error('Gambar lokal harus berupa JPG, PNG, atau WebP.');
      if (dataUrls.has(value)) return dataUrls.get(value);
      if (value.length > 7 * 1024 * 1024)
        throw new Error(
          'Ada gambar lokal yang terlalu besar. Pilih ulang gambar tersebut.',
        );
      const blob = await (await fetch(value)).blob();
      const hash = await digest(await blob.arrayBuffer());
      const marker = `customer-image:${hash}`;
      dataUrls.set(value, marker);
      if (!images.has(hash)) {
        total += blob.size;
        images.set(hash, { hash, blob, mime: blob.type, size: blob.size });
        if (images.size > 80 || total > 40 * 1024 * 1024)
          throw new Error('Maksimal 80 gambar dengan total 40 MB per kiriman.');
        onProgress(`Menyiapkan ${images.size} gambar…`);
      }
      return marker;
    }
    if (Array.isArray(value)) {
      const result = [];
      for (const item of value) result.push(await walk(item));
      return result;
    }
    if (value && typeof value === 'object') {
      const result = {};
      for (const [key, item] of Object.entries(value))
        result[key] = await walk(item);
      return result;
    }
    return value;
  }
  const payload = {
    contact: {
      name: contact.name.trim(),
      phone: contact.phone.trim(),
      note: contact.note.trim(),
    },
    form: {
      templateId: form.templateId,
      title: form.title,
      eventDate: preview.eventDate,
      data: await walk(preview.data),
    },
    guestList: {
      guests: guestList.guests,
      messageTemplate: guestList.messageTemplate,
      invitationUrl: guestList.invitationUrl || '',
    },
    assets: Array.from(images.values(), ({ hash, size, mime }) => ({
      hash,
      size,
      mime,
    })),
  };
  const encoded = new TextEncoder().encode(JSON.stringify(payload));
  if (encoded.byteLength > 4 * 1024 * 1024 - 512)
    throw new Error(
      'Data undangan terlalu besar. Kurangi isi catatan atau jumlah tamu sebelum mengirim.',
    );
  return { payload, images, fingerprint: await digest(encoded) };
}

export async function sendCustomerSubmission(
  form,
  guestList,
  contact,
  onProgress,
) {
  onProgress('Menyiapkan undangan dan daftar tamu…');
  const { payload, images, fingerprint } = await prepare(
    form,
    guestList,
    contact,
    onProgress,
  );
  const attempt = storedAttempt(form.templateId, fingerprint);
  const path = `/customer-submissions/${attempt.id}`;
  let receipt;
  try {
    receipt = (await request(path, { token: attempt.token })).data;
  } catch (error) {
    if (![404, 410].includes(error.status)) throw error;
  }
  if (!receipt) {
    receipt = (
      await request('/customer-submissions', {
        method: 'POST',
        body: { ...payload, id: attempt.id, token: attempt.token },
      })
    ).data;
  }
  if (receipt.status !== 'uploading') return receipt;
  const uploaded = new Set(receipt.uploaded || []);
  let completed = 0;
  for (const asset of images.values()) {
    completed += 1;
    onProgress(`Mengirim gambar ${completed} dari ${images.size}…`);
    if (uploaded.has(asset.hash)) continue;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(
        `${API_BASE_URL}${path}/images/${asset.hash}`,
        {
          method: 'POST',
          credentials: 'omit',
          signal: controller.signal,
          headers: {
            'Content-Type': asset.mime,
            Authorization: `Bearer ${attempt.token}`,
          },
          body: asset.blob,
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || 'Gambar belum terkirim.');
    } catch (error) {
      if (error.name === 'AbortError')
        throw new Error(
          'Unggah gambar belum selesai. Klik kirim lagi untuk melanjutkan.',
          { cause: error },
        );
      throw error;
    } finally {
      window.clearTimeout(timer);
    }
  }
  onProgress('Menyelesaikan kiriman ke admin…');
  return (
    await request(`${path}/complete`, { method: 'POST', token: attempt.token })
  ).data;
}
