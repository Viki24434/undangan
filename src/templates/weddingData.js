export const elegantWeddingData = {
  image:
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=85',
  date: 'Minggu, 24 Januari 2027',
  targetDate: '2027-01-24T09:00:00+07:00',
  groom: {
    name: 'Aditya',
    father: 'Budi Santoso',
    mother: 'Siti Aminah',
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80',
  },
  bride: {
    name: 'Sarah',
    father: 'Ahmad Wijaya',
    mother: 'Linda Kusuma',
    photo:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
  },
  stories: [
    {
      date: 'Desember 2024',
      title: 'Sebuah pertemuan',
      description:
        'Di sebuah kedai kopi kecil, percakapan sederhana menjadi awal cerita yang tidak pernah kami duga.',
    },
    {
      date: 'Januari 2025',
      title: 'Memilih bersama',
      description:
        'Dari banyak cerita dan perjalanan, kami belajar bahwa rumah bisa berupa seseorang.',
    },
    {
      date: 'Agustus 2026',
      title: 'Menuju selamanya',
      description:
        'Di hadapan keluarga, kami memantapkan langkah untuk tumbuh dan menua bersama.',
    },
  ],
  events: [
    {
      title: 'Akad Nikah',
      date: 'Minggu, 24 Januari 2027',
      time: '09.00–10.00 WIB',
      venue: 'The Langham Jakarta',
      address: 'SCBD, Kebayoran Baru, Jakarta Selatan',
    },
    {
      title: 'Resepsi',
      date: 'Minggu, 24 Januari 2027',
      time: '11.00–14.00 WIB',
      venue: 'The Langham Jakarta',
      address: 'SCBD, Kebayoran Baru, Jakarta Selatan',
    },
  ],
  photos: [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500&q=80',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
  ],
  banks: [
    { name: 'BCA', rek: '1234567890', owner: 'Aditya Pratama' },
    { name: 'Mandiri', rek: '0987654321', owner: 'Sarah Kirana' },
  ],
  wishes: [
    {
      name: 'Rina',
      message:
        'Semoga hari bahagia ini menjadi awal perjalanan yang penuh cinta.',
    },
    {
      name: 'Andi & Keluarga',
      message: 'Selamat menempuh hidup baru. Bahagia selalu!',
    },
  ],
};

export const botanicalWeddingData = {
  ...elegantWeddingData,
  image:
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1000&q=85',
  groom: { ...elegantWeddingData.groom, name: 'Raka' },
  bride: { ...elegantWeddingData.bride, name: 'Alya' },
  banks: [],
};
