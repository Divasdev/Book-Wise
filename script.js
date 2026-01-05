const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".Search")
const resultsContainer = document.getElementById("books-grid")
const searchingImg = document.querySelector(".searching");
const resultsCount = document.getElementById("results-count");
function searchBook() {
   resultsCount.textContent = "";
   const bookName = searchInput.value.trim();
   if (!bookName) {
      alert("add a valid book name");
      return;
   }

   searchingImg.style.display = "block";
   fetchBooks(bookName)
}
searchBtn.addEventListener("click", (event) => {
   searchBook();
});

searchInput.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
      searchBook();
   }
})



async function fetchBooks(query) {


   const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
   const data = await response.json();


   console.log(data.items);
   if(resultsCount){
      resultsCount.textContent=`About${data.totalItems.toLocaleString()}`
   }


   renderBooks(data.items)
}

function renderBooks(books) {
   resultsContainer.innerHTML = "";


   if (!books || books.length === 0) {
      resultsContainer.innerHTML = "<p>No results found</p>";
      return;
   }

   if (searchingImg) {
      searchingImg.style.display = "none";
   }
   books.forEach(book => {
      const info = book.volumeInfo;
      const sale = book.saleInfo;

      const title = info.title || "No title";
      const authors = info.authors ? info.authors.join(", ") : "Unknown author";
      const publisher = info.publisher || "Unknown publisher";
      const image = info.imageLinks?.thumbnail || "assets/images/no-book.png";

      const price = sale.listPrice
         ? `₹ ${sale.listPrice.amount}`
         : "Not for sale";

      const card = `
         <div class="book-card">
        <img src="${image}" alt="${title}" class="book-img">
        <div class="book-info">
          <h3 class="book-title">${title}</h3>
          <p class="book-author">${authors}</p>
          <p class="book-publisher">${publisher}</p>
          <p class="book-price">${price}</p>
          <a href="book.html?id=${book.id}" class="more-btn">More→</a>

        </div>
      </div>
    `;

      resultsContainer.innerHTML += card;




   });
}
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});



