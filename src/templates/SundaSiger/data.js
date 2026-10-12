import { elegantWeddingData } from '../weddingData';

export const data = {
  ...elegantWeddingData,
  image:
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
  date: 'Sabtu, 18 September 2027',
  targetDate: '2027-09-18T09:00:00+07:00',
  groom: {
    ...elegantWeddingData.groom,
    name: 'Raka',
    father: 'Dedi Suhendar',
    mother: 'Euis Rohayati',
  },
  bride: {
    ...elegantWeddingData.bride,
    name: 'Nadira',
    father: 'Asep Mulyana',
    mother: 'Tuti Herawati',
  },
  stories: [
    {
      date: '2023',
      title: 'Munggaran tepang',
      description:
        'Sebuah perkenalan sederhana mempertemukan dua keluarga dan menjadi awal cerita kami.',
    },
    {
      date: '2025',
      title: 'Ngawangun carita',
      description:
        'Dengan restu orang tua, kami belajar saling menjaga dan menumbuhkan kasih.',
    },
    {
      date: '2027',
      title: 'Ikrar suci',
      description:
        'Kini kami siap melangkah bersama dalam doa dan harapan baik keluarga.',
    },
  ],
  events: [
    {
      title: 'Akad Nikah',
      date: 'Sabtu, 18 September 2027',
      time: '09.00-10.30 WIB',
      venue: 'Gedung Puspa Sari',
      address: 'Jl. Ir. H. Juanda, Bandung, Jawa Barat',
    },
    {
      title: 'Resepsi',
      date: 'Sabtu, 18 September 2027',
      time: '11.00-14.00 WIB',
      venue: 'Gedung Puspa Sari',
      address: 'Jl. Ir. H. Juanda, Bandung, Jawa Barat',
    },
  ],
  photos: [
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
  ],
  banks: [],
  wishes: [],
};
