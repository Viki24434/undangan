import { elegantWeddingData } from '../weddingData';

export const data = {
  ...elegantWeddingData,
  ...{
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85',
    date: 'Minggu, 20 Juni 2027',
    targetDate: '2027-06-20T09:00:00+07:00',
    events: [
      {
        title: 'Akad Nikah',
        date: 'Minggu, 20 Juni 2027',
        time: '09.00–10.00 WIB',
        venue: 'The Langham Jakarta',
        address: 'SCBD, Jakarta Selatan',
      },
      {
        title: 'Resepsi',
        date: 'Minggu, 20 Juni 2027',
        time: '11.00–14.00 WIB',
        venue: 'The Langham Jakarta',
        address: 'SCBD, Jakarta Selatan',
      },
    ],
  },
  groom: { ...elegantWeddingData.groom, name: 'Kevin' },
  bride: { ...elegantWeddingData.bride, name: 'Clara' },
  banks: [],
  stories: [
    {
      date: '2024',
      title: 'Ketika cerita dimulai',
      description:
        'Pertemuan sederhana membawa kami pada percakapan dan banyak perjalanan baru.',
    },
    {
      date: '2025',
      title: 'Saling menemukan rumah',
      description:
        'Kami memilih saling mendukung, berbagi mimpi, dan merawat cinta dalam keseharian.',
    },
    {
      date: '2026',
      title: 'Satu langkah bersama',
      description:
        'Dengan restu keluarga, kami bersiap memulai perjalanan menuju hari bahagia.',
    },
  ],
};
