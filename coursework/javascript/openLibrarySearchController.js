"use strict";

function openLibraryApiCall(evt) {
    evt.preventDefault();
    // Sanitize input: trim + lowercase
    const searchTerm = document.getElementById("searchTerm").value.trim().toLowerCase();
    // Build search URL
    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`;
    console.log(searchUrl);
}

const bookSearchForm = document.getElementById('bookSearchForm');
bookSearchForm.addEventListener('submit', openLibraryApiCall);