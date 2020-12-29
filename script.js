"use strict";
const bookshelf = document.querySelector(".bookshelf");
const options = document.querySelector(".options-container");

const titleInput = document.getElementById("form-title");
const authorInput = document.getElementById("form-author");
const pageInput = document.getElementById("form-pages");
const tagsInput = document.getElementById("form-tags");
const statusInput = document.getElementById("form-status");
const addBtn = document.querySelector(".add-btn");

const searchBox = document.getElementById("search");
const searchDropdown = document.getElementById("search-type");
const sortDropdown = document.getElementById("sort-dropdown");
const statusDropdown = document.getElementById("status-filter");
const themeSelect = document.getElementById("theme-dropdown");

let myLibrary = [];
let uniqueId = 1;

function Book(title, author, pages, tags, status) {
  this.title = titleInput.value,
  this.author = authorInput.value,
  this.pages = pageInput.value,
  this.tags = tagsInput.value.toLowerCase().replace(/(\s,\s|,\s|\s,|,)/g, ",").split(","),
  this.read = statusInput.checked,
  this.id = uniqueId;
}

function addToLibrary() {
  let newBook = new Book();
  uniqueId++;
  myLibrary.unshift(newBook);
}

function addToBookshelf(indexA, indexB) {
  const bookDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const footerDiv = document.createElement("div");
  const pagesDiv = document.createElement("div");
  const editButton = document.createElement("button");
  const editIcon = document.createElement("i");
  const statusButton = document.createElement("button");
  const deleteIcon = document.createElement("i");
  const deleteButton = document.createElement("button");
  const tagsDiv = document.createElement("div");

  bookDiv.classList.add("book");
  bookDiv.setAttribute("data-id", myLibrary[indexA].id);

  titleDiv.classList.add("book-title");
  titleDiv.textContent = myLibrary[indexA].title;
  bookDiv.appendChild(titleDiv);

  authorDiv.classList.add("book-author");
  if (myLibrary[indexA].author === "") {
    authorDiv.textContent = "";
  } else {
    authorDiv.textContent = "by " + myLibrary[indexA].author;
  }
  bookDiv.appendChild(authorDiv);

  tagsDiv.classList.add("tags");
  tagsDiv.textContent = myLibrary[indexA].tags;
  tagsDiv.style.display = "none";
  bookDiv.appendChild(tagsDiv);

  footerDiv.classList.add("book-footer");

  pagesDiv.classList.add("book-pages");
  if (myLibrary[indexA].pages === "") {
    pagesDiv.textContent = "";
  } else {
    pagesDiv.textContent = myLibrary[indexA].pages + " pages";
  }
  footerDiv.appendChild(pagesDiv);

  editButton.classList.add("edit-book", "btn");
  editButton.setAttribute("type", "button");
  editIcon.classList.add("material-icons", "edit-icon");
  editIcon.setAttribute("title", "Edit book");
  editIcon.textContent = "edit";
  editIcon.setAttribute("data-id", myLibrary[indexA].id);
  editButton.appendChild(editIcon);
  footerDiv.appendChild(editButton);

  statusButton.classList.add("book-status", "btn");
  statusButton.setAttribute("type", "button");
  statusButton.setAttribute("data-id", myLibrary[indexA].id);
  if (myLibrary[indexA].read) {
    statusButton.textContent = "read";
    statusButton.style.backgroundColor = "var(--read-book)";
  } else {
    statusButton.textContent = "unread";
    statusButton.style.backgroundColor = "var(--unread-book)";
  }
  footerDiv.appendChild(statusButton);

  deleteButton.classList.add("delete-book", "btn");
  deleteButton.setAttribute("type", "button");
  deleteIcon.classList.add("material-icons", "delete-icon");
  deleteIcon.setAttribute("title", "Delete book");
  deleteIcon.textContent = "delete";
  deleteIcon.setAttribute("data-id", myLibrary[indexA].id);
  deleteButton.appendChild(deleteIcon);
  footerDiv.appendChild(deleteButton);

  bookDiv.appendChild(footerDiv);
  bookshelf.insertBefore(bookDiv, bookshelf.children[indexB]);
}

// find and store the myLibrary index of the book whose edit/read status/delete button is clicked
function findLibraryIndex(e) {
  myLibrary.forEach((item, index) => {
    if (item.id === parseInt(e.target.dataset.id)) {
      addBtn.dataset.libraryIndex = index;
    }
  });
  addBtn.dataset.uniqueId = e.target.dataset.id;
}

