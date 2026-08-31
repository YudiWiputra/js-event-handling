/* ============================================
   JavaScript - Event Handling Demo Project
   Demonstrasi Lengkap Event Handling di JS
   ============================================ */

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

/**
 * Menambahkan log entry ke log box tertentu
 */
function addLog(logBoxId, eventName, detail) {
  const logBox = document.getElementById(logBoxId);
  if (!logBox) return;

  const now = new Date();
  const time = now.toLocaleTimeString('id-ID');

  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.innerHTML = `
    <span class="log-time">[${time}]</span>
    <span class="log-event">${eventName}</span>
    <span class="log-detail"> — ${detail}</span>
  `;

  logBox.prepend(entry);

  // Batasi jumlah log
  while (logBox.children.length > 30) {
    logBox.removeChild(logBox.lastChild);
  }
}

/**
 * Menghapus semua log dari log box
 */
function clearLog(logBoxId) {
  const logBox = document.getElementById(logBoxId);
  if (logBox) {
    logBox.innerHTML = '<div class="log-entry"><span class="log-detail">Log dikosongkan...</span></div>';
  }
}

/**
 * Menampilkan toast notification
 */
function showToast(title, message) {
  const toast = document.getElementById('toast');
  toast.querySelector('.toast-title').textContent = title;
  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Fungsi untuk tab switcher pada code snippets
 */
function switchTab(clickedTab, panelId) {
  // Cari parent container
  const container = clickedTab.closest('.code-tab-container');

  // Deactivate semua tab dan panel di container ini
  container.querySelectorAll('.code-tab').forEach(tab => tab.classList.remove('active'));
  container.querySelectorAll('.code-panel').forEach(panel => panel.classList.remove('active'));

  // Activate tab yang diklik dan panel yang sesuai
  clickedTab.classList.add('active');
  document.getElementById(panelId).classList.add('active');
}

/**
 * Format ukuran file menjadi human-readable
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Mendapatkan icon emoji berdasarkan tipe file
 */
function getFileIcon(mimeType, fileName) {
  if (mimeType.startsWith('image/')) return '🖼️';
  if (mimeType.startsWith('video/')) return '🎬';
  if (mimeType.startsWith('audio/')) return '🎵';
  if (mimeType === 'application/pdf') return '📄';
  if (mimeType.includes('word') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) return '📝';
  if (mimeType.includes('sheet') || fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) return '📊';
  if (mimeType.includes('presentation') || fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) return '📽️';
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('compressed')) return '📦';
  if (mimeType.includes('javascript') || mimeType.includes('json') || mimeType.includes('html') || mimeType.includes('css')) return '💻';
  if (mimeType.startsWith('text/')) return '📃';
  return '📎';
}


// ==============================================
// 1. INLINE EVENT HANDLING
// Fungsi yang dipanggil dari atribut HTML onclick="..."
// ==============================================

function inlineClick() {
  addLog('log-inline', 'onclick', 'Tombol diklik via inline handler (atribut HTML)');
  showToast('Inline Event', 'onclick handler berhasil dijalankan!');
}

function inlineMouseOver(element) {
  element.style.boxShadow = '0 0 12px rgba(226, 114, 91, 0.3)';
  addLog('log-inline', 'onmouseover', 'Mouse masuk ke area inline handler');
}

function inlineMouseOut(element) {
  element.style.boxShadow = 'none';
  addLog('log-inline', 'onmouseout', 'Mouse keluar dari area inline handler');
}


// ==============================================
// 2. EVENT HANDLER PROPERTIES
// Menetapkan handler via properti DOM element
// ==============================================

