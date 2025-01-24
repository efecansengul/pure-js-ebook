import { getBasketFromLocalStorage } from "./utils.js";
const address = document.querySelector("#address");
const paymentMethod = document.querySelectorAll(".payments");

paymentMethod.forEach((pay) => {
  pay.addEventListener("click", (e) => {
    const payment = document.querySelector(".payment");
    if (e.target.value === "credit-card") {
      payment.innerText = "Credit Cart";
    } else {
      payment.innerText = "Paypal";
    }
  });
});

address.addEventListener("input", (e) => {
  const addressBarArea = document.querySelector(".address");
  addressBarArea.innerText = e.target.value;
});

document.addEventListener("DOMContentLoaded", () => {
  const basket = getBasketFromLocalStorage();
  const choosenBookList = document.querySelector(".choosen-book-list");
});
