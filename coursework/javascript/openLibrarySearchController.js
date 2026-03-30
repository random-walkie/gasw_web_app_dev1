"use strict";
// Global variable to store the current search results
// Initial value is an empty object with empty arrays for docs and numFound
let currentResults = {docs: [], numFound: 0};

/**
 * Displays the search results in a card layout.
 * @param {HTMLElement} result - The element to display the results in.
 * @param {Object} data - The search results data.
 * @returns {void}
 */
function displayBookResults(result, data) {
    result.innerHTML = "";
    data.docs.forEach(book => {
        // Create a card article element for each book
        const cardElement = document.createElement("article")
        cardElement.classList.add("book-card");

        // Create clickable chevron icon element
        const icon = document.createElement("i");
        icon.classList.add("fa", "fa-chevron-right", "clickable");

        // Add a header to the card that is always visible
        const heading = document.createElement("h3");
        // Add aria-expanded attribute to the heading for accessibility
        heading.setAttribute("aria-expanded", "false")
        // Make the heading clickable too
        heading.classList.add("clickable");
        // Append the icon to the heading
        heading.appendChild(icon);
        // Append the book title to the heading with a new text node so chevron appears before the title
        heading.appendChild(document.createTextNode(book.title));
        // Append the heading to the card
        cardElement.appendChild(heading);

        // Create a div element for the book details
        const bookDetails = document.createElement("div");
        bookDetails.classList.add("book-details");
        // Hide the book details initially
        bookDetails.style.display = "none";

        // Add an event listener to the heading to toggle the book details visibility
        heading.addEventListener("click", () => {
            // Toggle the visibility of the book details
            toggleElementVisibility(bookDetails);
            // Toggle the chevron icon
            icon.classList.toggle("fa-chevron-right");
            icon.classList.toggle("fa-chevron-down");
            // Toggle the aria-expanded attribute
            heading.setAttribute("aria-expanded", heading.getAttribute("aria-expanded") === "false" ? "true" : "false");
        })

        // Create figures for the book cover image and append them to the book details div
        if (!book.cover_i) {
            displayMessage(bookDetails, "No cover available", "emptyMessage");
        } else {
            const bookCover = document.createElement("figure");
            const bookCoverImage = document.createElement("img");
            bookCoverImage.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            bookCoverImage.alt = `Book cover for ${book.title}`;
            bookCover.appendChild(bookCoverImage);
            bookDetails.appendChild(bookCover);
        }

        // Create a paragraph element for the author name and append it to the book details div
        if (!book.author_name) {
            displayMessage(bookDetails, "No author available", "emptyMessage");
        } else {
            displayMessage(bookDetails, `Author: ${book.author_name.join(", ")}`,
                "bookDetailsMessage");
        }

        // Create a paragraph element for the publication date and append it to the book details div
        if (!book.first_publish_year) {
            displayMessage(bookDetails, "No publication date available", "emptyMessage");
        } else {
            displayMessage(bookDetails, `Publication year: ${book.first_publish_year}`, "bookDetailsMessage");
        }

        // Create a paragraph element for the number of editions and append it to the book details div
        displayMessage(bookDetails, `Number of editions: ${book.edition_count}`, "bookDetailsMessage")
        // Create a paragraph element for the availability status and append it to the book details div
        displayMessage(bookDetails, `Availability: ${book.ebook_access}`, "bookDetailsMessage")

        // Create an external link element and append it to the book details div
        const externalLinkOpenLibrary = document.createElement("a");
        externalLinkOpenLibrary.href = `https://openlibrary.org${book.key}`;
        externalLinkOpenLibrary.target = "_blank";
        externalLinkOpenLibrary.textContent = "Get it on Open Library (opens in a new tab)";
        externalLinkOpenLibrary.classList.add("externalUrl");
        bookDetails.appendChild(externalLinkOpenLibrary);

        // Append a card element to the book search result div
        cardElement.appendChild(bookDetails);
        result.appendChild(cardElement);
    })
}

/**
 * Handles the form submission event for the book search form.
 * @param {Event} evt - The form submission event.
 * @returns {void}
 */
function openLibraryApiCall(evt) {
    evt.preventDefault();
    // Sanitize input: trim + lowercase
    const searchTerm = document.getElementById("search-term").value.trim().toLowerCase();

    // book-search-summary is outside the book-search-result div, so it can be displayed before the results
    const bookSearchSummary = document.getElementById("book-search-result-summary");

    // Check if the search term is valid
    if (!isValidBookSearchTerm(searchTerm)) {
        displayMessage(bookSearchSummary, "Please enter a valid book title or author name",
            "errorMessage", true);
        return;
    }
    // Build search URL
    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=10`;

    // Get the book-search-result div and clear its content
    const bookSearchResult = document.getElementById("book-search-result");
    bookSearchResult.innerHTML = "";

    displayMessage(bookSearchSummary, "Searching...", "summaryMessage", true);
    // Results should be displayed before showing extra filters
    const bookFilters = document.getElementById("book-filters");
    bookFilters.innerHTML = "";
    bookFilters.style.display = "none";
    // Make the API call using fetch
    fetch(searchUrl)
        // Check if the response is ok (status in the range 200-299), if not, reject the promise
        // and return an error message
        .then(response => response.ok ? response.json() : Promise.reject(new Error("Something went wrong with the service. Please try again later.")))
        .then(data => {
            if (data.docs.length === 0) {
                displayMessage(bookSearchSummary, "No books found", "errorMessage", true);
                return;
            } else {
                currentResults = data;
                displaySearchSummary(bookSearchSummary, data.numFound)
            }
            displayBookResults(bookSearchResult, data);
            bookFilters.style.display = "block";
            displayBookFilters(bookFilters);
        })
        .catch(error => {
            displayMessage(bookSearchSummary, error.message, "errorMessage", true);
        })
}

// Get the book-search form and add an event listener to handle form submission
const bookSearchForm = document.getElementById('book-search');
bookSearchForm.addEventListener('submit', openLibraryApiCall);