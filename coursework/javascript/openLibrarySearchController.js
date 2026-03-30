"use strict";

function displayBookResults(result, data) {

    data.docs.forEach(book => {
        // Create a card article element for each book
        const cardElement = document.createElement("article")
        cardElement.classList.add("book-card");

        // Create clickable chevron icon element
        const icon = document.createElement("i");
        icon.classList.add("fa", "fa-chevron-right", "clickable");

        // Add a header to the card that is always visible
        const heading = document.createElement("h3");
        heading.textContent = `${book.title}`;
        // Make the heading clickable too
        heading.classList.add("clickable");
        // Append the icon to the heading
        heading.appendChild(icon);
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

        })

        // Create figures for the book cover image and append them to the book details div
        if (!book.cover_i) {
            displayMessage(bookDetails, "No cover available");
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
            displayMessage(bookDetails, "No author available");
        } else {
            displayMessage(bookDetails, `Author: ${book.author_name.join(", ")}`);
        }

        // Create a paragraph element for the publication date and append it to the book details div
        if (!book.first_publish_year) {
            displayMessage(bookDetails, "No publication date available");
        } else {
            displayMessage(bookDetails, `Publication year: ${book.first_publish_year}`);
        }

        // Create a paragraph element for the number of editions and append it to the book details div
        displayMessage(bookDetails, `Number of editions: ${book.edition_count}`)
        // Create a paragraph element for the availability status and append it to the book details div
        displayMessage(bookDetails, `Availability: ${book.ebook_access}`)

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


function openLibraryApiCall(evt) {
    evt.preventDefault();
    // Sanitize input: trim + lowercase
    const searchTerm = document.getElementById("search-term").value.trim().toLowerCase();

    // book-search-summary is outside the book-search-result div, so it can be displayed before the results
    const bookSearchSummary = document.getElementById("book-search-result-summary");
    bookSearchSummary.innerHTML = "";

    // Check if the search term is valid
    if (!isValidBookSearchTerm(searchTerm)) {
        displayMessage(bookSearchSummary, "Please enter a valid book title or author name",
            "errorMessage");
        return;
    }
    // Build search URL
    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=10`;

    // Get the book-search-result div and clear its content
    const bookSearchResult = document.getElementById("book-search-result");
    bookSearchResult.innerHTML = "";

    // Make the API call using fetch
    fetch(searchUrl)
        // Check if the response is ok (status in the range 200-299), if not, reject the promise
        // and return an error message
        .then(response => response.ok ? response.json() : Promise.reject(new Error("Something went wrong with the service. Please try again later.")))
        .then(data => {
            if (data.numFound > 10) {
                displayMessage(bookSearchSummary, `Found ${data.numFound} books. Showing first 10:`)
            } else {
                displayMessage(bookSearchSummary, `Found ${data.numFound} books.`)
            }
            if (data.docs.length === 0) {
                displayMessage(bookSearchResult, "No books found", "errorMessage");
            }
            displayBookResults(bookSearchResult, data);
        })
        .catch(error => {
            displayMessage(bookSearchResult, error.message, "errorMessage");
        })
}

// Get the book-search form and add an event listener to handle form submission
const bookSearchForm = document.getElementById('book-search');
bookSearchForm.addEventListener('submit', openLibraryApiCall);