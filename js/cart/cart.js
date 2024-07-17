class Cart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  }

  formatPrice(price) {
    return price.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
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
      <div class="cart-item border-bottom border-3 my-3 fs-5">
        <h5>${item.title}</h5>
        <p>${item.quantity} U x ${this.formatPrice(
          item.price
        )} = ${this.formatPrice(item.price * item.quantity)}</p>
      </div>
      `
      )
      .join("");

    cartContainer.innerHTML = cartItemsHTML;

    // total price div
    cartContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="cart-total fs-3">Total: ${this.formatPrice(
        totalAmount
      )}</div>`
    );

    // "comprar" button
    if (cart.length > 0) {
      cartContainer.insertAdjacentHTML(
        "beforeend",
        `<button id="checkout-btn" class="btn btn-warning w-100 mt-3 position-absolute bottom-0 start-50 translate-middle-x mb-3"><i class="bi bi-cart-fill me-2"></i>Comprar</button>`
      );

      const checkoutBtn = document.getElementById("checkout-btn");
      checkoutBtn.addEventListener("click", () => {
        this.checkout();
      });
    }
  }

  checkout() {
    Swal.fire({
      title: "Gracias por su compra!",
      text: "Su pedido ha sido procesado exitosamente.",
      icon: "success",
      confirmButtonText: "Cerrar",
      customClass: {
        confirmButton: "btn-confirm",
      },
    }).then(() => {
      this.cart = [];
      localStorage.removeItem("cart");
      this.updateCart();
    });
  }
}

export default Cart;
