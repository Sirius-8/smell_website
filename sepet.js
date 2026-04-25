const totalPriceEl = document.querySelector(".total strong");

function updateTotal() {
  let total = 0;

  document.querySelectorAll(".cart-item").forEach(item => {
    const price = Number(item.dataset.price);
    const quantity = Number(item.querySelector(".quantity span").textContent);

    total += price * quantity;
  });

  totalPriceEl.textContent = `₺${total}`;
}

document.querySelectorAll(".cart-item").forEach(item => {
  const minusBtn = item.querySelector(".minus-btn");
  const plusBtn = item.querySelector(".plus-btn");
  const quantityEl = item.querySelector(".quantity span");
  const deleteBtn = item.querySelector(".delete-btn");

  plusBtn.addEventListener("click", () => {
    let quantity = Number(quantityEl.textContent);
    quantity++;
    quantityEl.textContent = quantity;
    updateTotal();
  });

  minusBtn.addEventListener("click", () => {
    let quantity = Number(quantityEl.textContent);

    if (quantity > 1) {
      quantity--;
      quantityEl.textContent = quantity;
      updateTotal();
    }
  });

  deleteBtn.addEventListener("click", () => {
    item.remove();
    updateTotal();
  });
});

updateTotal();

function increaseQty(index) {
  products[index].qty++;
  renderCart();
}

function decreaseQty(index) {
  if (products[index].qty > 1) {
    products[index].qty--;
  }
  renderCart();
}

function removeItem(index) {
  products.splice(index, 1);
  renderCart();
}

function calculateTotal() {
  let total = 0;

  products.forEach(product => {
    total += product.price * product.qty;
  });

  totalPrice.innerText = "₺" + total;
}

renderCart();