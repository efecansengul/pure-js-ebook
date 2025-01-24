import { Products } from "./data.js";
import {
  getBasketFromLocalStorage,
  calculateBasketPrice,
  renderBasketItem,
} from "./utils.js";
const basketButton = document.querySelector(".basket-show-cart");
const basketAside = document.querySelector(".basket-aside");
const exitBasketCart = document.querySelector(".exit-basket-cart");
const continueShopping = document.querySelector(".continue-shopping");
const addToCartButton = document.querySelectorAll(".add-to-cart");
const totalAmount = document.querySelector(".total-amount-span");

basketButton.addEventListener("click", (e) => {
  basketAside.classList.add("open");

  let total = calculateBasketPrice();
  totalAmount.innerText = `${total} TRY`;
});
exitBasketCart.addEventListener("click", () => {
  basketAside.classList.remove("open");
});
continueShopping.addEventListener("click", () => {
  basketAside.classList.remove("open");
});

export const addBasket = (productId, productInfo) => {
  let basket = getBasketFromLocalStorage();

  // Ürünü sepette arıyoruz
  const existingProductIndex = basket.findIndex(
    (item) => item.item.id === productId
  );

  if (existingProductIndex > -1) {
    // Eğer ürün zaten varsa, quantity'yi artırıyoruz
    basket[existingProductIndex].quantity += 1;
  } else {
    // Eğer ürün yoksa, yeni bir nesne oluşturuyoruz
    basket.push({
      item: productInfo, // Ürün bilgisi (item)
      quantity: 1, // Başlangıçta quantity 1
    });
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  let totalPrice = Number(calculateBasketPrice());
  renderBasketItem();
  totalAmount.innerText = `${totalPrice} TRY`;
};

addToCartButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productElement = e.target.closest("[data-product-id]");

    const productId = productElement.dataset.productId; // data-product-id değeri
    const newElement = Products.items.find((items) => items.id === productId);
    addBasket(productId, newElement);
  });
});
