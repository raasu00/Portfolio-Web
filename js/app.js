// APPLICATION LOGIC: Sistem Manajemen Portofolio Proyek

// Data aplikasi
let proyekData = JSON.parse(localStorage.getItem('portfolioProyek')) || [];
let proyekSedangEdit = null;
let searchQuery = '';
let kategoriFilter = 'all';

// Data default (jika tidak ada di localStorage)
const defaultProjects = [
    {
        id: '1',
        nama: 'BibitCabai - Company Profile',
        deskripsi: 'Website statis untuk perusahaan perbibitan cabai dengan informasi produk, varietas, dan kontak. Menunjukkan kemampuan dasar HTML/CSS/JS.',
        url: 'https://bibit-cabai.vercel.app',
        kategori: 'static',
        teknologi: 'HTML, CSS, JavaScript',
        tanggal: '2024-01-15',
        gambar: 'https://images.unsplash.com/photo-1589606663923-283bbd309229?w=400&h=200&fit=crop'
    },
    {
        id: '2',
        nama: 'Manajemen Harga Produk',
        deskripsi: 'Aplikasi web CRUD untuk mengelola daftar produk, harga, dan kompetitor. Menunjukkan kemampuan React, state management, dan operasi data.',
        url: 'https://tabel-produk.vercel.app',
        kategori: 'crud',
        teknologi: 'React, JavaScript, LocalStorage',
        tanggal: '2024-02-10',
        gambar: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
    },
    {
        id: '3',
        nama: 'Video Downloader Utility',
        deskripsi: 'Aplikasi utilitas untuk mengunduh video dari berbagai platform. Menunjukkan integrasi dengan API eksternal dan pemrosesan data.',
        url: 'https://vidytk.vercel.app',
        kategori: 'utility',
        teknologi: 'React, API Integration, JavaScript',
        tanggal: '2024-02-25',
        gambar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop'
    },
    {
        id: '4',
        nama: 'Simple Chat App',
        deskripsi: 'Aplikasi chat real-time sederhana. Menunjukkan kemampuan WebSockets dan manajemen state real-time.',
        url: 'https://chatting-lite.vercel.app',
        kategori: 'realtime',
        teknologi: 'WebSocket, Real-Time, JavaScript',
        tanggal: '2024-03-05',
        gambar: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400&h=200&fit=crop'
    }
];

// Fungsi helper
function getKategoriInfo(kategori) {
    const kategoriMap = {
        'static': { nama: 'Website Statis', kelas: 'category-static', icon: 'fa-globe' },
        'crud': { nama: 'Aplikasi CRUD', kelas: 'category-crud', icon: 'fa-database' },
        'utility': { nama: 'Utility App', kelas: 'category-utility', icon: 'fa-tools' },
        'realtime': { nama: 'Real-Time App', kelas: 'category-realtime', icon: 'fa-bolt' }
    };
    return kategoriMap[kategori] || { nama: 'Lainnya', kelas: 'category-static', icon: 'fa-code' };
}

function formatDate(dateString) {
    if (!dateString) return 'Tidak ditentukan';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Filter proyek
function filterProyek() {
    let filtered = [...proyekData];
    
    // Filter berdasarkan kategori
    if (kategoriFilter !== 'all') {
        filtered = filtered.filter(proyek => proyek.kategori === kategoriFilter);
    }
    
    // Filter berdasarkan pencarian
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(proyek => 
            proyek.nama.toLowerCase().includes(query) || 
            proyek.deskripsi.toLowerCase().includes(query) ||
            proyek.teknologi.toLowerCase().includes(query)
        );
    }
    
    return filtered;
}

// Render grid proyek
function renderProyekGrid() {
    const filteredProyek = filterProyek();
    const grid = document.getElementById('project-grid');
    const emptyState = document.getElementById('empty-state');
    const noResults = document.getElementById('no-search-results');
    
    if (!grid) return;
    
    if (filteredProyek.length === 0) {
        if (proyekData.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            if (noResults) noResults.style.display = 'none';
        } else {
            if (emptyState) emptyState.style.display = 'none';
            if (noResults) noResults.style.display = 'block';
        }
        grid.innerHTML = '';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    if (noResults) noResults.style.display = 'none';
    
    let html = '';
    
    filteredProyek.forEach(proyek => {
        const kategoriInfo = getKategoriInfo(proyek.kategori);
        const techArray = proyek.teknologi ? proyek.teknologi.split(',').map(t => t.trim()) : [];
        
        html += `
            <div class="project-card" data-id="${proyek.id}">
                <div class="project-image">
                    <img src="${proyek.gambar || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop'}" alt="${proyek.nama}">
                    <span class="project-category ${kategoriInfo.kelas}">
                        <i class="fas ${kategoriInfo.icon}"></i> ${kategoriInfo.nama}
                    </span>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${proyek.nama}</h3>
                    <p class="project-description">${proyek.deskripsi}</p>
                    
                    ${techArray.length > 0 ? `
                        <div class="project-tech">
                            ${techArray.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="project-footer">
                        <span class="project-date">
                            <i class="far fa-calendar"></i> ${formatDate(proyek.tanggal)}
                        </span>
                        <a href="${proyek.url}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i> Kunjungi
                        </a>
                    </div>
                </div>
                <div style="padding: 0 20px 20px; display: flex; gap: 8px;">
                    <button class="btn btn-outline btn-sm edit-proyek" data-id="${proyek.id}" style="flex: 1;">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-outline btn-sm delete-proyek" data-id="${proyek.id}" style="flex: 1;">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
    
    // Tambahkan event listeners untuk tombol edit dan hapus
    document.querySelectorAll('.edit-proyek').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            editProyek(btn.dataset.id);
        });
    });
    
    document.querySelectorAll('.delete-proyek').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            hapusProyek(btn.dataset.id);
        });
    });
}

