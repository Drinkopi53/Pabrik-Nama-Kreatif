// File JavaScript untuk aplikasi Pabrik Nama Kreatif

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM telah sepenuhnya dimuat dan di-parse');

    const generateBtn = document.getElementById('generate-btn');
    const categorySelect = document.getElementById('category-select');
    const keywordInput = document.getElementById('keyword-input');
    const resultsContainer = document.getElementById('results-container');

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const category = categorySelect.value;
            const keywords = keywordInput.value.trim();

            // Logika sementara untuk menghasilkan nama
            let generatedName = `Nama untuk "${keywords}" dalam kategori "${category}"`;

            if (!keywords) {
                generatedName = "Mohon masukkan kata kunci.";
                resultsContainer.style.color = 'red';
            } else {
                // Contoh logika sederhana:
                // Anda bisa mengganti ini dengan logika yang lebih kompleks
                if (category === 'startup-teknologi') {
                    generatedName = `${keywords}Tech`;
                } else if (category === 'nama-produk') {
                    generatedName = `Produk ${keywords} Premium`;
                } else if (category === 'karakter-game') {
                    generatedName = `Pahlawan ${keywords}`;
                } else if (category === 'nama-kucing') {
                    generatedName = `${keywords} si Meong`;
                } else {
                    generatedName = `Nama Kreatif: ${keywords} (${category})`;
                }
                resultsContainer.style.color = 'inherit'; // Kembalikan ke warna default
            }

            resultsContainer.textContent = generatedName;
        });
    } else {
        console.error('Tombol dengan ID "generate-btn" tidak ditemukan.');
    }
});
