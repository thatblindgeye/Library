"use strict";
const addBtn = document.querySelector(".add-btn");

const bookshelf = document.querySelector(".bookshelf");
const options = document.querySelector(".options-container");

const titleInput = document.getElementById("form-title");
const authorInput = document.getElementById("form-author");
const pageInput = document.getElementById("form-pages");
const tagsInput = document.getElementById("form-tags");
const statusInput = document.getElementById("form-status");

const searchBox = document.getElementById("search");
const searchDropdown = document.getElementById("search-type");
const sortDropdown = document.getElementById("sort-dropdown");
const statusDropdown = document.getElementById("status-filter");
const themeSelect = document.getElementById("theme-dropdown");

let myLibrary = [];
let bookId = 1;
let idParam;

function Book(title, author, pages, tags, status) {
  this.title = titleInput.value,
  this.author = authorInput.value,
  this.pages = pageInput.value + " pages",
  this.tags = tagsInput.value.replace(/,\s/g, ",").split(","),
  this.status = statusInput.value
  this.id = bookId;
}

function addToArray() {
  let newBook = new Book();
  bookId++;
  myLibrary.unshift(newBook);
}

function addToBookshelf() {
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
  bookDiv.setAttribute("data-id", myLibrary[0].id); //may not need

  titleDiv.classList.add("book-title");
  titleDiv.textContent = myLibrary[0].title;
  titleDiv.setAttribute("data-id", myLibrary[0].id); //may not need
  bookDiv.appendChild(titleDiv);

  authorDiv.classList.add("book-author");
  authorDiv.textContent = myLibrary[0].author;
  authorDiv.setAttribute("data-id", myLibrary[0].id); //may not need
  bookDiv.appendChild(authorDiv);

  tagsDiv.classList.add("tags");
  tagsDiv.textContent = myLibrary[0].tags;
  tagsDiv.style.display = "none";
  bookDiv.appendChild(tagsDiv);

  footerDiv.classList.add("book-footer");
  footerDiv.setAttribute("data-id", myLibrary[0].id); //may not need

  pagesDiv.classList.add("book-pages");
  if (myLibrary[0].pages === " pages") {
    pagesDiv.textContent = "";
  } else {
    pagesDiv.textContent = myLibrary[0].pages;
  }
  pagesDiv.setAttribute("data-id", myLibrary[0].id); //may not need
  footerDiv.appendChild(pagesDiv);

  editButton.classList.add("edit-book", "btn");
  editButton.setAttribute("type", "button");
  editIcon.classList.add("material-icons");
  editIcon.setAttribute("title", "Edit book");
  editIcon.textContent = "edit";
  editIcon.setAttribute("data-id", myLibrary[0].id);
  editButton.appendChild(editIcon);
  footerDiv.appendChild(editButton);

  statusButton.classList.add("book-status", "btn");
  statusButton.setAttribute("type", "button");
  statusButton.textContent = myLibrary[0].status;
  statusButton.setAttribute("data-id", myLibrary[0].id);
  if (myLibrary[0].status === "read") {
    statusButton.style.backgroundColor = "var(--read-book)";
  } else if (myLibrary[0].status === "unread") {
    statusButton.style.backgroundColor = "var(--unread-book)";
  }
  footerDiv.appendChild(statusButton);

  deleteButton.classList.add("delete-book", "btn");
  deleteButton.setAttribute("type", "button");
  deleteIcon.classList.add("material-icons");
  deleteIcon.setAttribute("title", "Delete book");
  deleteIcon.textContent = "delete";
  deleteIcon.setAttribute("data-id", myLibrary[0].id);
  deleteButton.appendChild(deleteIcon);
  footerDiv.appendChild(deleteButton);

  bookDiv.appendChild(footerDiv);
  bookshelf.insertBefore(bookDiv, bookshelf.childNodes[0]);
}

/* 
  When you click the Edit button, open the modal and have the book info auto-populate into the fields
  When you click the Update button, have the book info in the library array and the visual book div update
*/
function findLibraryIndex(e) {
  myLibrary.forEach((item, index) => {
    if (item.id === parseInt(e.target.dataset.id)) {
      addBtn.dataset.libraryIndex = index;
    }
  });
  addBtn.dataset.idParam = e.target.dataset.id;
}

