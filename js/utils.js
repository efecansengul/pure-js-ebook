// utils.js dosyasındaki getBasketFromLocalStorage fonksiyonu
export const getBasketFromLocalStorage = () => {
  // localStorage'dan sepet verisini alıyoruz, eğer veri yoksa boş bir dizi döndürüyoruz
  const basket = localStorage.getItem("basket");
  return basket ? JSON.parse(basket) : [];
};
//updatebaseket
export const updateBasketInLocalStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};
export const calculateBasketPrice = () => {
  const basket = getBasketFromLocalStorage();
  let totalPrice = 0;
  basket.forEach((basketItem) => {
    const productPrice = basketItem.item.saleInfo.listPrice.amount;
    const quantity = basketItem.quantity;
    totalPrice += productPrice * quantity;
  });
  return totalPrice.toFixed(2);
};
export const renderBasketItem = () => {
  const basketContainer = document.querySelector(".add-cart-li"); // Sepet öğelerini ekleyeceğimiz <ul> container
  // Eğer .add-cart-li öğesi yoksa, fonksiyon çalışmasın
  if (!basketContainer) {
    console.error("Basket container not found");
    return;
  }

  basketContainer.innerText = "";
  const basket = getBasketFromLocalStorage(); // Sepeti localStorage'dan alıyoruz

  if (basket.length < 1) {
    const p = document.createElement("p");
    p.innerText = "No product in the basket.";
    basketContainer.append(p);

    // Sepet boşken özel bir sınıf ekleyin
    basketContainer.classList.add("basket-empty");
  } else {
    // Eğer sepet doluysa, sınıfı kaldırın
    basketContainer.classList.remove("basket-empty");
  }

  // Sepetteki her öğe için işlem yapıyoruz
  basket.forEach((basketItem) => {
    const { item, quantity, id } = basketItem; // item bilgileri ve quantity
    const { title, authors, imageLinks } = item.volumeInfo; // Ürün bilgileri
    const productPrice = item.saleInfo.listPrice.amount; //fiyat bilgisi

    // Sepet öğesini HTML'ye eklemek için yeni bir <li> oluşturuyoruz
    const basketItemLi = document.createElement("li");
    basketItemLi.classList.add("basket-item");

    // Sepet öğesinin içeriğini HTML olarak ekliyoruz
    basketItemLi.innerHTML = `
    <img src="${imageLinks.smallThumbnail}" alt="${title}" width="50">
    <div class="basket-title-authors">
      <h3>${title}</h3>
      <p>${authors[0]}</p>
    </div>
    <div>
      <p class="increase-decrease-buttons">
        <span><button class="decrease" data-id="${item.id}">-</button></span>
        ${quantity}
        <span><button class="increase" data-id="${item.id}">+</button></span>
      </p>
      <p>${(productPrice * quantity).toFixed(2)} TRY</p>
    </div>
  `;

    // Sepet öğesini <ul> container'a ekliyoruz
    basketContainer.appendChild(basketItemLi);
  });

  // "-" ve "+" butonlarına click event ekleme
  const decreaseButtons = document.querySelectorAll(".decrease");
  const increaseButtons = document.querySelectorAll(".increase");

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      let basket = getBasketFromLocalStorage();

      // Quantity azalt ve ürün miktarı 1 ise ürünü kaldır
      basket = basket.filter((basketItem) => {
        if (basketItem.item.id === itemId) {
          if (basketItem.quantity > 1) {
            basketItem.quantity -= 1; // Miktarı azalt
            return true; // Ürünü sepette tut
          } else {
            return false; // Ürün miktarı 1 ise kaldır
          }
        }
        return true; // Diğer ürünler sepette kalmaya devam etsin
      });

      // Güncellenmiş sepeti kaydet ve yeniden render et
      updateBasketInLocalStorage(basket);
      renderBasketItem();
    });
  });

  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      const basket = getBasketFromLocalStorage();

      // Quantity'yi artır
      const updatedBasket = basket.map((basketItem) => {
        if (basketItem.item.id === itemId) {
          basketItem.quantity += 1;
        }
        return basketItem;
      });

      // Güncellenmiş sepeti kaydet ve yeniden render et
      updateBasketInLocalStorage(updatedBasket);
      renderBasketItem();
    });
  });

  // Toplam tutarı hesapla ve ilgili alanda göster
  const totalAmountSpan = document.querySelector(".total-amount-span");
  const totalAmount = calculateBasketPrice(); // Sepet fiyatını hesaplayın
  totalAmountSpan.textContent = `${totalAmount} TRY`;
};

document.addEventListener("DOMContentLoaded", (e) => {
  renderBasketItem();
});
