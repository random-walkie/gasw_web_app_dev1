"use strict";

function openLibraryApiCall(evt) {
    evt.preventDefault();
    // Sanitize input: trim + lowercase
    const searchTerm = document.getElementById("search-term").value.trim().toLowerCase();
    // Build search URL
    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=10`;
    console.log(searchUrl);
}

const bookSearchForm = document.getElementById('book-search');
bookSearchForm.addEventListener('submit', openLibraryApiCall);