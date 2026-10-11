import { elegantWeddingData } from '../weddingData';

export const data = {
  ...elegantWeddingData,
  image:
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
  date: 'Sabtu, 12 Juni 2027',
  targetDate: '2027-06-12T09:00:00+07:00',
  groom: { ...elegantWeddingData.groom, name: 'Rafi' },
  bride: { ...elegantWeddingData.bride, name: 'Nadine' },
  stories: [
    {
      date: '2023',
      title: 'Sapa yang menjadi cerita',
      description:
        'Sebuah pertemuan sederhana membuka ruang untuk mengenal, berbagi, dan tumbuh bersama.',
    },
    {
      date: '2025',
      title: 'Mimpi yang searah',
      description:
        'Kami belajar merayakan hal-hal kecil dan saling mendukung setiap langkah.',
    },
    {
      date: '2027',
      title: 'Hari untuk selamanya',
      description:
        'Dengan restu keluarga, kami bersiap mengikat janji dan memulai babak baru.',
    },
  ],
  events: [
    {
      title: 'Akad Nikah',
      date: 'Sabtu, 12 Juni 2027',
      time: '09.00–10.30 WIB',
      venue: 'Taman Kajoe',
      address: 'Cilandak Timur, Jakarta Selatan',
    },
    {
      title: 'Resepsi',
      date: 'Sabtu, 12 Juni 2027',
      time: '11.00–14.00 WIB',
      venue: 'Taman Kajoe',
      address: 'Cilandak Timur, Jakarta Selatan',
    },
  ],
  photos: [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
  ],
  banks: [],
};