// Tampilkan modal proyek
function tampilkanModalProyek(edit = false, proyek = null) {
    const modal = document.getElementById('modal-proyek');
    if (!modal) return;
    
    const title = document.getElementById('modal-title');
    const form = document.getElementById('form-proyek');
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    if (edit && proyek) {
        title.textContent = 'Edit Proyek';
        document.getElementById('proyek-id').value = proyek.id;
        document.getElementById('nama-proyek').value = proyek.nama;
        document.getElementById('deskripsi').value = proyek.deskripsi;
        document.getElementById('url-proyek').value = proyek.url;
        document.getElementById('kategori').value = proyek.kategori;
        document.getElementById('teknologi').value = proyek.teknologi;
        document.getElementById('tanggal').value = proyek.tanggal;
        proyekSedangEdit = proyek.id;
    } else {
        title.textContent = 'Tambah Proyek Baru';
        if (form) form.reset();
        document.getElementById('proyek-id').value = '';
        document.getElementById('tanggal').value = new Date().toISOString().split('T')[0];
        proyekSedangEdit = null;
    }
    
    const alertForm = document.getElementById('alert-form');
    if (alertForm) alertForm.style.display = 'none';
}

// Edit proyek
function editProyek(id) {
    const proyek = proyekData.find(p => p.id === id);
    if (proyek) {
        tampilkanModalProyek(true, proyek);
    }
}

// Hapus proyek
function hapusProyek(id) {
    if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
        proyekData = proyekData.filter(p => p.id !== id);
        localStorage.setItem('portfolioProyek', JSON.stringify(proyekData));
        renderProyekGrid();
        showNotification('Proyek berhasil dihapus', 'success');
    }
}

// Tutup modal
function tutupModal() {
    const modal = document.getElementById('modal-proyek');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Generate ID unik
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Tampilkan notifikasi
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Inisialisasi aplikasi
function initApp() {
    // Inisialisasi data jika kosong
    if (proyekData.length === 0) {
        proyekData = defaultProjects;
        localStorage.setItem('portfolioProyek', JSON.stringify(proyekData));
    }
    
    renderProyekGrid();
    
    // Event Listeners
    const btnTambahProyek = document.getElementById('btn-tambah-proyek');
    const btnTambahEmpty = document.getElementById('btn-tambah-empty');
    const searchInput = document.getElementById('search-input');
    const btnClearSearch = document.getElementById('btn-clear-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const formProyek = document.getElementById('form-proyek');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    if (btnTambahProyek) {
        btnTambahProyek.addEventListener('click', () => tampilkanModalProyek(false));
    }
    
    if (btnTambahEmpty) {
        btnTambahEmpty.addEventListener('click', () => tampilkanModalProyek(false));
    }
    
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', tutupModal);
        });
    }
    
    // Tutup modal saat klik di luar
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('modal-proyek');
        if (modal && modal.style.display === 'flex' && e.target === modal) {
            tutupModal();
        }
    });
    
    // Pencarian
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProyekGrid();
        });
    }
    
    if (btnClearSearch) {
        btnClearSearch.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            searchQuery = '';
            renderProyekGrid();
        });
    }
    
    // Filter kategori
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                kategoriFilter = btn.dataset.category;
                renderProyekGrid();
            });
        });
    }
    
    // Submit form proyek
    if (formProyek) {
        formProyek.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const id = document.getElementById('proyek-id').value || generateId();
            const nama = document.getElementById('nama-proyek').value.trim();
            const deskripsi = document.getElementById('deskripsi').value.trim();
            const url = document.getElementById('url-proyek').value.trim();
            const kategori = document.getElementById('kategori').value;
            const teknologi = document.getElementById('teknologi').value.trim();
            const tanggal = document.getElementById('tanggal').value;
            
            if (!nama || !deskripsi || !url || !kategori) {
                showNotification('Harap isi semua field yang wajib diisi!', 'danger');
                return;
            }
            
            // Validasi URL
            try {
                new URL(url);
            } catch {
                showNotification('URL tidak valid! Harap masukkan URL yang benar.', 'danger');
                return;
            }
            
            const proyek = {
                id,
                nama,
                deskripsi,
                url,
                kategori,
                teknologi,
                tanggal,
                gambar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=400&h=200&fit=crop`
            };
            
            if (proyekSedangEdit) {
                const index = proyekData.findIndex(p => p.id === proyekSedangEdit);
                if (index !== -1) {
                    proyek.gambar = proyekData[index].gambar; // Pertahankan gambar lama
                    proyekData[index] = proyek;
                }
            } else {
                proyekData.push(proyek);
            }
            
            localStorage.setItem('portfolioProyek', JSON.stringify(proyekData));
            renderProyekGrid();
            tutupModal();
            showNotification(`Proyek "${nama}" berhasil ${proyekSedangEdit ? 'diperbarui' : 'ditambahkan'}!`, 'success');
        });
    }
    
    console.log('%c🚀 Mini Portofolio Web v1.0', 'color: #4f46e5; font-size: 14px; font-weight: bold;');
    console.log('%c📊 Total Proyek: ' + proyekData.length, 'color: #059669;');
}

// Function untuk diakses dari index.html
function initModalEvents() {
    // Event listeners untuk modal sudah di-handle di initApp()
}

// Export function untuk diakses dari luar
window.initApp = initApp;
window.tampilkanModalProyek = tampilkanModalProyek;
window.tutupModal = tutupModal;