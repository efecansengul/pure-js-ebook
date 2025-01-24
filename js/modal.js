import { Products } from "./data.js";
import { addBasket } from "./basket.js";

const dataProducts = document.querySelectorAll("[data-product-id]");
const modal = document.querySelector(".modal");
const inputSearch = document.querySelector(".input-search");
const searchResults = document.querySelector(".search-results");

inputSearch.addEventListener("input", (e) => {
  const query = e.target.value.toLocaleLowerCase();

  searchResults.innerHTML = "";
  searchResults.style.display = "none";
  if (query === "") {
    return; // Eğer kullanıcı bir şey yazmazsa arama yapılmasın
  }
  // Arama: Title içinde eşleşen ürünleri bul
  const filteredItems = Products.items.filter((item) =>
    item.volumeInfo.title.toLocaleLowerCase().includes(query)
  );
  if (filteredItems.length > 0) {
    searchResults.style.display = "block";
    filteredItems.forEach((item) => {
      const searchdiv = document.createElement("div");
      searchdiv.setAttribute("data-product-id", item.id);
      searchdiv.classList.add("search-result-item");
      searchdiv.innerHTML = ` <img src="${item.volumeInfo.imageLinks.smallThumbnail}" width="20%"/>
        <span>${item.volumeInfo.title}</span>
      `;
      searchResults.append(searchdiv);
      searchdiv.addEventListener("click", (e) => {
        inputSearch.value = "";
        const container = e.target.closest("[data-product-id]");
        const productId = container.getAttribute("data-product-id");
        const product = Products.items.find((item) => item.id === productId);
        modal.innerHTML = `<div class="modal-container">
    <div>
    <button class="exit-modal"><i class="fa-solid fa-xmark"></i></button>
    <img src="${product.volumeInfo.imageLinks.smallThumbnail} width="100%"/></div>
    <div class="modal-description">
    <h3>${product.volumeInfo.title}</h3>
    <p>${product.volumeInfo.authors}</p>
    <p>${product.volumeInfo.description}</p>
    <div class="modal-price">
    <h3>${product.saleInfo.listPrice.amount}TRY</h3>
    <button class="add-item-modal" type="button">Add To Cart</button>
    </div>
    </div>
    </div>`;
        let addItemModal = document.querySelector(".add-item-modal");
        searchResults.style.display = "none";

        const exitModal = document.querySelector(".exit-modal");
        const layer = document.querySelector(".layer");
        modal.classList.add("show");
        layer.style.display = "block";
        exitModal.addEventListener("click", (e) => {
          modal.classList.remove("show");
          layer.style.display = "none";
          inputSearch.focus();
        });
        layer.addEventListener("click", () => {
          modal.classList.remove("show");
          layer.style.display = "none";
        });
        // "Add to Cart" butonuna tıklama işlemi
        addItemModal.addEventListener("click", () => {
          addBasket(productId, product);
        });
      });
    });
  } else {
    searchResults.style.display = "none";
  }
});

dataProducts.forEach((data) => {
  data.addEventListener("click", (e) => {
    modal.innerHTML = "";
    // Eğer "Add" butonuna tıklanmışsa modal açma işlemini durdur
    if (e.target.classList.contains("add-to-cart")) {
      console.log("Add butonuna tıklandı, modal açılmıyor.");
      return; // Modal açılmasın
    }
    const container = e.target.closest("[data-product-id]");
    const productId = container.getAttribute("data-product-id");
    const product = Products.items.find((item) => item.id === productId);
    modal.innerHTML = `<div class="modal-container">
    <div>
    <button class="exit-modal"><i class="fa-solid fa-xmark"></i></button>
    <img src="${product.volumeInfo.imageLinks.smallThumbnail} width="100%"/></div>
    <div class="modal-description">
    <h3>${product.volumeInfo.title}</h3>
    <p>${product.volumeInfo.authors}</p>
    <p>${product.volumeInfo.description}</p>
    <div class="modal-price">
    <h3>${product.saleInfo.listPrice.amount}TRY</h3>
    <button class="add-item-modal" type="button">Add To Cart</button>
    </div>
    </div>
    </div>`;
    let addItemModal = document.querySelector(".add-item-modal");

    const exitModal = document.querySelector(".exit-modal");
    const layer = document.querySelector(".layer");
    modal.classList.add("show");
    layer.style.display = "block";
    exitModal.addEventListener("click", (e) => {
      modal.classList.remove("show");
      layer.style.display = "none";
    });
    // "Add to Cart" butonuna tıklama işlemi
    addItemModal.addEventListener("click", () => {
      addBasket(productId, product);
    });
  });
});
