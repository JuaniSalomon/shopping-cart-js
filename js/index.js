import Products from "./products/products.js";

const products = [
  {
    id: 1,
    title: "Cerveza Quilmes rubia lata",
    price: 600,
    imageSrc: "./assets/images/cerveza-quilmes-lata.jpg",
  },

  {
    id: 2,
    title: "Cerveza Brahama rubia lata",
    price: 550,
    imageSrc: "./assets/images/cerveza-quilmes-lata.jpg",
  },

  {
    id: 3,
    title: "Cerveza Stella rubia lata",
    price: 700,
    imageSrc: "./assets/images/cerveza-quilmes-lata.jpg",
  },

  {
    id: 4,
    title: "Cerveza Stella rubia lata",
    price: 700,
    imageSrc: "./assets/images/cerveza-quilmes-lata.jpg",
  },

  {
    id: 5,
    title: "Cerveza Stella rubia lata",
    price: 700,
    imageSrc: "./assets/images/cerveza-quilmes-lata.jpg",
  },

  {
    id: 6,
    title: "Cerveza Stella rubia lata",
    price: 700,
    imageSrc: "./assets/images/cerveza-quilmes-lata.jpg",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const productsInstance = new Products(products);
  productsInstance.renderProducts();
});
