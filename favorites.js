// Favorites Management System (Essencia)

const STORAGE_KEY = 'essenciaFavorites';

// Add or remove item from favorites
async function toggleFavorite(product) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');

    if (isLoggedIn && userId) {
        try {
            const result = await window.essenciaApi.toggleFavorite(userId, product.id);
            if (result.success) {
                return result.action === 'added';
            }
        } catch (error) {
            console.error('Backend favori hatası:', error);
        }
    }

    // Fallback to localStorage
    let favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const index = favorites.findIndex(f => f.id === product.id || (f.name === product.name && f.notes === product.notes));

    if (index === -1) {
        favorites.push(product);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        return true; // Added
    } else {
        favorites.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        return false; // Removed
    }
}

// Get all favorites
async function getFavorites() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');

    if (isLoggedIn && userId) {
        try {
            const result = await window.essenciaApi.getFavorites(userId);
            if (Array.isArray(result)) {
                // Backend formatını frontend formatına dönüştür
                return result.map(f => ({
                    id: f.product.URUN_ID,
                    name: f.product.URUN_AD,
                    notes: f.product.ACİK_LAMA,
                    price: f.product.FIYAT + ' TL',
                    category: f.product.KOKU_PROFILI,
                    type: f.product.CINSIYET_KATEGORI.toLowerCase() === 'kadın' ? 'female' : 'male'
                }));
            }
        } catch (error) {
            console.error('Backend favori yükleme hatası:', error);
        }
    }
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Render favorites on the favorites page
async function renderFavorites() {
    const favGrid = document.getElementById('favGrid') || document.getElementById('favoritesGrid');
    if (!favGrid) return;

    const favorites = await getFavorites();
    favGrid.innerHTML = '';

    if (favorites.length === 0) {
        favGrid.innerHTML = `
            <div class="empty-favorites" style="grid-column: 1/-1; padding: 40px; border-radius: 20px; background: #fffaf3; color: #777; text-align: center;">
                Henüz favorilere eklenmiş parfüm yok.
            </div>
        `;
        return;
    }

    favorites.forEach(item => {
        const card = document.createElement('div');
        card.className = `favorite-card ${item.type === 'female' ? 'female-fav' : 'male-fav'}`;
        
        card.innerHTML = `
            <div class="fav-bottle">${item.type === 'female' ? '🌸' : '★'}</div>
            <div class="fav-info">
                <span>${item.category || (item.type === 'female' ? 'Kadın Koleksiyonu' : 'Erkek Koleksiyonu')}</span>
                <h3>${item.name}</h3>
                <p>${item.notes}</p>
                <strong>${item.price || ''}</strong>
                <button class="remove-fav-btn" onclick="window.removeAndRefresh('${item.id}')" type="button">
                    Favoriden Çıkar
                </button>
            </div>
        `;
        favGrid.appendChild(card);
    });

    const favMoreOverlay = document.getElementById("favMoreOverlay");
    if (favMoreOverlay) {
        if (favorites.length > 2) {
            favMoreOverlay.classList.add("is-visible");
        } else {
            favMoreOverlay.classList.remove("is-visible");
        }
    }
}

window.removeAndRefresh = async function(id) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');

    if (isLoggedIn && userId) {
        await window.essenciaApi.toggleFavorite(userId, id);
    } else {
        let favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        favorites = favorites.filter(f => f.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
    renderFavorites();
};

// Global toggle for heart buttons
window.toggleHeart = async function(btn) {
    const card = btn.closest('.popular-card');
    if (!card) return;

    const product = {
        id: card.dataset.id,
        name: card.dataset.name,
        notes: card.dataset.notes,
        price: card.dataset.price,
        category: card.dataset.category,
        type: card.querySelector('.p-badge') && card.querySelector('.p-badge').classList.contains('badge-fem') ? 'female' : 'male'
    };

    const isAdded = await toggleFavorite(product);
    
    if (isAdded) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFavorites);
} else {
    initFavorites();
}

async function initFavorites() {
    if (document.getElementById('favGrid') || document.getElementById('favoritesGrid')) {
        renderFavorites();
    }
    
    // Sync heart buttons state on page load
    const favorites = await getFavorites();
    document.querySelectorAll('.popular-card').forEach(card => {
        const id = card.dataset.id;
        const name = card.dataset.name;
        const btn = card.querySelector('.card-fav-btn');
        if (favorites.find(f => (id && f.id === id) || f.name === name)) {
            if (btn) btn.classList.add('active');
        }
    });

    // Builder Buttons
    const femFavBtn = document.getElementById('fem-fav-action-btn');
    if (femFavBtn) {
        const isFav = favorites.find(f => f.name === "Özel Karışım (Kadın)");
        if (isFav) femFavBtn.classList.add('active');
        femFavBtn.addEventListener('click', async () => {
            const notes = document.getElementById('fem-fill-text').textContent;
            const product = {
                id: 'custom-female',
                name: "Özel Karışım (Kadın)",
                notes: notes,
                price: "Özel Tasarım",
                category: "Özel Koleksiyon",
                type: 'female'
            };
            const isAdded = await toggleFavorite(product);
            if (isAdded) {
                femFavBtn.classList.add('active');
                alert('Özel karışımınız favorilere eklendi!');
            } else {
                femFavBtn.classList.remove('active');
                alert('Özel karışımınız favorilerinden çıkarıldı.');
            }
        });
    }

    const mascFavBtn = document.getElementById('masc-fav-action-btn');
    if (mascFavBtn) {
        const isFav = favorites.find(f => f.name === "Özel Karışım (Erkek)");
        if (isFav) mascFavBtn.classList.add('active');
        mascFavBtn.addEventListener('click', async () => {
            const notes = document.getElementById('masc-fill-text').textContent;
            const product = {
                id: 'custom-male',
                name: "Özel Karışım (Erkek)",
                notes: notes,
                price: "Özel Tasarım",
                category: "Özel Koleksiyon",
                type: 'male'
            };
            const isAdded = await toggleFavorite(product);
            if (isAdded) {
                mascFavBtn.classList.add('active');
                alert('Özel karışımınız favorilere eklendi!');
            } else {
                mascFavBtn.classList.remove('active');
                alert('Özel karışımınız favorilerinden çıkarıldı.');
            }
        });
    }
}
