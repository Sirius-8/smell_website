const totalPriceEl = document.querySelector(".total strong");

function updateTotal() {
  let total = 0;
  const items = document.querySelectorAll(".cart-item");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const emptyCartMessage = document.getElementById("emptyCartMessage");

  if (items.length === 0) {
    if (cartItemsContainer) cartItemsContainer.style.display = "none";
    if (emptyCartMessage) emptyCartMessage.style.display = "block";
    return;
  }

  items.forEach(item => {
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