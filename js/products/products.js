class Products {
  constructor(products) {
    this.products = products;
  }

  getProductTemplate({ id, title, price, imageSrc }) {
    return `
      <div id="${id}" class="col-sm-6 col-lg-4">
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
              <button class="btn btn-primary btn-sm" type="button">
                <i class="bi bi-dash-circle"></i>
              </button>
              <span class="fw-bold">0</span>
              <button class="btn btn-primary btn-sm" type="button">
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
      productsContainer.innerHTML += this.getProductTemplate(product);
    });
  }
}

export default Products;
