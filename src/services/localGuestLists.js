import { cleanGuest, GUEST_LIMIT, guestNameKey } from './guestList';
import { DEFAULT_GUEST_MESSAGE, GUEST_MESSAGE_LIMIT } from './guestMessage';

const prefix = 'ciptain:consumer-guests:v1:';

export function createLocalGuestList() {
  return {
    guests: [],
    messageTemplate: DEFAULT_GUEST_MESSAGE,
    invitationUrl: '',
  };
}

export function readLocalGuestList(id, storage = globalThis.localStorage) {
  const raw = storage.getItem(prefix + id);
  if (!raw) return createLocalGuestList();
  const record = JSON.parse(raw);
  const data = record.data;
  if (
    record.version !== 1 ||
    record.templateId !== id ||
    !Array.isArray(data?.guests) ||
    data.guests.length > GUEST_LIMIT ||
    typeof data.messageTemplate !== 'string' ||
    data.messageTemplate.length > GUEST_MESSAGE_LIMIT ||
    typeof data.invitationUrl !== 'string' ||
    data.invitationUrl.length > 2000
  )
    throw new Error('Daftar tamu di perangkat ini tidak valid.');
  const names = new Set();
  const ids = new Set();
  const guests = data.guests.map((input) => {
    const guest = cleanGuest(input);
    const key = guestNameKey(guest.name);
    if (
      !/^[a-zA-Z0-9-]{1,36}$/.test(guest.id) ||
      ids.has(guest.id) ||
      names.has(key)
    )
      throw new Error(
        'Daftar tamu di perangkat ini memiliki nama atau ID duplikat.',
      );
    ids.add(guest.id);
    names.add(key);
    return guest;
  });
  return { ...data, guests };
}

export function writeLocalGuestList(
  id,
  data,
  storage = globalThis.localStorage,
) {
  const value = JSON.stringify({
    version: 1,
    templateId: id,
    savedAt: new Date().toISOString(),
    data,
  });
  if (new Blob([value]).size > 2097152)
    throw new Error(
      'Daftar tamu terlalu besar. Ekspor Excel sebagai cadangan dan persingkat catatan.',
    );
  storage.setItem(prefix + id, value);
}
