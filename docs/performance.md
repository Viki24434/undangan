# Optimasi aset dan runtime

Ornamen bawaan tetap berupa PNG dengan nama, lokasi, dimensi, dan piksel yang sama. Kompresi ulang hanya mengubah penyimpanan file. Pada optimasi November 2026, 383 PNG berubah dari 219.980.467 menjadi 164.935.889 byte, menghemat 55.044.578 byte (25%). Seluruh hasil diperiksa dengan membandingkan RGBA hasil decode sebelum ditulis.

Setelah menambah aset baru, jalankan:

```sh
npm run optimize:assets
```

Untuk menyimpan salinan sumber di luar proyek:

```sh
npm run optimize:assets -- --backup-dir C:/backup/undangan-artwork
```

Gunakan direktori cadangan baru agar salinan lama tidak tertimpa. Skrip hanya memproses PNG di `public/assets/png`, melewati symbolic link, dan mengganti file jika lebih kecil setidaknya 5% serta seluruh piksel dan dimensinya identik. Sharp merupakan dependensi pengembangan dan tidak dikirim ke browser. Kompresi tidak dijalankan otomatis pada setiap build.

Slideshow hero hanya memasang timer saat terlihat, tab aktif, dan reduced motion tidak dipilih. Animasi CSS undangan berhenti ketika tab disembunyikan. ScrollReveal berbagi satu IntersectionObserver dan melepas pengamatan setelah elemen tampil. Pemrosesan pseudo-element latar di runtime hanya aktif pada editor atau undangan dengan pengaturan ornamen native; warna dan tipografi per bagian tetap diterapkan tanpa pemrosesan latar tersebut.

Pemuatan awal gambar tetap menunggu decode sebelum cover dibuka. Timer keluar cover dikelola setelah render berhasil agar tetap selesai ketika ada pemuatan komponen atau reduced motion. Backup tema tidak diubah formatnya, dan referensi aset lama tetap memakai URL yang sama.
