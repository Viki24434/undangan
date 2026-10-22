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

export function invitationGuestUrl(slug, name) {
  const url = new URL(`/u/${encodeURIComponent(slug)}`, window.location.origin);
  url.searchParams.set('to', name);
  return url.href;
}

export function guestWhatsAppUrl(guest, invitation) {
  let phone = guest.phone.replace(/\D/g, '');
  if (phone.startsWith('0')) phone = `62${phone.slice(1)}`;
  if (!/^\d{8,15}$/.test(phone)) return '';
  const link = invitationGuestUrl(invitation.slug, guest.name);
  const message = `Yth. ${guest.name},\n\nDengan senang hati kami mengundang Anda dalam acara ${invitation.title}.\n\nSilakan buka undangan berikut:\n${link}\n\nTerima kasih.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
