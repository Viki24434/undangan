export const invitationPackages = [
  {
    id: 'silver',
    name: 'Silver',
    symbol: '◇',
    available: true,
    description: 'Undangan hangat untuk perayaan keluarga dan hari istimewa.',
    features: [
      'Template khitanan, ulang tahun, dan aqiqah',
      'Musik, galeri, dan jadwal acara',
      'RSVP dan ucapan tamu',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    symbol: '✧',
    available: true,
    description: 'Detail elegan untuk merayakan kisah dan momen pernikahan.',
    features: [
      'Koleksi pernikahan modern dan adat',
      'Profil mempelai dan perjalanan cerita',
      'Musik, galeri, RSVP, dan hadiah digital',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    symbol: '✦',
    available: false,
    description:
      'Direncanakan untuk pernikahan dengan pengalaman yang lebih kaya.',
    features: [
      'Animasi pernikahan lebih beragam',
      'Fitur tambahan akan dikembangkan',
      'Detail koleksi akan diumumkan',
    ],
  },
  {
    id: 'exclusive',
    name: 'Exclusive',
    symbol: '❖',
    available: false,
    description: 'Paket khusus berikutnya untuk momen yang istimewa.',
    features: [
      'Konsep dan fitur sedang disiapkan',
      'Detail paket akan diumumkan',
    ],
  },
];

export function packageName(id) {
  return invitationPackages.find((item) => item.id === id)?.name || 'Silver';
}
