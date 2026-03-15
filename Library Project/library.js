const formButton = document.querySelector(".form-button");
const dialog = document.querySelector("dialog");
const form = document.querySelector(".form");
const submitButton = document.querySelector(".submit-button");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const tableBody = document.querySelector("tbody");

let library = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("you must input new operator");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.checkIfRead = function () {
    if (this.read === true) {
      return `${this.title} has been read`;
    } else {
      return `${this.title} has not been read`;
    }
  };
}
function storeBook(newBook) {
  library.push(newBook);
  return library;
}
function renderBooks() {
  for (const book of library) {
    const tableRow = document.createElement("tr");
    const tableId = document.createElement("td");
    const tableTitle = document.createElement("td");
    const tableAuthor = document.createElement("td");
    const tablePages = document.createElement("td");
    const tableRead = document.createElement("td");
    const tableAction = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.dataset.id = book.id;
    deleteButton.addEventListener("click", (e) => {
      const bookID = e.currentTarget.dataset.id;
      deleteBook(bookID);
      clearTable();
      renderBooks();
    });
    tableId.textContent = book.id;
    tableTitle.textContent = book.title;
    tableAuthor.textContent = book.author;
    tablePages.textContent = book.pages;
    tableRead.textContent = book.read;
    deleteButton.textContent = "Delete";
    tableRow.appendChild(tableId);
    tableRow.appendChild(tableTitle);
    tableRow.appendChild(tableAuthor);
    tableRow.appendChild(tablePages);
    tableRow.appendChild(tableRead);
    tableAction.appendChild(deleteButton);
    tableRow.appendChild(tableAction);

    tableBody.appendChild(tableRow);
  }
}
function deleteBook(bookid) {
  library = library.filter((book) => book.id !== bookid);
  return library;
}
function displayForm() {
  dialog.show();
}
function createFromForm() {
  const newFormBook = new Book(
    title.value,
    author.value,
    +pages.value,
    read.checked,
  );
  return newFormBook;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = createFromForm();
  storeBook(newBook);
  clearTable();
  renderBooks();
});
function clearTable() {
  tableBody.innerHTML = "";
}
formButton.addEventListener("click", () => {
  displayForm();
});
submitButton.addEventListener("click", () => {
  dialog.close();
});

// practice books
const book1 = new Book("Return", "Prince Onah", 469, true);
storeBook(book1);
book1.checkIfRead();
const book2 = new Book("Imagine", "Prince Onah", 678, false);
storeBook(book2);
book2.checkIfRead();
const book3 = new Book("Dream", "Prince Onah", 57, false);
storeBook(book3);
book3.checkIfRead();
const book4 = new Book("Manage", "Prince Onah", 78, true);
storeBook(book4);
book4.checkIfRead();
renderBooks();
