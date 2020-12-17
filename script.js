"use strict";
const addBtn = document.querySelector(".add-btn");
const resetBtn = document.querySelector(".reset-btn");
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
    optionsToggle.innerHTML = "<b>HIDE LIBRARY OPTIONS<b>";
    visibility = true;
  } else if (visibility === true) {
    document.querySelector(".options-container").style.display = "none";
    optionsToggle.innerHTML = "<b>SHOW LIBRARY OPTIONS<b>";
    visibility = false;
  }
}

function resetOptions() {
  searchBox.value = "";
  searchDropdown.value = "title";
  statusDropdown.value = "all"
  sortDropdown.value = "added newest";
}

window.addEventListener("load", toggleTheme)
themeSelect.addEventListener("change", toggleTheme)

optionsToggle.addEventListener("click", toggleOptions)

resetBtn.addEventListener("click", resetOptions)