// find and store the bookshelf index of the book being updated
function findBookshelfIndex() {
  Array.from(bookshelf.children).forEach((item, index) => {
    if (item.dataset.id === addBtn.dataset.uniqueId) {
      addBtn.dataset.bookshelfIndex = index;
    }
  });
}

function pullBookInfo() {
  let libraryIndex = parseInt(addBtn.dataset.libraryIndex);

  titleInput.value = myLibrary[libraryIndex].title;
  authorInput.value = myLibrary[libraryIndex].author;
  pageInput.value = parseInt(myLibrary[libraryIndex].pages);
  tagsInput.value = myLibrary[libraryIndex].tags.toString();
  statusInput.checked = myLibrary[libraryIndex].read;
}

function updateBook() {
  let bookshelfIndex = parseInt(addBtn.dataset.bookshelfIndex);
  let libraryIndex = parseInt(addBtn.dataset.libraryIndex);

  myLibrary[libraryIndex].title = titleInput.value;
  myLibrary[libraryIndex].author = authorInput.value;
  myLibrary[libraryIndex].tags = tagsInput.value.replace(/\s,\s|,\s|\s,|,/g, ",").split(",");
  myLibrary[libraryIndex].pages = pageInput.value;
  myLibrary[libraryIndex].read = statusInput.checked;

  addToBookshelf(libraryIndex, bookshelfIndex);
  bookshelf.removeChild(bookshelf.children[bookshelfIndex + 1]);

  /* --remove below code if above updates correctly--
 bookshelf.children[bookshelfIndex].children[0].textContent = titleInput.value;
  myLibrary[libraryIndex].title = titleInput.value;

  bookshelf.children[bookshelfIndex].children[1].textContent = authorInput.value;
  myLibrary[libraryIndex].author = authorInput.value;

  bookshelf.children[bookshelfIndex].children[2].textContent = tagsInput.value;
  myLibrary[libraryIndex].tags = tagsInput.value.replace(/,\s/g, ",").split(",");

  if (pageInput.value === "") {
    bookshelf.children[bookshelfIndex].children[3].children[0].textContent = pageInput.value;
  } else {
    bookshelf.children[bookshelfIndex].children[3].children[0].textContent = pageInput.value + " pages";
  }
  myLibrary[libraryIndex].pages = pageInput.value + " pages";

  bookshelf.children[bookshelfIndex].children[3].children[2].textContent = statusInput.value;
  myLibrary[libraryIndex].status = statusInput.value;
  if (statusInput.value === "read") {
    bookshelf.children[bookshelfIndex].children[3].children[2].style.backgroundColor = "var(--read-book)";
  } else if (statusInput.value === "unread") {
    bookshelf.children[bookshelfIndex].children[3].children[2].style.backgroundColor = "var(--unread-book)";
  }
  */
}

function deleteBook(e) {
  let bookshelfIndex = parseInt(addBtn.dataset.bookshelfIndex);
  let libraryIndex = parseInt(addBtn.dataset.libraryIndex);
  bookshelf.removeChild(bookshelf.children[bookshelfIndex]);
  myLibrary.splice(libraryIndex, 1);
}

function updateStatus(e) {
  let libraryIndex = parseInt(addBtn.dataset.libraryIndex);
  if (e.target.textContent === "read") {
    e.target.textContent = "unread";
    e.target.style.backgroundColor = "var(--unread-book)";
    myLibrary[libraryIndex].read = false;
  } else if (e.target.textContent === "unread") {
    e.target.textContent = "read";
    e.target.style.backgroundColor = "var(--read-book)";
    myLibrary[libraryIndex].read = true;
  }
}

function clearDatasets() {
  addBtn.dataset.libraryIndex = "";
  addBtn.dataset.bookshelfIndex = "";
  addBtn.dataset.uniqueId = "";
}


function toggleTheme() {
  if (themeSelect.value === "dark") {
    document.body.className = "theme-dark";
  } else if (themeSelect.value === "light") {
    document.body.className = "theme-light";
  }
}

