import Cart from "../cart/cart.js";

class Products {
  constructor() {
    this.products = [];
  }

  async fetchProducts() {
    try {
      const response = await fetch(
        "https://api.mercadolibre.com/sites/MLA/search?q=Motorola"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      this.products = jsonResponse.results.slice(0, 9).map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        imageSrc: product.thumbnail,
      }));
      this.products = [...this.products];
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  formatPrice(price) {
    return price.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
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
            <p class="mb-2 fw-bold fs-5 d-inline-flex">$ ${this.formatPrice(
              price
            )}</p>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span>Cantidad:</span>
              <button id="decrease-btn-${id}" class="btn btn-warning btn-sm" type="button">
                <i class="bi bi-dash-circle"></i>
              </button>
              <span id="quantity-${id}" class="fw-bold">0</span>
              <button id="increase-btn-${id}" class="btn btn-warning btn-sm" type="button">
                <i class="bi bi-plus-circle"></i>
              </button>
            </div>
            <button id="add-to-cart-btn-${id}" type="button" class="btn btn-warning w-100">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Add product to cart
  addToCart(id) {
    const product = this.products.find((product) => product.id === id);
    const quantityElement = document.getElementById(`quantity-${id}`);
    const quantity = Number(quantityElement.textContent);

    if (quantity > 0) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartItemIndex = cart.findIndex((item) => item.id === id);

      if (cartItemIndex !== -1) {
        cart[cartItemIndex].quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      quantityElement.textContent = 0;

      const cartInstance = new Cart();
      cartInstance.updateCart();
    }
  }

  renderProducts() {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

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
