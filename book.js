// 1. Read book ID from URL
const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

const summarySection = document.querySelector(".book-summary");
const descriptionSection = document.querySelector(".book-description");

// Safety check
if (!bookId) {
  summarySection.innerHTML = "<p>Invalid book link.</p>";
  throw new Error("Book ID missing in URL");
}

// 2. Fetch single book details
async function fetchBookDetails(id) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }

    const data = await response.json();
    renderBookDetails(data);

  } catch (error) {
    summarySection.innerHTML = "<p>Failed to load book details.</p>";
    console.error(error);
  }
}

// 3. Render book data
function renderBookDetails(book) {
  const info = book.volumeInfo;
  const sale = book.saleInfo || {};

  const title = info.title || "No title available";
  const authors = info.authors ? info.authors.join(", ") : "Unknown author";
  const publisher = info.publisher || "Unknown publisher";
  const publishedDate = info.publishedDate || "N/A";
  const pageCount = info.pageCount || "N/A";

  const image =
    info.imageLinks?.thumbnail ||
    "assets/images/no-book.png";

  const description =
    info.description || "<p>No description available.</p>";

  const buyLink = sale.buyLink;
  const previewLink = info.previewLink;

  // Left card (summary)
  summarySection.innerHTML = `
    <img src="${image}" alt="${title}" class="book-img">

    <h2 class="book-title">${title}</h2>
    <p class="book-author"><strong>Author:</strong> ${authors}</p>
    <p class="book-publisher"><strong>Publisher:</strong> ${publisher}</p>
    <p class="book-date"><strong>Published:</strong> ${publishedDate}</p>
    <p class="book-pages"><strong>Pages:</strong> ${pageCount}</p>

    ${
      buyLink
        ? `<a href="${buyLink}" target="_blank" class="buy-btn">Buy this book</a>`
        : ""
    }
  `;

  // Right card (description)
  descriptionSection.innerHTML = `
    <h3>Description</h3>
    <div class="description-text">
      ${description}
    </div>

    ${
      previewLink
        ? `<a href="${previewLink}" target="_blank" class="preview-btn">
             Read Preview
           </a>`
        : ""
    }
  `;
}

// 4. Start the process
fetchBookDetails(bookId);