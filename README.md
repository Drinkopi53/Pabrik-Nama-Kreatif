# Pabrik Nama Kreatif

Pabrik Nama Kreatif adalah aplikasi web sederhana yang membantu pengguna menghasilkan ide-ide nama yang unik dan kreatif menggunakan kekuatan model AI generatif dari Google, Gemini. Pengguna dapat memilih kategori dan memasukkan kata kunci (opsional) untuk mendapatkan daftar saran nama.

Aplikasi ini dibangun sebagai satu file HTML tunggal yang mencakup semua markup, styling (menggunakan Tailwind CSS via CDN), dan logika JavaScript.

## Fitur Utama

-   **Antarmuka Pengguna Modern**: Desain bersih dan responsif menggunakan Tailwind CSS.
-   **Input Sederhana**: Pengguna memilih kategori dari dropdown dan dapat memasukkan kata kunci untuk menyaring hasil.
-   **Integrasi Gemini API**: Menggunakan model `gemini-1.5-flash-latest` (atau model lain yang kompatibel) untuk menghasilkan saran nama berdasarkan input pengguna.
-   **Prompt Dinamis**: JavaScript membuat prompt yang disesuaikan untuk Gemini API berdasarkan kategori dan kata kunci yang dipilih.
-   **Status Loading**: Menampilkan indikator loading visual saat permintaan ke API sedang diproses.
-   **Tampilan Hasil Interaktif**: Nama-nama yang dihasilkan ditampilkan sebagai daftar yang rapi. Setiap item daftar dapat disalin ke clipboard dengan sekali klik.
-   **Mode Simulasi**: Jika API key Gemini tidak dikonfigurasi, aplikasi dapat berjalan dalam mode simulasi untuk mendemonstrasikan fungsionalitas UI dengan data contoh.
-   **Kode Tunggal**: Seluruh aplikasi (HTML, CSS, JavaScript) terdapat dalam satu file `pabrik_nama_kreatif.html` untuk kemudahan penggunaan dan distribusi.

## Struktur File

-   `pabrik_nama_kreatif.html`: File HTML tunggal yang berisi seluruh kode aplikasi.
-   `README.md`: File ini, berisi dokumentasi proyek.

## Cara Menjalankan Aplikasi

1.  **Dapatkan API Key Gemini**:
    *   Kunjungi [Google AI Studio](https://aistudio.google.com/app/apikey) (atau portal relevan lainnya dari Google) untuk membuat API key Anda.
2.  **Konfigurasi API Key**:
    *   Buka file `pabrik_nama_kreatif.html` menggunakan editor teks.
    *   Cari baris berikut di dalam tag `<script>`:
        ```javascript
        const API_KEY = 'MASUKKAN_API_KEY_ANDA_DI_SINI';
        ```
    *   Ganti `'MASUKKAN_API_KEY_ANDA_DI_SINI'` dengan API key Gemini Anda yang sebenarnya.
    *   Anda mungkin juga perlu menyesuaikan `GEMINI_API_URL` jika menggunakan model atau versi API yang berbeda. Secara default, ini diatur untuk `gemini-1.5-flash-latest`.
3.  **Buka di Browser**:
    *   Simpan perubahan pada file `pabrik_nama_kreatif.html`.
    *   Buka file tersebut langsung di peramban web modern apa pun (misalnya, Chrome, Firefox, Edge, Safari).

## Penggunaan

1.  **Pilih Kategori**: Pilih kategori yang paling sesuai untuk nama yang ingin Anda hasilkan dari menu dropdown.
2.  **Masukkan Kata Kunci (Opsional)**: Masukkan satu atau beberapa kata kunci yang relevan untuk membantu AI menghasilkan nama yang lebih spesifik. Ini opsional tetapi sangat disarankan untuk hasil yang lebih baik.
3.  **Klik 'Hasilkan Nama!'**: Tekan tombol untuk mengirim permintaan.
4.  **Lihat Hasil**: Setelah beberapa saat (tergantung pada respons API), daftar saran nama akan muncul di area hasil.
    *   Klik pada nama mana pun dalam daftar untuk menyalinnya ke clipboard Anda.

## Teknologi yang Digunakan

-   **HTML5**: Untuk struktur dasar halaman web.
-   **Tailwind CSS**: Framework CSS utility-first untuk styling modern dan responsif, diimpor melalui CDN.
-   **JavaScript (ES6+)**: Untuk logika aplikasi, interaksi DOM, dan panggilan API.
-   **Google Gemini API**: Model AI generatif untuk menghasilkan konten nama.

## Detail Implementasi JavaScript

-   **Event Listener**: Mendengarkan klik pada tombol "Hasilkan Nama!".
-   **Pengambilan Input**: Mengambil nilai dari dropdown kategori dan input teks kata kunci.
-   **Status Loading**: Mengubah konten `results-container` untuk menampilkan animasi loader dan pesan status, serta menonaktifkan tombol selama pemrosesan.
-   **Pembuatan Prompt**: Membuat string prompt yang terstruktur untuk dikirim ke Gemini API, menggabungkan kategori dan kata kunci. Prompt telah dioptimalkan untuk meminta daftar nama yang bersih.
-   **Panggilan API (`fetch`)**: Fungsi `async getGeminiSuggestions` melakukan panggilan `POST` ke endpoint Gemini API menggunakan `fetch`.
-   **Parsing Respons**: Mengekstrak teks yang dihasilkan dari respons JSON API.
-   **Menampilkan Hasil**: Fungsi `displayNames` membuat elemen `<ul>` dan `<li>` secara dinamis untuk menampilkan setiap nama yang disarankan. Setiap `<li>` memiliki event listener untuk fungsionalitas salin-ke-clipboard.
-   **Penanganan Error**: Blok `try...catch` dan pemeriksaan status respons API digunakan untuk menangani potensi kesalahan selama panggilan API atau pemrosesan data.
-   **Mode Simulasi**: Jika `API_KEY` tidak diubah dari placeholder, sebuah dialog `confirm()` akan muncul, menawarkan untuk menjalankan dengan data simulasi. Ini berguna untuk pengembangan dan demonstrasi UI tanpa memerlukan API key aktif.

## Potensi Pengembangan Lebih Lanjut

-   **Validasi Input yang Lebih Baik**: Menambahkan validasi yang lebih ketat untuk input kata kunci.
-   **Opsi Konfigurasi Lanjutan untuk Gemini**: Memungkinkan pengguna untuk menyesuaikan parameter seperti `temperature`, `topK`, `topP` untuk hasil yang lebih bervariasi.
-   **Penyimpanan Lokal**: Menyimpan riwayat nama yang dihasilkan atau preferensi pengguna.
-   **Tema Gelap/Terang**: Tombol untuk beralih antara tema visual.
-   **Internasionalisasi (i18n)**: Mendukung berbagai bahasa untuk antarmuka dan mungkin juga untuk prompt ke AI.
-   **Animasi yang Lebih Halus**: Menggunakan pustaka animasi atau transisi CSS yang lebih canggih.
-   **Pemisahan Kode**: Untuk proyek yang lebih besar, memisahkan JavaScript dan CSS ke dalam file terpisah jika aplikasi ini dikembangkan lebih jauh dari sekadar file HTML tunggal.

---

Dokumentasi ini bertujuan untuk memberikan gambaran umum tentang aplikasi Pabrik Nama Kreatif, cara menjalankannya, dan detail teknis implementasinya.
