import { elegantWeddingData } from '../weddingData';

export const data = {
  ...elegantWeddingData,
  image:
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
  date: 'Minggu, 17 Oktober 2027',
  targetDate: '2027-10-17T09:00:00+07:00',
  groom: { ...elegantWeddingData.groom, name: 'Arga' },
  bride: { ...elegantWeddingData.bride, name: 'Nayla' },
  events: [
    {
      title: 'Akad Nikah',
      date: 'Minggu, 17 Oktober 2027',
      time: '09.00–10.00 WIB',
      venue: 'Taman Bunga Nusantara',
      address: 'Kawasan Wisata Kota Bunga, Cianjur',
    },
    {
      title: 'Resepsi',
      date: 'Minggu, 17 Oktober 2027',
      time: '11.00–14.00 WIB',
      venue: 'Taman Bunga Nusantara',
      address: 'Kawasan Wisata Kota Bunga, Cianjur',
    },
  ],
  stories: [
    {
      date: '2024',
      title: 'Bertemu di waktu yang tepat',
      description:
        'Percakapan sederhana menjadi awal kisah yang tumbuh dengan hangat.',
    },
    {
      date: '2025',
      title: 'Tumbuh dan saling menguatkan',
      description:
        'Kami belajar merawat mimpi dan kebahagiaan melalui langkah-langkah kecil.',
    },
    {
      date: '2026',
      title: 'Memilih selamanya',
      description:
        'Dengan doa keluarga, kami siap memulai perjalanan baru bersama.',
    },
  ],
  banks: [],
};