function findBookshelfIndex() {
  Array.from(bookshelf.children).forEach((item, index) => {
    if (item.dataset.id === addBtn.dataset.idParam) {
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
  statusInput.value = myLibrary[libraryIndex].status;
}

function updateBook() {
  let bookshelfIndex = parseInt(addBtn.dataset.bookshelfIndex);
  let libraryIndex = parseInt(addBtn.dataset.libraryIndex);
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
}

function deleteBook(e) {
  let deleteIndex = parseInt(addBtn.dataset.libraryIndex);
  bookshelf.removeChild(e.target.parentElement.parentElement.parentElement);
  myLibrary.splice(deleteIndex, 1);
}

function updateStatus(e) {
  let statusIndex = parseInt(addBtn.dataset.libraryIndex);
  if (e.target.textContent === "read") {
    e.target.textContent = "unread";
    e.target.style.backgroundColor = "var(--unread-book)";
    myLibrary[statusIndex].status = "unread";
  } else if (e.target.textContent === "unread") {
    e.target.textContent = "read";
    e.target.style.backgroundColor = "var(--read-book)";
    myLibrary[statusIndex].status = "read";
  }
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
    document.querySelector(".modal-description").textContent = "Edit a Book";
    addBtn.textContent = "Update";
  }
  titleInput.focus();
}

function resetOptions() {
  searchBox.value = "";
  searchDropdown.value = "title";
  statusDropdown.value = "all"
  sortDropdown.value = "added newest";
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



// separate title/author with tags, so that tags can be iterated over an array of tag props
function filterSearch() {
  let criteria = searchBox.value.toLowerCase();
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
      if (criteria.trim() === "" || item.children[2].textContent.toLowerCase().includes(criteria)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  });
}


function filterStatus() {
  Array.from(bookshelf.children).forEach((item) => {
    if (statusDropdown.value === "read") {
      if (item.children[3].children[2].textContent === "read") {
      item.style.display = "block";
      } else {
      item.style.display = "none";
      }
    } else if (statusDropdown.value === "unread") {
      if (item.children[3].children[2].textContent === "unread") {
      item.style.display = "block";
      } else {
      item.style.display = "none";
      }
    } else {
      item.style.display = "block";
    }
  });
}

function sortLibrary() {
  let sortArray = Array.from(bookshelf.children);
  let sortOption = sortDropdown.selectedIndex;

  sortArray.sort((a, b) => {
    return a - b;
  })
}
/*
Use myLibrary.forEach((item, index) => {
  if (item.filter === FIELD) {
    criteriaIndex = index;

  }
})

for searching an objects values
*/

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pageInput.value = "";
  tagsInput.value = "";
  statusInput.value = "default";
}


window.addEventListener("load", () => {
  toggleTheme();
  resetOptions();
  if (document.documentElement.scrollWidth >= 650) {
    options.style.display = "flex";
  }
})

window.addEventListener("scroll", toggleScrollBtn)

// Events for showing/hiding the Library Options
window.addEventListener("resize", (e) => {
  toggleOptions(e);
})
document.querySelector(".options-toggle").addEventListener("click", toggleOptions)



themeSelect.addEventListener("change", toggleTheme)



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
})
document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "none";
  clearForm();
})
document.querySelector(".add-modal").addEventListener("click", (e) => {
  e.stopPropagation();
})

addBtn.addEventListener("click", (e) => {
  if(addBtn.textContent === "Add") {
    if (statusInput.value === "default") return;
    addToArray();
    addToBookshelf();
    clearForm();
    titleInput.focus();
  } else if (addBtn.textContent === "Update") {
    findBookshelfIndex();
    updateBook();
    updateStatus(e);
    clearForm();
  }
})

searchBox.addEventListener("keyup", filterSearch)

statusDropdown.addEventListener("change", filterStatus)

bookshelf.addEventListener("click", (e) => {
  if (e.target.className.includes("book-status") && e.target.matches("button")) {
    findLibraryIndex(e);
    updateStatus(e);
  } else if (e.target.textContent === "edit") {
    displayModal(e);
    findLibraryIndex(e);
    pullBookInfo();
  } else if (e.target.textContent === "delete") {
    findLibraryIndex(e);
    deleteBook(e);
  }
})