// Always show options on large viewports, or create toggle for small viewports
function toggleOptions(e) {
  if (e.type === "resize") {
    if (document.body.scrollWidth < 650) {
      options.style.display = "";
      document.querySelector(".arrow").textContent = "arrow_drop_down";
    } else {
      options.style.display = "flex";
    }
  } else {
    if (options.style.display === "") {
      options.style.display = "flex";
      document.querySelector(".arrow").textContent = "arrow_drop_up";
    } else {
      options.style.display = "";
      document.querySelector(".arrow").textContent = "arrow_drop_down";
    }
  }
}

function displayModal(e) {
  if (e.target.className.includes("new-btn")) {
    document.querySelector(".modal-container").style.display = "block";
    document.querySelector(".modal-description").textContent = "Add a Book";
    addBtn.textContent = "Add";
  } else if (e.target.parentElement.className.includes("edit-book")) {
    document.querySelector(".modal-container").style.display = "block";
    document.querySelector(".modal-description").textContent = "Update a Book";
    addBtn.textContent = "Update";
  }
  titleInput.focus();
}

function resetOptions() {
  searchBox.value = "";
  searchDropdown.value = "title";
  statusDropdown.value = "all"
  sortDropdown.value = "newest";
}

function toggleScrollBtn() {
  let resetBtn = document.querySelector(".reset-btn");
  if (document.body.scrollWidth < 650 && window.pageYOffset > bookshelf.offsetTop || 
    document.body.scrollWidth > 650 && window.pageYOffset > (resetBtn.offsetTop + 50)) {
    document.querySelector(".scroll-btn").style.display = "block";
  } else {
    document.querySelector(".scroll-btn").style.display = "";
  }
}


function filterSearch() {
  const criteria = searchBox.value.toLowerCase();
  Array.from(bookshelf.children).forEach((item) => {
    if (searchDropdown.value === "title") {
      if (criteria.trim() === "" || item.children[0].textContent.toLowerCase().includes(criteria)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    } else if (searchDropdown.value === "author") {
      if (criteria.trim() === "" || item.children[1].textContent.toLowerCase().includes(criteria)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    } else if (searchDropdown.value === "tags") {
      let everyTag = criteria.replace(/(\s\+\s|\+\s|\s\+|\+)/g, "+").split("+");
      let someTags = criteria.replace(/(\s,\s|,\s|\s,|,)/g, ",").split(",");
      if (criteria.trim() === "") {
        item.style.display = "block";
      } else if (criteria.includes("+") || !criteria.includes(",") && !criteria.includes("+")) {
        if (everyTag.every(i => item.children[2].textContent.includes(i))) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      } else if (criteria.includes(",")) {
        if (someTags.some(i => item.children[2].textContent.includes(i))) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }
    }
  });
}


function filterStatus() {
  Array.from(bookshelf.children).forEach((item) => {
    if (statusDropdown.value === "all") {
      item.style.display = "block";
    } else if (item.children[3].children[2].textContent === statusDropdown.value) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function sortLibrary() {
  let sortOption = sortDropdown.selectedIndex;
  let i;
  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.firstChild);
  };
  switch(sortOption) {
    case 0:
      myLibrary.sort((a, b) => {
        return b.id - a.id;
      })
      for (i = 0; i < myLibrary.length; i++) {
        addToBookshelf(i);
      }
      break;
    case 1:
      myLibrary.sort((a, b) => {
        return a.id - b.id;
      })
      for (i = 0; i < myLibrary.length; i++) {
        addToBookshelf(i);
      }
      break;
    case 2:
      myLibrary.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        } else {
          return 0;
        }
      })
      for (i = 0; i < myLibrary.length; i++) {
        addToBookshelf(i);
      }
      break;
    case 3:
      myLibrary.sort((a, b) => {
        if (b.title < a.title) {
          return -1;
        } else if (b.title > a.title) {
          return 1;
        } else {
          return 0;
        }
      })
      for (i = 0; i < myLibrary.length; i++) {
        addToBookshelf(i);
      }
      break;
    case 4:
      myLibrary.sort((a, b) => {
        if (a.author < b.author) {
          return -1;
        } else if (a.author > b.author) {
          return 1;
        } else {
          return 0;
        }
      })
      for (i = 0; i < myLibrary.length; i++) {
        addToBookshelf(i);
      }
      break;
    case 5:
      myLibrary.sort((a, b) => {
        if (b.author < a.author) {
          return -1;
        } else if (b.author > a.author) {
          return 1;
        } else {
          return 0;
        }
      })
      for (i = 0; i < myLibrary.length; i++) {
        addToBookshelf(i);
      }
      break;
  }
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pageInput.value = "";
  tagsInput.value = "";
  statusInput.checked = false;
}

