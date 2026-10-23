import {
  DEFAULT_GUEST_MESSAGE,
  guestMessageError,
  renderGuestMessage,
} from './guestMessage';

export const GUEST_LIMIT = 5000;

export const guestNameKey = (name) =>
  name.trim().replace(/\s+/g, ' ').normalize('NFKC').toLowerCase();

export function guestId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join(
    '',
  );
}

export function cleanGuest(input) {
  const guest = {
    id: input.id || guestId(),
    name: input.name?.trim().replace(/\s+/g, ' ') || '',
    phone: input.phone?.trim() || '',
    group: input.group?.trim() || '',
    note: input.note?.trim() || '',
    sent: input.sent === true,
  };
  if (!guest.name || guest.name.length > 80)
    throw new Error('Nama tamu wajib diisi, maksimal 80 karakter.');
  if (guest.phone && !/^\+?[\d\s()-]{6,30}$/.test(guest.phone))
    throw new Error(
      'Nomor WhatsApp harus berupa 6–30 karakter angka, boleh diawali +.',
    );
  if (guest.group.length > 60)
    throw new Error('Kelompok maksimal 60 karakter.');
  if (guest.note.length > 200)
    throw new Error('Catatan maksimal 200 karakter.');
  return guest;
}

export function mergeGuests(current, incoming) {
  const names = new Set(current.map((guest) => guestNameKey(guest.name)));
  const additions = [];
  let duplicates = 0;
  for (const guest of incoming) {
    const key = guestNameKey(guest.name);
    if (names.has(key)) {
      duplicates += 1;
      continue;
    }
    names.add(key);
    additions.push(guest);
  }
  if (current.length + additions.length > GUEST_LIMIT)
    throw new Error(
      'Daftar tamu maksimal 5.000 nama. Kurangi isi file sebelum mengimpor.',
    );
  return {
    guests: [...current, ...additions],
    added: additions.length,
    duplicates,
  };
}

export function normalizeInvitationUrl(value) {
  const input = value.trim();
  if (!input) return '';
  if (!/^https?:\/\//i.test(input) && !/^\/(?!\/)/.test(input))
    throw new Error(
      'Gunakan link lengkap berawalan https:// atau alamat /u/nama-undangan.',
    );
  let url;
  try {
    url = new URL(input, window.location.origin);
  } catch {
    throw new Error('Link undangan belum valid. Periksa kembali alamatnya.');
  }
  if (
    !['https:', 'http:'].includes(url.protocol) ||
    url.username ||
    url.password
  )
    throw new Error(
      'Link undangan harus menggunakan HTTP atau HTTPS tanpa kredensial.',
    );
  if (/^\/(admin|edit|t)(\/|$)/.test(url.pathname))
    throw new Error(
      'Gunakan link undangan yang sudah terbit, bukan link editor atau demo.',
    );
  url.searchParams.delete('to');
  url.hash = '';
  return url.href;
}

export function invitationGuestUrl(slug, name, baseUrl) {
  if (!baseUrl && !slug) return '';
  const url = new URL(
    baseUrl || `/u/${encodeURIComponent(slug)}`,
    window.location.origin,
  );
  url.searchParams.set('to', name);
  return url.href;
}

export function guestWhatsAppUrl(
  guest,
  invitation,
  template = DEFAULT_GUEST_MESSAGE,
) {
  let phone = guest.phone.replace(/\D/g, '');
  if (phone.startsWith('0')) phone = `62${phone.slice(1)}`;
  if (!/^\d{8,15}$/.test(phone)) return '';
  if (guestMessageError(template)) return '';
  const link = invitationGuestUrl(invitation.slug, guest.name, invitation.url);
  if (!link) return '';
  const message = renderGuestMessage(template.trim(), {
    name: guest.name,
    title: invitation.title,
    link,
  });
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
