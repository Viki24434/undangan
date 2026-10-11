import { elegantWeddingData } from '../weddingData';

export const data = {
  ...elegantWeddingData,
  image:
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
  date: 'Minggu, 5 Desember 2027',
  targetDate: '2027-12-05T09:00:00+07:00',
  groom: { ...elegantWeddingData.groom, name: 'Alvin' },
  bride: { ...elegantWeddingData.bride, name: 'Keira' },
  stories: [
    {
      date: '2023',
      title: 'Sapa pertama',
      description:
        'Sebuah perkenalan kecil menjadi cerita manis yang terus kami rawat.',
    },
    {
      date: '2025',
      title: 'Mimpi yang sama',
      description:
        'Hari demi hari mengajarkan kami arti tumbuh dan berjalan beriringan.',
    },
    {
      date: '2027',
      title: 'Selamanya dimulai',
      description:
        'Kami mengundang orang-orang terkasih untuk menjadi saksi janji kami.',
    },
  ],
  events: [
    {
      title: 'Akad Nikah',
      date: 'Minggu, 5 Desember 2027',
      time: '09.00–10.30 WIB',
      venue: 'The Langham Jakarta',
      address: 'SCBD, Jakarta Selatan',
    },
    {
      title: 'Resepsi',
      date: 'Minggu, 5 Desember 2027',
      time: '11.00–14.00 WIB',
      venue: 'The Langham Jakarta',
      address: 'SCBD, Jakarta Selatan',
    },
  ],
  photos: [
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
  ],
  banks: [
    { name: 'BCA', rek: '1234567890', owner: 'Alvin Mahendra' },
    { name: 'Mandiri', rek: '0987654321', owner: 'Keira Anindya' },
  ],
};
