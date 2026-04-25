const totalPriceEl = document.querySelector(".total strong");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const emptyCartMessage = document.getElementById("emptyCartMessage");

async function renderCart() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');
    let cartItems = [];

    if (isLoggedIn && userId) {
        try {
            const data = await window.essenciaApi.getSepet(userId);
            if (Array.isArray(data)) {
                cartItems = data.map(item => ({
                    sepetId: item.SEPET_ID,
                    id: item.product.URUN_ID,
                    name: item.product.URUN_AD,
                    price: item.product.FIYAT,
                    quantity: item.ADET,
                    notes: item.product.ACİK_LAMA
                }));
            }
        } catch (error) {
            console.error('Sepet yükleme hatası:', error);
        }
    } else {
        // Fallback to localStorage
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems = localCart.map((item, index) => ({
            sepetId: index,
            id: item.id || index,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            notes: item.notes || ''
        }));
    }

    if (cartItems.length === 0) {
        if (cartItemsContainer) cartItemsContainer.style.display = "none";
        if (emptyCartMessage) emptyCartMessage.style.display = "block";
        return;
    }

    if (cartItemsContainer) cartItemsContainer.style.display = "block";
    if (emptyCartMessage) emptyCartMessage.style.display = "none";

    // Header ve footer hariç içeriği temizle
    const container = document.getElementById("cartItemsContainer");
    const divider = container.querySelector(".divider");
    const totalArea = container.querySelector(".total");
    const buyBtn = container.querySelector(".buy-btn");
    
    container.innerHTML = '<h1>Sepetim</h1>'; // Başlığı geri ekle

    let total = 0;

    cartItems.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.innerHTML = `
            <div class="item-info">
              <h3>${item.name}</h3>
              <p>${item.notes}</p>
            </div>
            <div class="item-controls">
              <div class="quantity">
                <button class="minus-btn" onclick="updateQty(${item.sepetId}, -1, ${item.quantity})">-</button>
                <span>${item.quantity}</span>
                <button class="plus-btn" onclick="updateQty(${item.sepetId}, 1, ${item.quantity})">+</button>
              </div>
              <div class="price">₺${item.price * item.quantity}</div>
              <button class="delete-btn" onclick="removeItem(${item.sepetId})"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `;
        container.appendChild(itemEl);
        total += item.price * item.quantity;
    });

    container.appendChild(divider);
    container.appendChild(totalArea);
    container.appendChild(buyBtn);
    
    totalArea.querySelector("strong").textContent = `₺${total}`;
}

window.updateQty = async function(sepetId, delta, currentQty) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const newQty = currentQty + delta;
    if (newQty < 1) return;

    if (isLoggedIn) {
        await window.essenciaApi.updateCartQuantity(sepetId, newQty);
    } else {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[sepetId]) {
            cart[sepetId].quantity = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    renderCart();
};

window.removeItem = async function(sepetId) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        await window.essenciaApi.removeFromCart(sepetId);
    } else {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(sepetId, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    renderCart();
};

document.addEventListener('DOMContentLoaded', renderCart);