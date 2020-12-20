"use strict";
const newBtn = document.querySelector(".new-btn");
const addBtn = document.querySelector(".add-btn");
const closeBtn = document.querySelector(".close-btn");
const editBtn = document.querySelector(".edit-book");
const deleteBtn = document.querySelector(".delete-book");
const resetBtn = document.querySelector(".reset-btn");
const scrollBtn = document.querySelector(".scroll-btn");
const statusBtn = document.querySelector(".book-status");

const searchBox = document.getElementById("search");
const searchDropdown = document.getElementById("search-type");
const sortDropdown = document.getElementById("sort-dropdown");
const statusDropdown = document.getElementById("status-filter");
const optionsToggle = document.querySelector(".options-toggle");
const themeSelect = document.getElementById("theme-dropdown");
let visibility = false;

function toggleTheme() {
  if (themeSelect.value === "dark") {
    document.body.className = "theme-dark";
  } else if (themeSelect.value === "light") {
    document.body.className = "theme-light";
  }
}

function toggleOptions() {
    if (visibility === false) {
      document.querySelector(".options-container").style.display = "flex";
      optionsToggle.innerHTML = '<b>HIDE LIBRARY OPTIONS<i class="material-icons">arrow_drop_up</i><b>';
      visibility = true;
    } else if (visibility === true) {
      document.querySelector(".options-container").style.display = "none";
      optionsToggle.innerHTML = '<b>SHOW LIBRARY OPTIONS<i class="material-icons">arrow_drop_down</i><b>';
      visibility = false;
    }
}

function resetOptions() {
  searchBox.value = "";
  searchDropdown.value = "title";
  statusDropdown.value = "all"
  sortDropdown.value = "added newest";
}

function toggleScrollBtn() {
  const libraryContainer = document.querySelector(".library-container");
  if (document.body.scrollWidth < 650 && window.pageYOffset > libraryContainer.offsetTop || 
    document.body.scrollWidth > 650 && window.pageYOffset > 765) {
    document.querySelector(".scroll-btn").style.display = "block";
    document.querySelector(".scroll-btn").style.top = "0";
  } else {
    document.querySelector(".scroll-btn").style.display = "none";
    document.querySelector(".scroll-btn").style.top = "-150px";
  }
}

window.addEventListener("scroll", toggleScrollBtn)

window.addEventListener("resize", () => {
  if (document.body.scrollWidth < 650 && visibility === false) {
    document.querySelector(".options-container").style.display = "none";
  } else if (document.documentElement.scrollWidth >= 650) {
    document.querySelector(".options-container").style.display = "flex";
  }
})

window.addEventListener("load", () => {
  toggleTheme();
  toggleScrollBtn();
  if (document.documentElement.scrollWidth >= 710) {
    document.querySelector(".options-container").style.display = "flex";
  }
})

themeSelect.addEventListener("change", toggleTheme)

optionsToggle.addEventListener("click", toggleOptions)

resetBtn.addEventListener("click", resetOptions)

scrollBtn.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
})

newBtn.addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "block";
})

document.querySelector(".modal-container").addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "none";
})
closeBtn.addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "none";
})
document.querySelector(".add-modal").addEventListener("click", (e) => {
  e.stopPropagation();
})

statusBtn.addEventListener("click", (e) => {
  e.stopPropagation();
})

editBtn.addEventListener("click", (e) => {
  e.stopPropagation();
})

deleteBtn.addEventListener("click", (e) => {
  e.stopPropagation();
})