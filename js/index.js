import Products from "./products/products.js";
import Cart from "./cart/cart.js";
import SearchBar from "./searchbar.js";

const productsInstance = new Products();
await productsInstance.fetchProducts();
productsInstance.renderProducts();

const cartInstance = new Cart();
cartInstance.updateCart();

const searchBar = new SearchBar(
  productsInstance.products,
  (filteredProducts) => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
    filteredProducts.forEach((product) => {
      productsContainer.insertAdjacentHTML(
        "beforeend",
        productsInstance.getProductTemplate(product)
      );
    });
  }
);
