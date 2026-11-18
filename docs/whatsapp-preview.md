# Preview tautan WhatsApp

Tautan `/u/<slug>` menyajikan metadata Open Graph pada HTML awal untuk undangan yang sudah terbit. Judul diambil dari judul undangan, deskripsi memuat jenis acara dan tanggal WIB, dan gambar memakai foto cover tersimpan. Parameter `to` tetap tersedia saat undangan dibuka, sedangkan URL canonical memakai alamat undangan tanpa nama penerima.

Di detail undangan admin, bagian Preview tautan WhatsApp menampilkan kartu dari versi yang sudah disimpan. Setelah undangan terbit, tombol bagikan membuka WhatsApp dengan tautan undangan.

## Konfigurasi backend

Isi `.env` pada `undangan-back` dengan domain publik frontend dan API, misalnya:

```dotenv
PUBLIC_SITE_URL=https://undangan.example.com
PUBLIC_API_URL=https://undangan.example.com/api
```

Jika `PUBLIC_API_URL` kosong, alamat API mengikuti `PUBLIC_SITE_URL` dengan tambahan `/api`. Nilai awal `PUBLIC_SITE_URL` mengikuti origin pertama yang dikonfigurasi jika variabel belum diisi. Untuk pengujian WhatsApp langsung, website dan gambar harus dapat diakses dari internet.

Foto unggahan lokal dibuatkan thumbnail JPEG 1200 × 630 melalui GD dan disimpan pada `storage/share-images`. URL gambar berubah mengikuti versi data tersimpan. Gambar dari URL luar tetap memakai URL tersebut. Thumbnail generik digunakan jika foto lokal tidak tersedia atau melebihi batas pemrosesan. File lokal maksimal 5 MB dan 12 megapiksel diproses untuk thumbnail. Endpoint gambar memeriksa status terbit setiap kali diakses. Metadata publik draf mengembalikan 404.

## Menjalankan aplikasi

Mode Vite dev dan preview mengambil metadata dari backend menggunakan tujuan proxy `/api`. Mode produksi Apache memakai `public/share.php` dan `public/.htaccess` yang otomatis disalin ke `dist` ketika build. Arahkan DocumentRoot frontend ke folder hasil build. Pastikan PHP dan mod_rewrite aktif, serta proxy `/api` tetap mengarah ke backend seperti konfigurasi deployment aplikasi.

Dalam susunan lokal `htdocs/undangan-app/dist` dan `htdocs/undangan-back`, lokasi backend ditemukan otomatis. Jika susunannya berbeda, atur environment Apache berikut sesuai lokasi server:

```apache
SetEnv UNDANGAN_BACKEND_PATH /lokasi/server/undangan-back
```

Pada Nginx atau hosting lain, arahkan permintaan `/u/<slug>` ke entry PHP `share.php` dan teruskan REQUEST_URI asli. Hosting frontend statis memerlukan route server yang menghasilkan HTML metadata, seperti middleware Vite atau entry PHP ini.

Lihat sumber HTML tanpa menjalankan JavaScript untuk memeriksa `og:title`, `og:description`, `og:image`, dan `og:url`. Uji kartu WhatsApp setelah domain publik terpasang. Tampilan kartu di admin merupakan simulasi berdasarkan metadata tersimpan.
