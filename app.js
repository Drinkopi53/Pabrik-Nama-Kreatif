// File JavaScript untuk aplikasi Pabrik Nama Kreatif

// PENTING: Ganti dengan API Key Anda yang sebenarnya
const API_KEY = 'AIzaSyDet_RXvk9Xb1W67qxe0aoIr_iCst2qOt0';
// PENTING: Sesuaikan dengan URL endpoint Gemini yang benar untuk model gemini-flash atau yang Anda gunakan
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM telah sepenuhnya dimuat dan di-parse');

    const categorySelect = document.getElementById('category-select');
    const keywordInput = document.getElementById('keyword-input');
    const generateBtn = document.getElementById('generate-btn');
    const resultsContainer = document.getElementById('results-container');

    if (!categorySelect || !keywordInput || !generateBtn || !resultsContainer) {
        console.error('Satu atau lebih elemen HTML tidak ditemukan. Pastikan ID elemen sudah benar.');
        if(resultsContainer) {
            resultsContainer.textContent = 'Error: Elemen halaman penting tidak dapat dimuat. Coba refresh halaman.';
            resultsContainer.style.color = 'rgb(239 68 68)'; // text-red-500
        }
        return;
    }

    function displayNames(apiResponseText) {
        resultsContainer.innerHTML = ''; // Hapus pesan "Sedang memproses..." atau hasil sebelumnya

        const ul = document.createElement('ul');
        ul.className = 'space-y-2'; // Styling Tailwind untuk jarak antar item daftar

        // Asumsi nama dipisahkan oleh baris baru, dan mungkin ada nomor di depannya.
        // Contoh: "1. Nama Satu\n2. Nama Dua\n- Nama Tiga"
        const namesArray = apiResponseText.split('\n').filter(name => name.trim() !== '');

        if (namesArray.length === 0) {
            resultsContainer.textContent = "Tidak ada nama yang berhasil dihasilkan. Coba lagi dengan kata kunci lain.";
            return;
        }

        namesArray.forEach(nameString => {
            const li = document.createElement('li');
            // Membersihkan nomor dan tanda hubung di awal string
            li.textContent = nameString.replace(/^\s*\d+\.\s*-\s*|\s*-\s*|\s*\d+\.\s*/, '').trim();
            li.className = 'p-3 bg-slate-600 rounded-md shadow text-slate-200'; // Styling Tailwind untuk item daftar
            ul.appendChild(li);
        });

        resultsContainer.appendChild(ul);
    }

    async function getGeminiSuggestions(prompt) {
        resultsContainer.innerHTML = '<p class="text-center text-slate-400">Sedang memproses...</p>'; // Tampilkan pesan loading
        generateBtn.disabled = true; // Nonaktifkan tombol selama pemrosesan

        // Simulasi respons API untuk pengembangan tanpa API key asli
        // HAPUS ATAU KOMENTARI BAGIAN INI SAAT MENGGUNAKAN API KEY ASLI
        if (API_KEY === 'MASUKKAN_API_KEY_ANDA_DI_SINI') {
            console.warn("Menggunakan data simulasi karena API_KEY belum diatur.");
            setTimeout(() => {
                const simulatedResponse = `
1. ${keywordInput.value.trim()} Inovasi
2. Solusi ${keywordInput.value.trim()} Cerdas
3. ${categorySelect.options[categorySelect.selectedIndex].text} ${keywordInput.value.trim()} Pro
4. Gema ${keywordInput.value.trim()}
5. ${keywordInput.value.trim()} Dinamis
6. Visi ${keywordInput.value.trim()}
7. ${keywordInput.value.trim()} Sentral
8. Kreasi ${keywordInput.value.trim()}
9. ${keywordInput.value.trim()} Puncak
10. Era ${keywordInput.value.trim()} Baru
                `;
                displayNames(simulatedResponse.trim());
                generateBtn.disabled = false; // Aktifkan kembali tombol
            }, 1500);
            return;
        }
        // AKHIR BAGIAN SIMULASI

        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error dari API Gemini:', errorData);
                throw new Error(`Gagal mendapatkan respons dari API: ${response.status} ${response.statusText}. Detail: ${errorData?.error?.message || 'Tidak ada detail tambahan.'}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates.length > 0 &&
                data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
                const generatedText = data.candidates[0].content.parts[0].text;
                displayNames(generatedText);
            } else {
                console.error('Format respons API tidak sesuai:', data);
                throw new Error("Format respons dari API tidak seperti yang diharapkan atau tidak ada konten yang dihasilkan.");
            }

        } catch (error) {
            console.error('Error saat memanggil Gemini API:', error);
            resultsContainer.textContent = `Terjadi kesalahan: ${error.message}`;
            resultsContainer.style.color = 'rgb(239 68 68)'; // text-red-500
        } finally {
            generateBtn.disabled = false; // Aktifkan kembali tombol setelah selesai atau error
        }
    }

    generateBtn.addEventListener('click', () => {
        const kataKunci = keywordInput.value.trim();

        resultsContainer.innerHTML = ''; // Reset hasil sebelumnya
        resultsContainer.style.color = 'inherit';

        if (!kataKunci) {
            resultsContainer.textContent = "Mohon masukkan kata kunci untuk menghasilkan nama.";
            resultsContainer.style.color = 'rgb(239 68 68)';
            keywordInput.focus();
            return;
        }

        if (API_KEY === 'MASUKKAN_API_KEY_ANDA_DI_SINI' && !confirm("API Key belum diatur. Apakah Anda ingin melanjutkan dengan data simulasi?")) {
            resultsContainer.textContent = "Operasi dibatalkan. Silakan atur API Key di file app.js.";
            return;
        }

        const kategoriTeks = categorySelect.options[categorySelect.selectedIndex].text;
        const promptUntukGemini = `Berikan 10 pilihan nama yang modern dan unik untuk ${kategoriTeks} yang berhubungan dengan '${kataKunci}'. Hasilnya berupa daftar nama saja, masing-masing di baris baru, tanpa penjelasan tambahan.`;

        console.log('Prompt yang dikirim ke Gemini:', promptUntukGemini);
        getGeminiSuggestions(promptUntukGemini);
    });
});
