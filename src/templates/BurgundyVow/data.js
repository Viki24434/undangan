import { elegantWeddingData } from '../weddingData';

export const data = {
  ...elegantWeddingData,
  image:
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=85',
  date: 'Sabtu, 20 November 2027',
  targetDate: '2027-11-20T09:00:00+07:00',
  groom: { ...elegantWeddingData.groom, name: 'Rendra' },
  bride: { ...elegantWeddingData.bride, name: 'Amara' },
  stories: [
    {
      date: '2023',
      title: 'Pertemuan yang mengubah arah',
      description:
        'Dari perkenalan sederhana, kami menemukan teman berbagi cerita dan mimpi.',
    },
    {
      date: '2025',
      title: 'Tumbuh dalam satu perjalanan',
      description:
        'Kami belajar untuk saling menguatkan, menghargai, dan memilih satu sama lain.',
    },
    {
      date: '2027',
      title: 'Janji untuk selamanya',
      description:
        'Dengan restu keluarga, kami siap memulai babak baru bersama.',
    },
  ],
  events: [
    {
      title: 'Akad Nikah',
      date: 'Sabtu, 20 November 2027',
      time: '09.00–10.30 WIB',
      venue: 'The Hermitage Jakarta',
      address: 'Menteng, Jakarta Pusat',
    },
    {
      title: 'Resepsi',
      date: 'Sabtu, 20 November 2027',
      time: '11.00–14.00 WIB',
      venue: 'The Hermitage Jakarta',
      address: 'Menteng, Jakarta Pusat',
    },
  ],
  photos: [
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=85',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=700&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
  ],
  banks: [
    { name: 'BCA', rek: '1234567890', owner: 'Rendra Pratama' },
    { name: 'Mandiri', rek: '0987654321', owner: 'Amara Putri' },
  ],
};
