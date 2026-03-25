class Book {
  static #library = [];
  constructor(title, author, pages, ifRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.ifRead = ifRead;

    Book.#library.push(this);
  }
  static get allbooks() {
    return Book.#library;
  }
  static updateLibrary(newList) {
    Book.#library = newList;
  }
  get readStatus() {
    return this.ifRead;
  }
}

class Display {
  static #gridContainer = document.querySelector(".Grid-container");

  static clear() {
    Display.#gridContainer.innerHTML = "";
  }
  static get grid() {
    return this.#gridContainer;
  }

  static render() {
    const books = Book.allbooks;
    Display.clear();
    books.forEach(({ id, title, author, pages, ifRead }) => {
      const card = document.createElement("div");
      card.classList.add("book-card");
      card.dataset.id = id;
      card.innerHTML = `
      <h3 class="book-title"></h3>
      <p class="book-id"></p>
      <p class="book-Author"></p>
      <p><span class="book-pages"></span></p>
      <p class="ifRead"></p>
      <div class="card-buttons">
       <button class="delete-button">Delete</button>
       <button class="toggle-button">Status</button>
      </div>
    `;
      card.querySelector(".book-title").textContent = title;
      card.querySelector(".book-id").textContent = id;
      card.querySelector(".book-Author").textContent = author;
      card.querySelector(".book-pages").textContent = pages;
      card.querySelector(".ifRead").textContent = ifRead ? "Read" : "unread";

      Display.#gridContainer.appendChild(card);
    });
  }
}
class mainControl {
  static subControl() {
    Display.grid.addEventListener("click", (e) => {
      const card = e.target.closest(".book-card");
      if (!card) return;

      const id = card.dataset.id;
      if (e.target.classList.contains("delete-button")) {
        mainControl.removeBook(id);
      } else if (e.target.classList.contains("toggle-button")) {
        mainControl.toogleRead(id);
      }
    });
  }

  static removeBook(id) {
    const filteredList = Book.allbooks.filter((book) => book.id !== id);
    Book.updateLibrary(filteredList);
    Display.render();
  }
  static toogleRead(id) {
    const book = Book.allbooks.find((b) => b.id === id);

    if (book) {
      book.ifRead = !book.ifRead;
      Display.render();
    }
  }
}
class FormDialog {
  static #form = document.querySelector("#book-form");
  static #dialog = document.querySelector("#book-dialog");
  static formControl() {
    FormDialog.#form.addEventListener("submit", (e) => {
      e.preventDefault();
      FormDialog.submit();
    });
  }

  static open() {
    const openButton = document.querySelector(".open-button");
    openButton.addEventListener("click", () => {
      FormDialog.#dialog.showModal();
    });
  }
  static close() {
    FormDialog.#dialog.close();
    FormDialog.#form.reset();
  }

  static submit() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const ifRead = document.querySelector("#ifRead").checked;
    new Book(title, author, pages, ifRead);

    Display.render();
    FormDialog.close();
  }
  static formButtonControl() {
    const formButtons = document.querySelector(".form-buttons");
    formButtons.addEventListener("click", (e) => {
      if (e.target.classList.contains("cancel-btn")) {
        FormDialog.close();
      }
    });
  }
}

// practice books
const book1 = new Book("Return", "Prince Onah", 469, true);

const book2 = new Book("Imagine", "Prince Onah", 678, false);

const book3 = new Book("Dream", "Prince Onah", 57, false);

const book4 = new Book("Manage", "Prince Onah", 78, true);
Display.render();
mainControl.subControl();
FormDialog.open();
FormDialog.formButtonControl();
FormDialog.formControl();
