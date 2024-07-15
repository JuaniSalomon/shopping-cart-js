class Products {
  constructor(products) {
    this.products = products;
    this.cart = [];
  }

  increaseProductQuantity(id) {
    const quantityElement = document.getElementById(`quantity-${id}`);
    const quantity = Number(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
  }

  decreaseProductQuantity(id) {
    const quantityElement = document.getElementById(`quantity-${id}`);
    const quantity = Number(quantityElement.textContent);
    if (quantity > 0) {
      quantityElement.textContent = quantity - 1;
    }
  }

  getProductTemplate({ id, title, price, imageSrc }) {
    return `
      <div id="product-${id}" class="col-sm-6 col-lg-4">
        <div class="card shadow">
          <img
            src="${imageSrc}"
            class="card-img-top"
            alt="${title}"
          />
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="mb-2 fw-bold fs-5 d-inline-flex">$ ${price}</p>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span>Cantidad:</span>
              <button id="decrease-btn-${id}" class="btn btn-primary btn-sm" type="button">
                <i class="bi bi-dash-circle"></i>
              </button>
              <span id="quantity-${id}" class="fw-bold">0</span>
              <button id="increase-btn-${id}" class="btn btn-primary btn-sm" type="button">
                <i class="bi bi-plus-circle"></i>
              </button>
            </div>
            <button id="add-to-cart-btn-${id}" type="button" class="btn btn-primary w-100">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Add product to cart
  addToCart(id) {
    const product = this.products.find((product) => product.id === id); // se busca en this.product el mismo id
    const quantityElement = document.getElementById(`quantity-${id}`);
    const quantity = Number(quantityElement.textContent); // se obtiene el valor numero del contador

    if (quantity > 0) {
      const cartItem = this.cart.find((item) => item.id === id); // se busca si existe un elemento con el mismo id

      if (cartItem) {
        cartItem.quantity += quantity; // si esta en el carrito se suma cantidad
      } else {
        this.cart.push({ ...product, quantity });
      }

      quantityElement.textContent = 0; // resetea la cantidad del producto a 0
      this.updateCart();
    }
  }

  updateCart() {
    const cartContainer = document.querySelector(".offcanvas-body");

    // total price calculation
    const totalAmount = this.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const cartItemsHTML = this.cart
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
    if (this.cart.length > 0) {
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
    this.updateCart();
  }

  renderProducts() {
    const productsContainer = document.getElementById("products-container");
    this.products.forEach((product) => {
      productsContainer.insertAdjacentHTML(
        "beforeend",
        this.getProductTemplate(product)
      );

      const increaseBtn = document.getElementById(`increase-btn-${product.id}`);
      increaseBtn.addEventListener("click", () => {
        this.increaseProductQuantity(product.id);
      });

      const decreaseBtn = document.getElementById(`decrease-btn-${product.id}`);
      decreaseBtn.addEventListener("click", () => {
        this.decreaseProductQuantity(product.id);
      });

      const addToCartBtn = document.getElementById(
        `add-to-cart-btn-${product.id}`
      );
      addToCartBtn.addEventListener("click", () => {
        this.addToCart(product.id);
      });
    });
  }
}

export default Products;
