class Cart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  }

  updateCart() {
    const cartContainer = document.querySelector(".offcanvas-body");
    cartContainer.innerHTML = ""; // Limpiar el contenido actual del carrito

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // total price calculation
    const totalAmount = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const cartItemsHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <h5>${item.title}</h5>
        <p>$${item.quantity} x ${item.price} = $${
          item.price * item.quantity
        }</p>
      </div>
      `
      )
      .join("");

    cartContainer.innerHTML = cartItemsHTML;

    // total price div
    cartContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="cart-total">Total: $${totalAmount}</div>`
    );

    // "comprar" button
    if (cart.length > 0) {
      cartContainer.insertAdjacentHTML(
        "beforeend",
        `<button id="checkout-btn" class="btn btn-primary w-100 mt-3">Comprar</button>`
      );

      const checkoutBtn = document.getElementById("checkout-btn");
      checkoutBtn.addEventListener("click", () => {
        this.checkout();
      });
    }
  }

  checkout() {
    this.cart = [];
    localStorage.removeItem("cart");
    this.updateCart();
  }
}

export default Cart;