function updateTotals() {
  let x = 0;
  document.querySelector(".total-amount").textContent = myLibrary.length;
  myLibrary.forEach((item) => {
    if (item.read === true) {
      x++;
    }
  })
  document.querySelector(".read-amount").textContent = x;
  document.querySelector(".unread-amount").textContent = myLibrary.length - x;
}

function setStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
  if (myLibrary.length === 0) {
    uniqueId = 1;
  }
  localStorage.setItem("uniqueId", uniqueId);
  localStorage.setItem("theme", themeSelect.value)
}

function getStorage() {
  myLibrary = JSON.parse(localStorage.getItem("library"));
  sortLibrary();
  uniqueId = parseInt(localStorage.getItem("uniqueId"));
  themeSelect.value = localStorage.getItem("theme");
  toggleTheme();


  /*
  if (!localStorage.getItem("uniqueId")) {
    uniqueId = 1;
  } else {
    uniqueId = localStorage.getItem("uniqueId");
  }
  themeSelect.value = localStorage.getItem("theme");
  toggleTheme();
  */
}


window.addEventListener("load", () => {
  if (document.documentElement.scrollWidth >= 650) {
    options.style.display = "flex";
  };
  resetOptions();
  if (localStorage.length === 0) {
    themeSelect.value = "dark";
    toggleTheme();
  } else {
    getStorage();
  }
  updateTotals();
  clearForm();
})

window.addEventListener("scroll", toggleScrollBtn)

window.addEventListener("resize", (e) => {
  toggleOptions(e);
})
document.querySelector(".options-toggle").addEventListener("click", toggleOptions)

themeSelect.addEventListener("change", () => {
  toggleTheme();
  setStorage();
})

document.querySelector(".reset-btn").addEventListener("click", () => {
  resetOptions();
  filterSearch();
  filterStatus();
  sortLibrary();
})

document.querySelector(".scroll-btn").addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
})

document.querySelector(".new-btn").addEventListener("click", (e) => {
  displayModal(e);
})

document.querySelector(".modal-container").addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "none";
  clearForm();
  clearDatasets();
  titleInput.classList.remove("invalid");
  titleInput.removeAttribute("placeholder");
})
document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "none";
  clearForm();
  clearDatasets();
  titleInput.classList.remove("invalid");
  titleInput.removeAttribute("placeholder");
})
document.querySelector(".add-modal").addEventListener("click", (e) => {
  e.stopPropagation();
})

addBtn.addEventListener("click", (e) => {
  if(addBtn.textContent === "Add") {
    if (titleInput.value.trim() === "") {
      titleInput.value = "";
      titleInput.focus();
      titleInput.classList.add("invalid");
      titleInput.setAttribute("placeholder", "a book title is required");
      return;
    };
    addToLibrary();
    sortLibrary();
    clearForm();
    titleInput.focus();
    updateTotals();
    setStorage();
  } else if (addBtn.textContent === "Update") {
    findBookshelfIndex();
    updateBook();
    updateStatus(e);
    clearForm();
    clearDatasets();
    updateTotals();
    setStorage();
  }
})
titleInput.addEventListener("keyup", () => {
  if (titleInput.value.match(/./)) {
    titleInput.classList.remove("invalid");
    titleInput.removeAttribute("placeholder");
  }
})

searchBox.addEventListener("keyup", filterSearch)
searchDropdown.addEventListener("change", filterSearch)

statusDropdown.addEventListener("change", filterStatus)

sortDropdown.addEventListener("change", sortLibrary)

bookshelf.addEventListener("click", (e) => {
  if (e.target.className.includes("book-status") && e.target.matches("button")) {
    findLibraryIndex(e);
    updateStatus(e);
    clearDatasets();
    updateTotals();
    setStorage();
  } else if (e.target.textContent === "edit") {
    displayModal(e);
    findLibraryIndex(e);
    pullBookInfo();
  } else if (e.target.textContent === "delete") {
    findLibraryIndex(e);
    findBookshelfIndex(e);
    deleteBook(e);
    clearDatasets();
    updateTotals();
    setStorage();
  }
})

