// Favorites Management System

// Add or remove item from favorites
function toggleFavorite(item) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(f => f.name === item.name);

    if (index === -1) {
        favorites.push(item);
        console.log('Added to favorites:', item.name);
        return true; // Added
    } else {
        favorites.splice(index, 1);
        console.log('Removed from favorites:', item.name);
        return false; // Removed
    }
}

// Get all favorites
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Render favorites on the favorites page
function renderFavorites() {
    const favGrid = document.getElementById('favGrid');
    if (!favGrid) return;

    const favorites = getFavorites();
    favGrid.innerHTML = '';

    if (favorites.length === 0) {
        favGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #aaa; padding: 40px;">Henüz favori ürününüz bulunmuyor.</p>';
        return;
    }

    favorites.forEach(item => {
        const card = document.createElement('div');
        card.className = `fav-item-card ${item.type || 'female-card'}`;
        
        card.innerHTML = `
            <div class="fav-info">
                <h4>${item.name}</h4>
                <p>${item.notes}</p>
                <button class="remove-fav" onclick="removeAndRefresh('${item.name}')">&times;</button>
            </div>
        `;
        favGrid.appendChild(card);
    });

    // Update overlay visibility
    const favMoreOverlay = document.getElementById("favMoreOverlay");
    if (favMoreOverlay) {
        if (favorites.length > 2) {
            favMoreOverlay.classList.add("is-visible");
        } else {
            favMoreOverlay.classList.remove("is-visible");
        }
    }
}

window.removeAndRefresh = function(name) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(f => f.name !== name);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
};

// Global toggle for heart buttons
window.toggleHeart = function(btn) {
    const card = btn.closest('.popular-card');
    if (!card) return;

    const name = card.querySelector('.p-name').textContent;
    const notes = card.querySelector('.p-notes').textContent;
    const type = card.querySelector('.p-badge').classList.contains('badge-fem') ? 'female-card' : 'male-card';

    const isAdded = toggleFavorite({ name, notes, type });
    
    if (isAdded) {
        btn.classList.add('active');
        alert(name + ' favorilerinize eklendi!');
    } else {
        btn.classList.remove('active');
        alert(name + ' favorilerinizden çıkarıldı.');
    }
    
    localStorage.setItem('favorites', JSON.stringify(getFavorites()));
};

// Initialize if on favoritee.html
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFavorites);
} else {
    initFavorites();
}

function initFavorites() {
    if (document.getElementById('favGrid')) {
        renderFavorites();
    }
    
    // Sync heart buttons state on page load
    const favorites = getFavorites();
    document.querySelectorAll('.popular-card').forEach(card => {
        const nameEl = card.querySelector('.p-name');
        if (!nameEl) return;
        const name = nameEl.textContent;
        const btn = card.querySelector('.card-fav-btn');
        if (favorites.find(f => f.name === name)) {
            if (btn) btn.classList.add('active');
        }
    });
}
