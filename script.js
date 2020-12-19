"use strict";
const addBtn = document.querySelector(".add-btn");
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
  if (document.body.scrollWidth < 710 && window.pageYOffset > libraryContainer.offsetTop || 
    document.body.scrollWidth > 710 && window.pageYOffset > 765) {
    document.querySelector(".scroll-btn").style.display = "block";
  } else {
    document.querySelector(".scroll-btn").style.display = "none";
  }
}

window.addEventListener("scroll", toggleScrollBtn)

window.addEventListener("resize", () => {
  if (document.body.scrollWidth < 710 && visibility === false) {
    document.querySelector(".options-container").style.display = "none";
  } else if (document.documentElement.scrollWidth >= 710) {
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

document.querySelector(".book").addEventListener("click", () => {
  if (document.querySelector(".book").style.backgroundImage === "none") {
    document.querySelector(".book").style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/en/e/e0/Game_of_Thrones_Season_8.png')";
    document.querySelector(".book-title").style.display = "none";
    document.querySelector(".book-author").style.display = "none";
    document.querySelector(".book-bottom").style.display = "none";
  } else {
    document.querySelector(".book").style.backgroundImage = "none";
    document.querySelector(".book-title").style.display = "block";
    document.querySelector(".book-author").style.display = "block";
    document.querySelector(".book-bottom").style.display = "flex";
  }

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