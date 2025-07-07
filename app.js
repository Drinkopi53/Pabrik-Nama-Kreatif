// File JavaScript untuk aplikasi Pabrik Nama Kreatif

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM telah sepenuhnya dimuat dan di-parse');

    const categorySelect = document.getElementById('category-select');
    const keywordInput = document.getElementById('keyword-input');
    const generateBtn = document.getElementById('generate-btn');
    const resultsContainer = document.getElementById('results-container');

    if (!categorySelect || !keywordInput || !generateBtn || !resultsContainer) {
        console.error('Satu atau lebih elemen HTML tidak ditemukan. Pastikan ID elemen sudah benar.');
        resultsContainer.textContent = 'Error: Elemen halaman tidak dapat dimuat. Coba refresh halaman.';
        resultsContainer.style.color = 'red';
        return;
    }

    generateBtn.addEventListener('click', () => {
        const kategori = categorySelect.value;
        const kataKunci = keywordInput.value.trim();

        // Reset pesan error/hasil sebelumnya
        resultsContainer.textContent = '';
        resultsContainer.style.color = 'inherit'; // Kembalikan ke warna default (dari Tailwind)

        // Validasi sederhana: pastikan kata kunci tidak kosong
        if (!kataKunci) {
            resultsContainer.textContent = "Mohon masukkan kata kunci untuk menghasilkan nama.";
            resultsContainer.style.color = 'rgb(239 68 68)'; // Warna merah dari Tailwind (red-500), sesuaikan jika perlu
            keywordInput.focus();
            return;
        }

        // Buat prompt dinamis untuk Gemini
        // Mengambil teks dari opsi yang dipilih untuk Kategori, bukan hanya value-nya
        const kategoriTeks = categorySelect.options[categorySelect.selectedIndex].text;
        const promptUntukGemini = `Berikan 10 pilihan nama yang modern dan unik untuk ${kategoriTeks} yang berhubungan dengan '${kataKunci}'.`;

        // Tampilkan prompt yang sudah diformat di dalam results-container
        resultsContainer.textContent = promptUntukGemini;
        console.log('Prompt yang dihasilkan:', promptUntukGemini);
    });
});
