"use strict";
const startYear = 1800;
const currentYear = new Date().getFullYear();
const startYearString = startYear.toString();
const currentYearString = currentYear.toString();

function createFilterByYearField(fieldset) {
    // Create a span element to display the default value
    const startYearDefault = document.createElement("span");
    startYearDefault.textContent = startYearString;

    // Create a span element to display the default value
    const endYearDefault = document.createElement("span");
    endYearDefault.textContent = currentYearString;

    // Create the label and input elements
    const startYearLabel = document.createElement("label");
    startYearLabel.setAttribute("for", "startYear");
    startYearLabel.textContent = "Start Year: ";
    startYearLabel.appendChild(startYearDefault);
    fieldset.appendChild(startYearLabel);

    // Create the input element for the start year
    const input = document.createElement("input");
    input.type = "range";
    input.id = "startYear";
    input.name = "startYear";
    input.min = startYearString;
    input.max = currentYear.toString();
    input.value = startYearString;
    fieldset.appendChild(input);

    // Create the label and input elements for the end year
    const endYearLabel = document.createElement("label");
    endYearLabel.setAttribute("for", "endYear");
    endYearLabel.textContent = "End Year: ";
    endYearLabel.appendChild(endYearDefault);
    fieldset.appendChild(endYearLabel);

    // Create the input element for the end year
    const endInput = document.createElement("input");
    endInput.type = "range";
    endInput.id = "endYear";
    endInput.name = "endYear";
    endInput.min = startYearString;
    endInput.max = currentYear.toString();
    endInput.value = currentYearString;
    fieldset.appendChild(endInput);
}

function createOnlyShowBooksWithCoverField(fieldset) {
    const label = document.createElement("label");
    label.setAttribute("for", "onlyShowBooksWithCover");
    label.textContent = "Only Show Books with Covers:";
    fieldset.appendChild(label);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = "onlyShowBooksWithCover";
    input.name = "onlyShowBooksWithCover";
    fieldset.appendChild(input);
}

function applyFilters() {
    // Get the values of the filter inputs
    const startYear = document.getElementById("startYear").valueAsNumber;
    const endYear = document.getElementById("endYear").valueAsNumber;
    const onlyShowBooksWithCover = document.getElementById("onlyShowBooksWithCover").checked;

    // Apply the filtering to the currentResults.docs array
    const filteredResults = currentResults.docs.filter(book => {
        if (!book.first_publish_year || book.first_publish_year < startYear || book.first_publish_year > endYear) {
            return false;
        }
        return !(onlyShowBooksWithCover && !book.cover_i);

    })

    // Get the book search summary element, clear its content and display the filtered results
    const bookSearchSummary = document.getElementById("book-search-result-summary");
    bookSearchSummary.innerHTML = "";
    if (filteredResults.length === 0) {
        displayMessage(bookSearchSummary, "No books found matching the selected filters.", "summaryMessage");
        return;
    }
    displayMessage(bookSearchSummary, `Showing ${filteredResults.length} of ${currentResults.docs.length} results after filtering`,
        "summaryMessage");

    // Get the book search result element, clear its content and display the filtered results
    const bookSearchResult = document.getElementById("book-search-result");
    bookSearchResult.innerHTML = "";
    displayBookResults(bookSearchResult, {docs: filteredResults});
}

function resetFilters() {
    // Reset the values of the filter inputs
    document.getElementById("startYear").value = startYearString;
    document.getElementById("endYear").value = currentYearString;
    document.getElementById("onlyShowBooksWithCover").checked = false;
    applyFilters();

    // Re-render the book search results
    displayBookResults(document.getElementById("book-search-result"), {docs: currentResults.docs});

    // Reset the summary message
    const bookSearchSummary = document.getElementById("book-search-result-summary");
    bookSearchSummary.innerHTML = "";
    displayMessage(bookSearchSummary, `Found ${currentResults.numFound} books. Showing first 10.`, "summaryMessage");


}

function createApplyFiltersButton(fieldset) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Apply Filters";
    button.addEventListener("click", applyFilters);
    fieldset.appendChild(button);
}

function createResetFiltersButton(fieldset) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Reset Filters";
    button.addEventListener("click", resetFilters)
    fieldset.appendChild(button);
}

function displayBookFilters(bookSearchForm) {
    const fieldset = document.createElement("fieldset");
    fieldset.id = "bookFilters";
    bookSearchForm.appendChild(fieldset);

    const legend = document.createElement("legend");
    legend.textContent = "Book Search Filters";
    fieldset.appendChild(legend);

    createFilterByYearField(fieldset);
    createOnlyShowBooksWithCoverField(fieldset);
    createApplyFiltersButton(fieldset);
    createResetFiltersButton(fieldset);

}