// Favorites Management System (Essencia)

const STORAGE_KEY = 'essenciaFavorites';

// Add or remove item from favorites
function toggleFavorite(product) {
    let favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const index = favorites.findIndex(f => f.id === product.id || (f.name === product.name && f.notes === product.notes));

    if (index === -1) {
        favorites.push(product);
        console.log('Added to favorites:', product.name);
        return true; // Added
    } else {
        favorites.splice(index, 1);
        console.log('Removed from favorites:', product.name);
        return false; // Removed
    }
}

// Get all favorites
function getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Render favorites on the favorites page
function renderFavorites() {
    const favGrid = document.getElementById('favGrid') || document.getElementById('favoritesGrid');
    if (!favGrid) return;

    const favorites = getFavorites();
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
                <button class="remove-fav-btn" onclick="window.removeAndRefresh('${item.id || item.name}')" type="button">
                    Favoriden Çıkar
                </button>
            </div>
        `;
        favGrid.appendChild(card);
    });

    // Update overlay visibility if needed
    const favMoreOverlay = document.getElementById("favMoreOverlay");
    if (favMoreOverlay) {
        if (favorites.length > 2) {
            favMoreOverlay.classList.add("is-visible");
        } else {
            favMoreOverlay.classList.remove("is-visible");
        }
    }
}

window.removeAndRefresh = function(idOrName) {
    let favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    favorites = favorites.filter(f => (f.id !== idOrName && f.name !== idOrName));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    renderFavorites();
};

// Global toggle for heart buttons
window.toggleHeart = function(btn) {
    const card = btn.closest('.popular-card');
    if (!card) return;

    const product = {
        id: card.dataset.id,
        name: card.dataset.name,
        notes: card.dataset.notes,
        price: card.dataset.price,
        category: card.dataset.category,
        type: card.querySelector('.p-badge').classList.contains('badge-fem') ? 'female' : 'male'
    };

    const isAdded = toggleFavorite(product);
    
    if (isAdded) {
        btn.classList.add('active');
        alert(product.name + ' favorilerinize eklendi!');
    } else {
        btn.classList.remove('active');
        alert(product.name + ' favorilerinizden çıkarıldı.');
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getFavorites()));
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFavorites);
} else {
    initFavorites();
}

function initFavorites() {
    if (document.getElementById('favGrid') || document.getElementById('favoritesGrid')) {
        renderFavorites();
    }
    
    // Sync heart buttons state on page load
    const favorites = getFavorites();
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
        if (favorites.find(f => f.name === "Özel Karışım (Kadın)")) femFavBtn.classList.add('active');
        femFavBtn.addEventListener('click', () => {
            const notes = document.getElementById('fem-fill-text').textContent;
            const product = {
                id: 'custom-female',
                name: "Özel Karışım (Kadın)",
                notes: notes,
                price: "Özel Tasarım",
                category: "Özel Koleksiyon",
                type: 'female'
            };
            const isAdded = toggleFavorite(product);
            if (isAdded) {
                femFavBtn.classList.add('active');
                alert('Özel karışımınız favorilere eklendi!');
            } else {
                femFavBtn.classList.remove('active');
                alert('Özel karışımınız favorilerinden çıkarıldı.');
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(getFavorites()));
        });
    }

    const mascFavBtn = document.getElementById('masc-fav-action-btn');
    if (mascFavBtn) {
        if (favorites.find(f => f.name === "Özel Karışım (Erkek)")) mascFavBtn.classList.add('active');
        mascFavBtn.addEventListener('click', () => {
            const notes = document.getElementById('masc-fill-text').textContent;
            const product = {
                id: 'custom-male',
                name: "Özel Karışım (Erkek)",
                notes: notes,
                price: "Özel Tasarım",
                category: "Özel Koleksiyon",
                type: 'male'
            };
            const isAdded = toggleFavorite(product);
            if (isAdded) {
                mascFavBtn.classList.add('active');
                alert('Özel karışımınız favorilere eklendi!');
            } else {
                mascFavBtn.classList.remove('active');
                alert('Özel karışımınız favorilerinden çıkarıldı.');
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(getFavorites()));
        });
    }
}
