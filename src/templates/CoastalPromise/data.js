import { elegantWeddingData } from '../weddingData';

export const data = {
  ...elegantWeddingData,
  image:
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
  date: 'Minggu, 25 Juli 2027',
  targetDate: '2027-07-25T09:00:00+07:00',
  groom: { ...elegantWeddingData.groom, name: 'Daffa' },
  bride: { ...elegantWeddingData.bride, name: 'Keisha' },
  stories: [
    {
      date: '2022',
      title: 'Berawal dari obrolan',
      description:
        'Sapaan singkat berkembang menjadi persahabatan yang terasa seperti rumah.',
    },
    {
      date: '2024',
      title: 'Berlayar bersama',
      description:
        'Kami menjalani banyak musim dengan tawa, cerita, dan saling percaya.',
    },
    {
      date: '2027',
      title: 'Satu arah, satu tujuan',
      description:
        'Kini kami melangkah bersama untuk membangun kisah seumur hidup.',
    },
  ],
  events: [
    {
      title: 'Akad Nikah',
      date: 'Minggu, 25 Juli 2027',
      time: '09.00–10.30 WIB',
      venue: 'Plataran Hutan Kota',
      address: 'Gelora, Tanah Abang, Jakarta Pusat',
    },
    {
      title: 'Resepsi',
      date: 'Minggu, 25 Juli 2027',
      time: '11.00–14.00 WIB',
      venue: 'Plataran Hutan Kota',
      address: 'Gelora, Tanah Abang, Jakarta Pusat',
    },
  ],
  photos: [
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=700&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=700&q=80',
  ],
  banks: [],
};