document.addEventListener('DOMContentLoaded', function () {

  // --- Event Handler Properties ---
  const propBtn = document.getElementById('btn-property');
  const propArea = document.getElementById('property-area');

  // onclick property
  propBtn.onclick = function () {
    addLog('log-property', 'onclick', 'Tombol diklik via event handler property (element.onclick = ...)');
    showToast('Property Handler', 'onclick property berhasil!');
  };

  // onmouseover & onmouseout property
  propArea.onmouseover = function () {
    this.style.borderColor = '#5a9e6f';
    this.textContent = '✅ Mouse ada di dalam area!';
    addLog('log-property', 'onmouseover', 'Mouse masuk area via property handler');
  };

  propArea.onmouseout = function () {
    this.style.borderColor = '#4a4a52';
    this.textContent = 'Arahkan mouse ke sini (Property Handler)';
    addLog('log-property', 'onmouseout', 'Mouse keluar area via property handler');
  };


  // ==============================================
  // 3. addEventListener METHOD
  // ==============================================

  const addBtn = document.getElementById('btn-addevent');
  const addBtn2 = document.getElementById('btn-addevent2');

  // Bisa menambahkan BANYAK listener untuk satu event!
  addBtn.addEventListener('click', function () {
    addLog('log-addevent', 'click (Listener 1)', 'Handler pertama dari addEventListener');
  });

  addBtn.addEventListener('click', function () {
    addLog('log-addevent', 'click (Listener 2)', 'Handler kedua dari addEventListener — keduanya berjalan!');
  });

  // Contoh: once option — listener hanya jalan 1 kali
  addBtn2.addEventListener('click', function () {
    addLog('log-addevent', 'click (once)', 'Listener ini hanya berjalan SEKALI, lalu otomatis dihapus');
    showToast('Once Listener', 'Klik lagi — tidak akan ada efek!');
  }, { once: true });


  // ==============================================
  // 4. MOUSE EVENTS
  // ==============================================

  const mouseArea = document.getElementById('mouse-area');
  const mouseTracker = document.getElementById('mouse-tracker');
  const mouseCoords = document.getElementById('mouse-coords');

  // click
  mouseArea.addEventListener('click', function (e) {
    addLog('log-mouse', 'click', `Diklik pada posisi (${e.offsetX}, ${e.offsetY})`);
  });

  // dblclick
  mouseArea.addEventListener('dblclick', function (e) {
    addLog('log-mouse', 'dblclick', `Double-click pada posisi (${e.offsetX}, ${e.offsetY})`);

    // Buat efek visual ripple
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      left: ${e.offsetX}px;
      top: ${e.offsetY}px;
      width: 10px; height: 10px;
      background: rgba(226,114,91,0.4);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: rippleEffect 0.6s ease-out forwards;
      pointer-events: none;
    `;
    mouseArea.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });

  // Tambahkan keyframe animation untuk ripple
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes rippleEffect {
      to {
        width: 80px; height: 80px;
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  // mouseover
  mouseArea.addEventListener('mouseover', function () {
    mouseTracker.style.opacity = '1';
    addLog('log-mouse', 'mouseover', 'Mouse memasuki area tracking');
  });

  // mouseout
  mouseArea.addEventListener('mouseout', function () {
    mouseTracker.style.opacity = '0';
    mouseCoords.textContent = 'X: — , Y: —';
    addLog('log-mouse', 'mouseout', 'Mouse meninggalkan area tracking');
  });

  // mousedown & mouseup
  mouseArea.addEventListener('mousedown', function (e) {
    mouseArea.style.background = '#35353e';
    const buttons = ['Kiri', 'Tengah', 'Kanan'];
    addLog('log-mouse', 'mousedown', `Tombol ${buttons[e.button] || e.button} ditekan`);
  });

  mouseArea.addEventListener('mouseup', function (e) {
    mouseArea.style.background = '';
    const buttons = ['Kiri', 'Tengah', 'Kanan'];
    addLog('log-mouse', 'mouseup', `Tombol ${buttons[e.button] || e.button} dilepas`);
  });

  // mousemove — update posisi tracker
  mouseArea.addEventListener('mousemove', function (e) {
    mouseTracker.style.left = e.offsetX + 'px';
    mouseTracker.style.top = e.offsetY + 'px';
    mouseCoords.textContent = `X: ${e.offsetX} , Y: ${e.offsetY}`;
  });

  // contextmenu (klik kanan) — prevent default
  mouseArea.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    addLog('log-mouse', 'contextmenu', 'Klik kanan terdeteksi — default menu dicegah!');
  });


  // ==============================================
  // 5. KEYBOARD EVENTS
  // ==============================================

  const keyboardArea = document.getElementById('keyboard-area');
  const keyDisplay = document.getElementById('key-display');
  const keyCode = document.getElementById('key-code');
  const keyKey = document.getElementById('key-key');
  const keyType = document.getElementById('key-type');
  const keyModifiers = document.getElementById('key-modifiers');

  keyboardArea.addEventListener('keydown', function (e) {
    keyDisplay.textContent = e.key === ' ' ? 'Space' : e.key;
    keyDisplay.style.transform = 'scale(1.2)';
    keyDisplay.style.color = '#5a9e6f';

    keyCode.textContent = e.code;
    keyKey.textContent = e.key;
    keyType.textContent = 'keydown';

    const mods = [];
    if (e.ctrlKey) mods.push('Ctrl');
    if (e.shiftKey) mods.push('Shift');
    if (e.altKey) mods.push('Alt');
    if (e.metaKey) mods.push('Meta');
    keyModifiers.textContent = mods.length > 0 ? mods.join(' + ') : 'Tidak ada';

    addLog('log-keyboard', 'keydown', `Key: "${e.key}" | Code: ${e.code} | Modifiers: ${mods.join('+') || 'none'}`);
  });

  keyboardArea.addEventListener('keyup', function (e) {
    keyDisplay.style.transform = 'scale(1)';
    keyDisplay.style.color = '#ececef';
    keyType.textContent = 'keyup';

    addLog('log-keyboard', 'keyup', `Key "${e.key}" dilepas`);
  });

  keyboardArea.addEventListener('keypress', function (e) {
    addLog('log-keyboard', 'keypress', `Karakter: "${e.key}" (deprecated, gunakan keydown)`);
  });


  // ==============================================
  // 6. FORM EVENTS
  // ==============================================

  const demoForm = document.getElementById('demo-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const selectInput = document.getElementById('form-select');
  const textareaInput = document.getElementById('form-textarea');
  const checkboxInput = document.getElementById('form-checkbox');

  // submit
  demoForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Cegah halaman refresh
    addLog('log-form', 'submit', `Form disubmit! Nama: "${nameInput.value}", Email: "${emailInput.value}"`);
    showToast('Form Submit', 'Form berhasil disubmit (default dicegah)!');
  });

  // reset
  demoForm.addEventListener('reset', function () {
    addLog('log-form', 'reset', 'Form direset ke nilai awal');
  });

  // focus & blur
  nameInput.addEventListener('focus', function () {
    addLog('log-form', 'focus', 'Input Nama mendapat fokus');
  });

  nameInput.addEventListener('blur', function () {
    addLog('log-form', 'blur', `Input Nama kehilangan fokus. Nilai: "${this.value}"`);
  });

  // input (real-time ketikan)
  nameInput.addEventListener('input', function () {
    addLog('log-form', 'input', `Sedang mengetik: "${this.value}"`);
  });

  // change
  emailInput.addEventListener('change', function () {
    addLog('log-form', 'change', `Email diubah menjadi: "${this.value}"`);
  });

  selectInput.addEventListener('change', function () {
    addLog('log-form', 'change', `Pilihan diubah: "${this.options[this.selectedIndex].text}"`);
  });

  // checkbox change
  checkboxInput.addEventListener('change', function () {
    addLog('log-form', 'change', `Checkbox sekarang: ${this.checked ? '✅ Dicentang' : '❌ Tidak dicentang'}`);
  });

  // input on textarea
  textareaInput.addEventListener('input', function () {
    addLog('log-form', 'input', `Textarea: ${this.value.length} karakter`);
  });


  // ==============================================
  // 7. WINDOW EVENTS
  // ==============================================

  const winWidth = document.getElementById('win-width');
  const winHeight = document.getElementById('win-height');
  const winScrollY = document.getElementById('win-scrolly');
  const winOnline = document.getElementById('win-online');
  const scrollIndicator = document.getElementById('scroll-indicator');

  // Fungsi update info window
  function updateWindowInfo() {
    winWidth.textContent = window.innerWidth + 'px';
    winHeight.textContent = window.innerHeight + 'px';
    winScrollY.textContent = Math.round(window.scrollY) + 'px';
    winOnline.textContent = navigator.onLine ? '🟢 Online' : '🔴 Offline';
  }

  updateWindowInfo();

  // resize
  window.addEventListener('resize', function () {
    updateWindowInfo();
    addLog('log-window', 'resize', `Ukuran window: ${window.innerWidth} x ${window.innerHeight}`);
  });

  // scroll
  window.addEventListener('scroll', function () {
    updateWindowInfo();

    // Update scroll indicator progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollIndicator.style.width = scrollPercent + '%';
  });

  // online & offline
  window.addEventListener('online', function () {
    updateWindowInfo();
    addLog('log-window', 'online', 'Koneksi internet kembali terhubung!');
    showToast('Online', 'Anda kembali online!');
  });

  window.addEventListener('offline', function () {
    updateWindowInfo();
    addLog('log-window', 'offline', 'Koneksi internet terputus!');
    showToast('Offline', 'Anda sedang offline!');
  });

  // hashchange
  window.addEventListener('hashchange', function () {
    addLog('log-window', 'hashchange', `Hash berubah menjadi: ${window.location.hash}`);
  });


  // ==============================================
  // 8. MEDIA EVENTS (Audio & YouTube)
  // ==============================================

  // --- 8a. HTML5 Audio ---
  const audioPlayer = document.getElementById('audio-player');
  const audioStatus = document.getElementById('audio-status');
  const audioTime = document.getElementById('audio-time');

  if (audioPlayer) {
    audioPlayer.addEventListener('play', function () {
      audioStatus.textContent = '▶ Playing';
      addLog('log-media-audio', 'play', 'Audio mulai diputar (HTML5 Event)');
    });

    audioPlayer.addEventListener('pause', function () {
      audioStatus.textContent = '⏸ Paused';
      addLog('log-media-audio', 'pause', 'Audio dijeda (HTML5 Event)');
    });

    audioPlayer.addEventListener('ended', function () {
      audioStatus.textContent = '⏹ Ended';
      addLog('log-media-audio', 'ended', 'Audio selesai (HTML5 Event)');
    });

    audioPlayer.addEventListener('timeupdate', function () {
      audioTime.textContent = this.currentTime.toFixed(1) + 's';
    });
  }

  // --- 8b. YouTube IFrame API ---
  const ytStatus = document.getElementById('yt-status');
  const ytTime = document.getElementById('yt-time');

  // Load YouTube IFrame API Script secara dinamis
  const ytScriptTag = document.createElement('script');
  ytScriptTag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(ytScriptTag, firstScriptTag);

  let ytPlayer;
  let ytTimeUpdater;

  // Fungsi global ini dipanggil otomatis oleh API YouTube
  window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('youtube-player', {
      height: '315',
      width: '100%',
      videoId: 'H3sDc6_8nAc', 
      playerVars: { 'rel': 0 },
      events: {
        'onReady': function() {
          addLog('log-media-yt', 'onReady', 'API YouTube siap! (Callback Event)');
        },
        'onStateChange': onPlayerStateChange
      }
    });
  };

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      ytStatus.textContent = '▶ Playing';
      addLog('log-media-yt', 'onStateChange', 'Status: PLAYING (YouTube Event)');
      
      // Menggantikan event timeupdate
      ytTimeUpdater = setInterval(() => {
        if (ytPlayer && ytPlayer.getCurrentTime) {
          ytTime.textContent = ytPlayer.getCurrentTime().toFixed(1) + 's';
        }
      }, 500); 

    } else if (event.data == YT.PlayerState.PAUSED) {
      ytStatus.textContent = '⏸ Paused';
      addLog('log-media-yt', 'onStateChange', 'Status: PAUSED (YouTube Event)');
      clearInterval(ytTimeUpdater);
      
    } else if (event.data == YT.PlayerState.ENDED) {
      ytStatus.textContent = '⏹ Ended';
      addLog('log-media-yt', 'onStateChange', 'Status: ENDED (YouTube Event)');
      clearInterval(ytTimeUpdater);
    }
  }


  // ==============================================
  // 9. TOUCH EVENTS
  // ==============================================

  const touchArea = document.getElementById('touch-area');
  const touchInfo = document.getElementById('touch-info');

  if (touchArea) {
    // touchstart
    touchArea.addEventListener('touchstart', function (e) {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = touchArea.getBoundingClientRect();
      const x = Math.round(touch.clientX - rect.left);
      const y = Math.round(touch.clientY - rect.top);

      // Buat dot visual
      createTouchDot(touchArea, x, y);

      touchInfo.textContent = `Sentuh di (${x}, ${y}) — ${e.touches.length} titik sentuh`;
      addLog('log-touch', 'touchstart', `Sentuhan dimulai pada (${x}, ${y}), total titik: ${e.touches.length}`);
    });

    // touchmove
    touchArea.addEventListener('touchmove', function (e) {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = touchArea.getBoundingClientRect();
      const x = Math.round(touch.clientX - rect.left);
      const y = Math.round(touch.clientY - rect.top);

      touchInfo.textContent = `Bergerak ke (${x}, ${y})`;
    });

    // touchend
    touchArea.addEventListener('touchend', function (e) {
      touchInfo.textContent = 'Sentuhan dilepas';
      addLog('log-touch', 'touchend', `Sentuhan dilepas, sisa titik: ${e.touches.length}`);
    });

    // touchcancel
    touchArea.addEventListener('touchcancel', function () {
      touchInfo.textContent = 'Sentuhan dibatalkan';
      addLog('log-touch', 'touchcancel', 'Sentuhan dibatalkan oleh sistem');
    });

    // Simulasi touch dengan mouse (untuk desktop)
    touchArea.addEventListener('mousedown', function (e) {
      const rect = touchArea.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      createTouchDot(touchArea, x, y);
      touchInfo.textContent = `Simulasi sentuh di (${x}, ${y})`;
      addLog('log-touch', 'mousedown (simulasi touch)', `Simulasi sentuhan di (${x}, ${y})`);
    });
  }

  function createTouchDot(container, x, y) {
    const dot = document.createElement('div');
    dot.className = 'touch-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    container.appendChild(dot);

    setTimeout(() => {
      dot.style.opacity = '0';
      dot.style.transform = 'translate(-50%, -50%) scale(2)';
      dot.style.transition = 'all 0.5s ease-out';
      setTimeout(() => dot.remove(), 500);
    }, 300);
  }


  // ==============================================
  // 10a. DRAG AND DROP EVENTS (Element)
  // ==============================================

  const dragItems = document.querySelectorAll('.drag-item');
  const dropZones = document.querySelectorAll('.drag-zone');

  dragItems.forEach(item => {
    // dragstart
    item.addEventListener('dragstart', function (e) {
      this.classList.add('dragging');
      e.dataTransfer.setData('text/plain', this.id);
      e.dataTransfer.effectAllowed = 'move';
      addLog('log-dragdrop', 'dragstart', `Mulai menyeret: "${this.textContent.trim()}"`);
    });

    // dragend
    item.addEventListener('dragend', function () {
      this.classList.remove('dragging');
      addLog('log-dragdrop', 'dragend', `Selesai menyeret: "${this.textContent.trim()}"`);

      // Hapus semua drag-over state
      dropZones.forEach(zone => zone.classList.remove('drag-over'));
    });
  });

  dropZones.forEach(zone => {
    // dragover — HARUS preventDefault agar drop bisa terjadi
    zone.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      this.classList.add('drag-over');
    });

    // dragenter
    zone.addEventListener('dragenter', function (e) {
      e.preventDefault();
      this.classList.add('drag-over');
      addLog('log-dragdrop', 'dragenter', `Item masuk zona: "${this.querySelector('h4').textContent}"`);
    });

    // dragleave
    zone.addEventListener('dragleave', function () {
      this.classList.remove('drag-over');
      addLog('log-dragdrop', 'dragleave', `Item meninggalkan zona: "${this.querySelector('h4').textContent}"`);
    });

    // drop
    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      this.classList.remove('drag-over');

      const draggedId = e.dataTransfer.getData('text/plain');
      const draggedEl = document.getElementById(draggedId);

      if (draggedEl) {
        this.appendChild(draggedEl);
        addLog('log-dragdrop', 'drop', `"${draggedEl.textContent.trim()}" dijatuhkan ke "${this.querySelector('h4').textContent}"`);
        showToast('Drop!', 'Item berhasil dipindahkan!');
      }
    });
  });


  // ==============================================
  // 10b. DRAG AND DROP FILE (dari komputer)
  // ==============================================

  const fileDropArea = document.getElementById('file-drop-area');
  const fileInputHidden = document.getElementById('file-input-hidden');
  const filePreviewList = document.getElementById('file-preview-list');

  if (fileDropArea) {

    // Cegah default browser behavior untuk semua drag events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      fileDropArea.addEventListener(eventName, function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    // Juga cegah default di level document (agar browser tidak buka file)
    ['dragover', 'drop'].forEach(eventName => {
      document.addEventListener(eventName, function (e) {
        // Hanya cegah jika bukan dari drag zone kanban
        if (!e.target.closest('.drag-zone')) {
          e.preventDefault();
        }
      });
    });

    // dragenter — file dari komputer masuk ke area
    fileDropArea.addEventListener('dragenter', function () {
      this.classList.add('drag-over');
      this.querySelector('.file-drop-text').textContent = '📥 Lepaskan file di sini!';
      addLog('log-dragdrop', 'dragenter (file)', 'File dari komputer memasuki drop area');
    });

    // dragover — file hover di atas area
    fileDropArea.addEventListener('dragover', function (e) {
      this.classList.add('drag-over');
      e.dataTransfer.dropEffect = 'copy';
    });

    // dragleave — file keluar dari area
    fileDropArea.addEventListener('dragleave', function (e) {
      // Hanya remove jika benar-benar keluar (bukan masuk child)
      if (!this.contains(e.relatedTarget)) {
        this.classList.remove('drag-over');
        this.querySelector('.file-drop-text').textContent = 'Seret & lepas file di sini';
        addLog('log-dragdrop', 'dragleave (file)', 'File meninggalkan drop area');
      }
    });

    // drop — file dijatuhkan!
    fileDropArea.addEventListener('drop', function (e) {
      this.classList.remove('drag-over');
      this.querySelector('.file-drop-text').textContent = 'Seret & lepas file di sini';

      const files = e.dataTransfer.files;

      if (files.length === 0) return;

      addLog('log-dragdrop', 'drop (file)', `${files.length} file dijatuhkan!`);

      // Proses setiap file
      for (let i = 0; i < files.length; i++) {
        processDroppedFile(files[i]);
      }

      showToast('File Diterima!', `${files.length} file berhasil di-drop`);
    });

    // Klik area untuk buka file picker
    fileDropArea.addEventListener('click', function () {
      fileInputHidden.click();
    });

    // Handle file dari input (klik)
    fileInputHidden.addEventListener('change', function () {
      const files = this.files;
      if (files.length === 0) return;

      addLog('log-dragdrop', 'change (input file)', `${files.length} file dipilih via file picker`);

      for (let i = 0; i < files.length; i++) {
        processDroppedFile(files[i]);
      }

      showToast('File Dipilih!', `${files.length} file berhasil dipilih`);

      // Reset input agar bisa pilih file yang sama lagi
      this.value = '';
    });
  }

  /**
   * Memproses file yang di-drop / dipilih: 
   * membuat preview card dan log info
   */
  function processDroppedFile(file) {
    const icon = getFileIcon(file.type, file.name);
    const size = formatFileSize(file.size);
    const lastModified = new Date(file.lastModified).toLocaleDateString('id-ID');

    addLog('log-dragdrop', 'File Info', 
      `📄 ${file.name} | Tipe: ${file.type || 'unknown'} | Ukuran: ${size}`);

    // Buat card preview
    const card = document.createElement('div');
    card.className = 'file-preview-card';

    // Cek apakah file adalah gambar — buat preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.addEventListener('load', function (e) {
        card.innerHTML = `
          <div class="file-thumb">
            <img src="${e.target.result}" alt="${file.name}">
          </div>
          <div class="file-name" title="${file.name}">${file.name}</div>
          <div class="file-meta">
            <span>${size}</span>
            <span>${lastModified}</span>
          </div>
          <button class="file-remove" onclick="this.parentElement.remove()">✕ Hapus</button>
        `;

        addLog('log-dragdrop', 'FileReader load', `Preview gambar "${file.name}" berhasil dimuat`);
      });

      reader.addEventListener('error', function () {
        addLog('log-dragdrop', 'FileReader error', `Gagal membaca file "${file.name}"`);
      });

      // Baca file sebagai Data URL (base64)
      reader.readAsDataURL(file);

    } else if (file.type.startsWith('text/') || 
               file.type === 'application/json' ||
               file.type === 'application/javascript') {
      // Preview file teks
      const reader = new FileReader();

      reader.addEventListener('load', function (e) {
        const content = e.target.result;
        const preview = content.substring(0, 200) + (content.length > 200 ? '...' : '');

        card.innerHTML = `
          <div class="file-thumb" style="padding:8px; align-items:flex-start; overflow:auto;">
            <pre style="font-size:0.65rem; color:#aaa; margin:0; white-space:pre-wrap; word-break:break-all;">${escapeHTML(preview)}</pre>
          </div>
          <div class="file-name" title="${file.name}">${file.name}</div>
          <div class="file-meta">
            <span>${size}</span>
            <span>${content.split('\n').length} baris</span>
          </div>
          <button class="file-remove" onclick="this.parentElement.remove()">✕ Hapus</button>
        `;

        addLog('log-dragdrop', 'FileReader load', `Preview teks "${file.name}" — ${content.split('\\n').length} baris`);
      });

      reader.readAsText(file);

    } else {
      // File lain — tampilkan icon saja
      card.innerHTML = `
        <div class="file-thumb">
          <span class="file-icon-large">${icon}</span>
        </div>
        <div class="file-name" title="${file.name}">${file.name}</div>
        <div class="file-meta">
          <span>${size}</span>
          <span>${file.type || 'unknown'}</span>
        </div>
        <button class="file-remove" onclick="this.parentElement.remove()">✕ Hapus</button>
      `;
    }

    filePreviewList.appendChild(card);
  }

  /**
   * Escape HTML untuk mencegah XSS pada preview teks
   */
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

}); // END DOMContentLoaded
