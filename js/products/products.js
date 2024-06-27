class Products {
  constructor(products) {
    this.products = products;
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
            <button type="button" class="btn btn-primary w-100">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `;
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
    });
  }
}

export default Products;
