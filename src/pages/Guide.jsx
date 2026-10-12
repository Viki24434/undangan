import { Link } from 'react-router-dom';
import Arrow from '../components/HomeLanding/Arrow';
import LandingFooter from '../components/HomeLanding/LandingFooter';
import Navbar from '../components/Navbar/Navbar';
import './Home.css';
import './Guide.css';

const steps = [
  {
    number: '01',
    title: 'Pilih suasana',
    description:
      'Jelajahi koleksi dan pilih desain yang paling dekat dengan karakter acara.',
    action: 'Lihat katalog',
    to: '/katalog',
  },
  {
    number: '02',
    title: 'Buka demo',
    description:
      'Coba tombol buka undangan, gulir setiap bagian, dan lihat tampilannya di ponsel.',
    action: 'Coba Elegant Wedding',
    to: '/t/elegant-gold-01',
  },
  {
    number: '03',
    title: 'Siapkan detail',
    description:
      'Catat informasi acara, foto pilihan, dan cerita yang ingin disampaikan kepada tamu.',
    action: 'Kembali ke koleksi',
    to: '/katalog',
  },
];

const checklist = [
  ['Informasi utama', 'Nama, tanggal, waktu, serta alamat acara yang tepat.'],
  ['Foto pilihan', 'Foto sampul dan beberapa foto untuk galeri.'],
  ['Cerita & keluarga', 'Nama orang tua dan kisah singkat yang ingin dibagikan.'],
  ['Informasi tambahan', 'Susunan acara, tautan lokasi, hadiah, atau catatan khusus.'],
];

const questions = [
  [
    'Apakah demo bisa langsung diedit?',
    'Belum. Demo saat ini digunakan untuk menjelajahi tampilan dan fitur. Perubahan di formulir demo tidak disimpan.',
  ],
  [
    'Bagaimana cara memilih template yang cocok?',
    'Pilih berdasarkan suasana acara dan warna yang kamu suka. Buka demonya untuk melihat cover, isi undangan, galeri, dan tampilannya di ponsel.',
  ],
  [
    'Apa saja informasi yang sebaiknya disiapkan?',
    'Siapkan nama, tanggal, waktu, lokasi, foto, informasi keluarga, dan detail lain yang perlu diketahui tamu.',
  ],
  [
    'Apakah katalog sudah memiliki halaman pemesanan?',
    'Saat ini situs menyediakan katalog dan demo template. Pemesanan serta editor mandiri untuk pelanggan belum tersedia.',
  ],
];

export default function Guide() {
  return (
    <div className="invite-home guide-page" id="beranda">
      <a className="invite-skip" href="#konten">
        Lewati ke konten
      </a>
      <Navbar />
      <main id="konten">
        <section className="guide-hero">
          <div className="guide-breadcrumb">
            <Link to="/">Beranda</Link>
            <span aria-hidden="true">/</span>
            <span>Panduan</span>
          </div>
          <div className="guide-hero-copy">
            <span className="invite-eyebrow">PANDUAN CIPTAIN</span>
            <h1>
              Dari inspirasi
              <br />
              menuju <em>hari istimewa.</em>
            </h1>
            <p>
              Kenali alur memilih desain dan siapkan detail undanganmu dengan
              tenang. Mulai dari melihat demo, lalu kumpulkan hal-hal penting
              untuk dibagikan kepada tamu.
            </p>
            <div className="guide-actions">
              <Link className="invite-button" to="/katalog">
                Jelajahi template <Arrow />
              </Link>
              <Link className="invite-text-link" to="/t/elegant-gold-01">
                Lihat contoh <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className="guide-hero-note" aria-label="Tiga langkah sederhana">
            <span>01</span>
            <i aria-hidden="true" />
            <span>02</span>
            <i aria-hidden="true" />
            <span>03</span>
          </div>
        </section>

        <section className="guide-section guide-steps" aria-labelledby="guide-steps-title">
          <div className="guide-section-heading">
            <span className="invite-eyebrow">MULAI DARI SINI</span>
            <h2 id="guide-steps-title">
              Tiga langkah
              <br />
              <em>yang sederhana.</em>
            </h2>
            <p>Ikuti alur ini untuk menemukan desain yang pas.</p>
          </div>
          <ol className="guide-step-list">
            {steps.map((step) => (
              <li key={step.number}>
                <span className="guide-step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <Link to={step.to}>
                    {step.action} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="guide-checklist-section" aria-labelledby="guide-checklist-title">
          <div className="guide-checklist-intro">
            <span className="invite-eyebrow">CATATAN KECIL</span>
            <h2 id="guide-checklist-title">
              Siapkan cerita
              <br />
              <em>sebelum dibagikan.</em>
            </h2>
            <p>
              Daftar ini membantu memastikan informasi penting tidak
              terlewatkan saat menyusun undangan.
            </p>
          </div>
          <ul className="guide-checklist">
            {checklist.map(([title, description]) => (
              <li key={title}>
                <span aria-hidden="true">✓</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="guide-faq-section" aria-labelledby="guide-faq-title">
          <div>
            <span className="invite-eyebrow">PERTANYAAN UMUM</span>
            <h2 id="guide-faq-title">
              Sebelum
              <br />
              <em>memulai.</em>
            </h2>
            <p>Jawaban singkat untuk membantu menjelajahi Ciptain.</p>
          </div>
          <div className="guide-faq-list">
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="guide-cta">
          <span className="invite-eyebrow">LANGKAH BERIKUTNYA</span>
          <h2>
            Temukan desain
            <br />
            <em>yang terasa seperti kamu.</em>
          </h2>
          <p>Lihat koleksi tema dan buka demo untuk mengenali setiap detailnya.</p>
          <Link className="invite-button" to="/katalog">
            Buka katalog <Arrow />
          </Link>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
