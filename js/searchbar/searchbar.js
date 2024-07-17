class SearchBar {
  constructor(products, renderCallback) {
    this.products = products;
    this.renderCallback = renderCallback;
    this.inputElement = document.getElementById("search-input");
    this.inputElement.addEventListener(
      "input",
      this.handleInputChange.bind(this)
    );
  }

  handleInputChange(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    this.renderCallback(filteredProducts);
  }
}

export default SearchBar;
