# 🎯 Belajar JavaScript: Event Handling

Repositori ini berisi proyek interaktif yang dibuat sebagai bahan ajar untuk siswa **Kelas XI (Tahun Ajaran 2026-2027)**.

Proyek ini mendemonstrasikan secara langsung (live demo) bagaimana JavaScript berinteraksi dengan halaman web melalui **Event Handling**. Alih-alih hanya membaca teori, siswa dapat mencoba memicu event dan melihat respons kodenya secara *real-time*.

## 🌐 Live Demo
Proyek ini dapat diakses dan dicoba langsung oleh siswa melalui tautan berikut:
👉 **[https://YudiWiputra.github.io/js-event-handling/](https://YudiWiputra.github.io/js-event-handling/)**

## 📚 Materi yang Dicakup
Proyek ini mencakup 10 jenis implementasi dan kategori event dalam JavaScript:

1. **Inline Event Handling** (`onclick`, `onmouseover`)
2. **Event Handler Properties** (`element.onclick`)
3. **addEventListener Method** (Mendemonstrasikan multiple listeners dan opsi `once`)
4. **Mouse Events** (`click`, `dblclick`, `mousemove`, `mousedown`, `mouseup`, `contextmenu`)
5. **Keyboard Events** (`keydown`, `keyup`, serta pengecekan *modifier keys* seperti Ctrl/Shift)
6. **Form Events** (`submit`, mencegah *default refresh*, `focus`, `blur`, `input`, `change`)
7. **Window Events** (`resize`, `scroll`, deteksi `online` & `offline`)
8. **Media Events** (Studi komparasi antara Native HTML5 `<audio>` vs **YouTube IFrame API**)
9. **Touch Events** (`touchstart`, `touchmove`, `touchend` untuk interaksi layar sentuh)
10. **Drag and Drop Events** 
    - *Drag & Drop Element:* Memindahkan elemen antar area (seperti papan Kanban).
    - *Drag & Drop File:* Menerima file gambar/teks dari komputer user dan menampilkannya menggunakan `FileReader`.

## ✨ Fitur Utama (Bahan Ajar)
* **Interaktif:** Siswa bereksplorasi dengan mengklik, mengetik, atau men-drag elemen, bukan sekadar melihat tampilan statis.
* **Live Log Tracker:** Tersedia *log box* bergaya terminal di setiap section yang mencatat event apa saja yang sedang terpicu (*triggered*) beserta nilai/koordinatnya.
* **Inline Code View:** Dilengkapi panel *Code Snippet* (Tab UI) di setiap sesi. Siswa bisa melihat persis kode JavaScript yang bekerja di balik fitur tersebut tanpa harus membuka file mentahannya.
* **Clean & Warm Dark Theme:** UI didesain modern agar pengalaman coding/belajar terasa lebih profesional.

## 📂 Struktur File
* `index.html` — Struktur kerangka utama halaman (UI, Drop Zone, Media Player, Panel Kode).
* `style.css` — Pengaturan gaya (tema gelap yang disesuaikan, animasi *ripple*, efek hover).
* `script.js` — Logika Event Handling utama (termasuk fungsi utilitas, manipulasi DOM, dan API YouTube).
* `README.md` — Dokumentasi pedoman proyek ini.

## 🚀 Cara Menjalankan di Komputer Lokal
Jika ingin menjalankan kode ini secara offline (tanpa koneksi internet, kecuali untuk video YouTube):
1. Download atau *clone* repositori ini.
2. Buka folder proyek hasil unduhan.
3. Klik ganda (double-click) pada file `index.html` untuk membukanya di browser apa saja.
4. *(Opsional)* Jika menggunakan Visual Studio Code, sangat disarankan menggunakan ekstensi **Live Server** agar perubahan kode bisa langsung terlihat.

---
*Dibuat untuk keperluan edukasi dan eksplorasi dasar interaktivitas web dengan Vanilla JavaScript.*
