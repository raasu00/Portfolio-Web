# 🚀 Mini Web Portofolio

Sebuah website portofolio mini yang interaktif untuk mendokumentasikan dan menampilkan progres pengembangan web selama 3 bulan terakhir. Website ini tidak hanya menampilkan daftar proyek, tetapi juga memungkinkan penambahan dan pengelolaan proyek secara langsung di antarmuka, layaknya aplikasi **"Tabel Produk"** untuk mengelola karya.

## ✨ Fitur Utama

*   **Tampilan Galeri Proyek**: Menampilkan semua website yang telah dibuat dalam bentuk kartu (card) yang rapi dengan gambar thumbnail, judul, dan deskripsi singkat.
*   **CRUD Interaktif untuk Proyek**:
    *   **(C)reate / Tambah**: Form untuk menambahkan proyek baru (judul, deskripsi, link, gambar, kategori, tanggal).
    *   **(R)ead / Baca**: Menampilkan detail setiap proyek.
    *   **(U)pdate / Perbarui**: Mengedit informasi proyek yang sudah ada.
    *   **(D)elete / Hapus**: Menghapus proyek dari daftar.
*   **Filter dan Kategorisasi**: Memfilter proyek berdasarkan jenisnya (Contoh: *Website Statis*, *Aplikasi Web*, *Utility*, *Real-Time*).
*   **Desain Responsif**: Tampilan optimal untuk desktop, tablet, dan ponsel.

## 🎯 Tujuan Proyek

1.  **Dokumentasi Progres**: Menjadi "living document" yang menunjukkan perkembangan skill dari proyek ke proyek.
2.  **Demonstrasi Keterampilan**: Website ini sendiri merupakan bukti kemampuan dalam membangun aplikasi web interaktif dengan fungsi CRUD.
3.  **Tempat Berkumpul**: Menjadi satu halaman utama yang merangkum semua hasil kerja.

## 🗂️ Daftar Proyek (Contoh)

Proyek akan ditampilkan dengan filter berikut:

*   **Website Statis**
    *   `bibit-cabai.vercel.app` - Company profile untuk usaha bibit cabai.
*   **Aplikasi Web (CRUD)**
    *   `tabel-produk.vercel.app` - Dashboard untuk mengelola daftar produk dan harga.
*   **Aplikasi Web (Utility)**
    *   `vidytk.vercel.app` - Tool untuk mengunduh video dari berbagai platform.
*   **Aplikasi Web (Real-Time)**
    *   `chatting-lite.vercel.app` - Aplikasi chat sederhana secara real-time.

## 🛠️ Rencana Teknis

*   **Frontend**: React.js (konsisten dengan proyek `tabel-produk`).
*   **Styling**: Tailwind CSS atau CSS Modules untuk desain yang cepat dan responsif.
*   **State Management**: React Hooks (`useState`, `useEffect`) untuk mengelola state daftar proyek.
*   **Penyimpanan Data**: Awalnya menggunakan `localStorage` browser untuk penyimpanan sederhana. Dapat ditingkatkan ke backend/database di masa depan.
*   **Hosting**: Vercel (konsisten dengan proyek lainnya).

## 🚀 Cara Menjalankan (Setelah Kode Tersedia)

1.  Clone repositori ini.
2.  Jalankan `npm install` untuk menginstal dependensi.
3.  Jalankan `npm run dev` untuk memulai server pengembangan.
4.  Buka `http://localhost:3000` di browser.

## 📝 Catatan

Ini adalah proyek *meta* yang merefleksikan perjalanan belajar. Fungsionalitas utama adalah **CRUD untuk mengelola link-link proyek itu sendiri**, sekaligus menjadi bukti nyata kemampuan implementasi konsep tersebut.

## Struktur Folder

mini-portfolio/
├── 📄 index.html              # Halaman utama (UI + layout)
├── 📄 tambah-proyek.html      # Form modal (terpisah)
├── 📁 css/
│   └── 🎨 style.css          # Semua styling (terpisah)
├── 📁 js/
│   └── ⚡ app.js             # Semua JavaScript logic (terpisah)
└── 📁 data/                  # Data external (opsional)
    └── 📊 projects.json