export const GUEST_MESSAGE_LIMIT = 6000;

export const DEFAULT_GUEST_MESSAGE = [
  'Kepada Yth.',
  'Bapak/Ibu/Saudara/i',
  '*{nama_tamu}*',
  '',
  'Salam sejahtera,',
  '',
  'Dengan penuh rasa syukur dan bahagia, kami mengundang ' +
    'Bapak/Ibu/Saudara/i untuk hadir dan berbagi kebahagiaan ' +
    'dalam momen istimewa kami.',
  '',
  '*{judul_undangan}*',
  '',
  'Detail acara, lokasi, dan konfirmasi kehadiran dapat diakses ' +
    'melalui undangan berikut:',
  '{link_undangan}',
  '',
  'Kehadiran serta doa baik Bapak/Ibu/Saudara/i akan menjadi ' +
    'kebahagiaan yang melengkapi hari istimewa kami.',
  '',
  'Terima kasih atas perhatian dan kesediaan Bapak/Ibu/Saudara/i ' +
    'untuk menjadi bagian dari cerita bahagia kami.',
  '',
  'Salam hormat,',
  '*{judul_undangan}*',
].join('\n');

export const GUEST_MESSAGE_PRESETS = [
  { label: 'Gunakan contoh netral', template: DEFAULT_GUEST_MESSAGE },
  {
    label: 'Gunakan contoh Islami',
    template: DEFAULT_GUEST_MESSAGE.replace(
      'Salam sejahtera,',
      'Assalamu’alaikum Warahmatullahi Wabarakatuh',
    ).replace(
      '\n\nSalam hormat,',
      '\n\nWassalamu’alaikum Warahmatullahi Wabarakatuh\n\nSalam hormat,',
    ),
  },
];

export const GUEST_MESSAGE_TAGS = [
  { tag: '{nama_tamu}', label: 'Nama tamu' },
  { tag: '{judul_undangan}', label: 'Judul undangan' },
  { tag: '{link_undangan}', label: 'Link pribadi' },
];

export function guestMessageError(template) {
  if (typeof template !== 'string' || !template.trim())
    return 'Pesan WhatsApp wajib diisi.';
  if (template.trim().length > GUEST_MESSAGE_LIMIT)
    return 'Pesan WhatsApp maksimal 6.000 karakter.';
  if (!template.includes('{link_undangan}'))
    return 'Tambahkan tag {link_undangan} agar pesan menyertakan link pribadi.';
  return '';
}

export function renderGuestMessage(template, { name, title, link }) {
  const values = {
    nama_tamu: name,
    judul_undangan: title,
    link_undangan: link,
  };
  return template.replace(
    /\{(nama_tamu|judul_undangan|link_undangan)\}/g,
    (_, key) => values[key],
  );
}
