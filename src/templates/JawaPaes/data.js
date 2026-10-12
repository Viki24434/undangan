import { elegantWeddingData } from '../weddingData';

export const data = {
  ...elegantWeddingData,
  image:
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
  date: 'Sabtu, 16 Oktober 2027',
  targetDate: '2027-10-16T09:00:00+07:00',
  groom: {
    ...elegantWeddingData.groom,
    name: 'Bagas',
    father: 'Sutrisno',
    mother: 'Sri Wahyuni',
  },
  bride: {
    ...elegantWeddingData.bride,
    name: 'Sekar',
    father: 'Haryanto',
    mother: 'Endang Lestari',
  },
  stories: [
    {
      date: '2023',
      title: 'Awal pinanggih',
      description:
        'Saking pitepangan prasaja, tuwuh sesambungan ingkang dipunrengga donga lan pangestu kulawarga.',
    },
    {
      date: '2025',
      title: 'Tuwuh sesarengan',
      description:
        'Saben lampah ngajari bilih tresna tuwuh nalika sami ngreksa lan nyengkuyung.',
    },
    {
      date: '2027',
      title: 'Miwiti lelampahan enggal',
      description:
        'Kanthi pangestu tiyang sepuh, kula kekalih siyap ngiket prasetya lan lumampah sesarengan.',
    },
  ],
  events: [
    {
      title: 'Akad Nikah',
      date: 'Sabtu, 16 Oktober 2027',
      time: '09.00-10.30 WIB',
      venue: 'Pendopo Amarta',
      address: 'Jl. Solo, Yogyakarta',
    },
    {
      title: 'Resepsi',
      date: 'Sabtu, 16 Oktober 2027',
      time: '11.00-14.00 WIB',
      venue: 'Pendopo Amarta',
      address: 'Jl. Solo, Yogyakarta',
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
