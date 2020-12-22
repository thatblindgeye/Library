"use strict";
const addBtn = document.querySelector(".add-btn");
const editBtn = document.querySelector(".edit-book");
const newBtn = document.querySelector(".new-btn");
const statusBtn = document.querySelector(".book-status");

const libraryContainer = document.querySelector(".library-container");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.getElementById("search");
const searchDropdown = document.getElementById("search-type");
const sortDropdown = document.getElementById("sort-dropdown");
const statusDropdown = document.getElementById("status-filter");
const themeSelect = document.getElementById("theme-dropdown");

function toggleTheme() {
  if (themeSelect.value === "dark") {
    document.body.className = "theme-dark";
  } else if (themeSelect.value === "light") {
    document.body.className = "theme-light";
  }
}

function toggleOptions(e) {
  if (e.type === "resize") {
    if (document.body.scrollWidth < 650) {
      optionsContainer.style.display = "";
      document.querySelector(".arrow").textContent = "arrow_drop_down";
    } else {
      optionsContainer.style.display = "flex";
    }
  } else {
    if (optionsContainer.style.display === "") {
      optionsContainer.style.display = "flex";
      document.querySelector(".arrow").textContent = "arrow_drop_up";
    } else {
      optionsContainer.style.display = "";
      document.querySelector(".arrow").textContent = "arrow_drop_down";
    }
  }
}

function displayModal(e) {
  if (e.target.className.includes("new-btn")) {
    document.querySelector(".modal-container").style.display = "block";
    document.querySelector(".modal-description").innerText = "Add a Book";
    addBtn.textContent = "Add";
  } else if (e.target.parentElement.className.includes("edit-book")) {
    document.querySelector(".modal-container").style.display = "block";
    document.querySelector(".modal-description").innerText = "Edit a Book";
    addBtn.textContent = "Update";
  }
}

function resetOptions() {
  searchBox.value = "";
  searchDropdown.value = "title";
  statusDropdown.value = "all"
  sortDropdown.value = "added newest";
}

function toggleScrollBtn() {
  let resetBtn = document.querySelector(".reset-btn");
  if (document.body.scrollWidth < 650 && window.pageYOffset > libraryContainer.offsetTop || 
    document.body.scrollWidth > 650 && window.pageYOffset > (resetBtn.offsetTop + 50)) {
    document.querySelector(".scroll-btn").style.display = "block";
  } else {
    document.querySelector(".scroll-btn").style.display = "";
  }
}

function addBook() {
  alert("ADDED");
}

function updateBook() {
  alert("UPDATED");
}

function updateStatus() {
  if (statusBtn.textContent === "READ") {
    statusBtn.textContent = "UNREAD";
    statusBtn.style.backgroundColor = "var(--unread-book)";
  } else if (statusBtn.textContent === "UNREAD") {
    statusBtn.textContent = "READ";
    statusBtn.style.backgroundColor = "var(--read-book)";
  }
}

// separate title/author with tags, so that tags can be iterated over an array of tag props
function filterSearch() {
  let criteria = searchBox.value.toLowerCase();
  let filter = searchDropdown.value;
  if (criteria.trim() === "" || document.querySelector(".book-" + `${filter}`).textContent.toLowerCase().includes(criteria.trim())) {
    document.querySelector(".book").style.opacity = "1";
  } else if (!document.querySelector(".book-" + `${filter}`).textContent.toLowerCase().includes(criteria)) {
    document.querySelector(".book").style.opacity = "0";
  }
}

function filterStatus() {
  let filter = statusDropdown.value;
}

function sortLibrary() {
  
}
/*
Use ARRAY.forEach((item) => {
item.filterType
})

for searching an objects values
*/

window.addEventListener("load", () => {
  toggleTheme();
  if (document.documentElement.scrollWidth >= 650) {
    optionsContainer.style.display = "flex";
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

newBtn.addEventListener("click", (e) => {
  displayModal(e);
})

editBtn.addEventListener("click", (e) => {
  displayModal(e);
})

document.querySelector(".modal-container").addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "none";
})
document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "none";
})
document.querySelector(".add-modal").addEventListener("click", (e) => {
  e.stopPropagation();
})

addBtn.addEventListener("click", () => {
  if(addBtn.textContent === "Add") {
    addBook();
  } else if (addBtn.textContent === "Update") {
    updateBook();
  }
})

searchBox.addEventListener("keyup", filterSearch)

statusDropdown.addEventListener("change", filterStatus)

statusBtn.addEventListener("click", updateStatus)

