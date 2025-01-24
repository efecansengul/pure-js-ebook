import { Products } from "./data.js";

const productsWrapper = document.querySelector(".products-wrapper");
const headerNewAddItem = document.querySelector(".header-add-element");
const modal = document.querySelector(".modal");
const product = document.querySelector("#products");
const computer = document.querySelector(".computer");

computer.addEventListener("click", (e) => {
  product.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

headerNewAddItem.addEventListener("click", (e) => {
  modal.innerHTML = "";

  modal.innerHTML = `<div class="modal-container">
  <div class="your-photo">
  <button class="exit-modal"><i class="fa-solid fa-xmark"></i></button>
  <input id="image-file" type="file" />
  </div>
  <div class="your-book-description">
  <input id="book-name" type="text" placeholder="Enter book name"/>
  <input id="book-authors" type="text" placeholder="Enter the book author name"/>
  <input id="book-description" type="text" placeholder="Enter the book description"/>
  <input id="book-price" type="number" placeholder="Enter the book price"/>
  <button class="addList" type="button">Add To Cart</button>
  </div>
</div>`;
  const addList = document.querySelector(".addList");
  const exitModal = document.querySelector(".exit-modal");
  const layer = document.querySelector(".layer");
  modal.classList.add("show");
  layer.style.display = "block";
  exitModal.addEventListener("click", (e) => {
    modal.classList.remove("show");
    layer.style.display = "none";
  });

  // Kullanıcıdan gelen verilerle yeni kitap ekleme
  addList.addEventListener("click", () => {
    // Kullanıcıdan alınan bilgileri seçiyoruz
    const bookName = document.getElementById("book-name").value;
    const bookAuthors = document
      .getElementById("book-authors")
      .value.split(","); // Virgülle ayırarak bir dizi oluştur
    const bookDescription = document.getElementById("book-description").value;
    const bookPrice = parseFloat(document.getElementById("book-price").value);
    const bookImage = document.getElementById("image-file").files[0]; // Seçilen dosya

    if (!bookName || !bookAuthors || !bookDescription || isNaN(bookPrice)) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    // Eğer bir resim yüklenmişse URL oluştur
    let imageUrl = "";
    if (bookImage) {
      imageUrl = URL.createObjectURL(bookImage); // Tarayıcıda resim URL'si oluştur
    }

    // createBookDiv fonksiyonuna kullanıcı verilerini gönder
    createBookDiv({
      id: `id-${Date.now()}`, // Rastgele bir ID oluştur
      smallThumbnail: imageUrl || "default-thumbnail.jpg", // Eğer resim yüklenmemişse varsayılan bir resim
      title: bookName,
      authors: bookAuthors,
      amount: { amount: bookPrice },
    });

    // Modal'ı kapat ve temizle
    modal.classList.remove("show");
    layer.style.display = "none";
  });
});

const createBookDiv = ({ id, smallThumbnail, title, authors, amount }) => {
  const bookDiv = document.createElement("div");

  bookDiv.innerHTML = `
  <div data-product-id = ${id}>
  <div class="product-cart-image">
  <img src="${smallThumbnail}" alt=${title} width="50%"/>
  </div>
    <div class="product-cart-description">
      <div class="product-cart-title-authours">
      <p>${title}</p>
      ${authors[0]}</div>
      <div class="product-cart-amount">
      ${amount.amount} TRY
      <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>Add</button>
      </div>
    </div>`;
  productsWrapper.prepend(bookDiv);
};

//sayfa yüklendiginde basılacak 10 kitap
const fillBookRow = (items) => {
  const {
    authors,
    description,
    imageLinks: { smallThumbnail },
    title,
  } = items.volumeInfo;
  const id = items.id;
  const amount = items.saleInfo.listPrice;

  createBookDiv({ id, smallThumbnail, title, authors, amount });
  //modal koyabilirim;
};

//Baslangıcta calısacak
const initialRender = () => {
  Products.items.map((item) => fillBookRow(item));
};

initialRender();
