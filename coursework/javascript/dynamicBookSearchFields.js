"use strict";
// Global variables
const startYear = 1901;
const currentYear = new Date().getFullYear();
const startYearString = startYear.toString();
const currentYearString = currentYear.toString();

/**
 * @param fieldset
 * @returns {HTMLFieldSetElement} The fieldset with the range input appended to it.
 */
function createFilterByYearField(fieldset) {
    const startYearLabel = document.createElement("label");
    startYearLabel.setAttribute("for", "startYear");
    startYearLabel.textContent = "Start Year:";
    fieldset.appendChild(startYearLabel);

    const startInput = document.createElement("input");
    startInput.type = "number";
    startInput.id = "startYear";
    startInput.name = "startYear";
    startInput.min = startYearString;
    startInput.max = currentYearString;
    startInput.step = "1";
    startInput.value = startYearString;
    fieldset.appendChild(startInput);

    const endYearLabel = document.createElement("label");
    endYearLabel.setAttribute("for", "endYear");
    endYearLabel.textContent = "End Year:";
    fieldset.appendChild(endYearLabel);

    const endInput = document.createElement("input");
    endInput.type = "number";
    endInput.id = "endYear";
    endInput.name = "endYear";
    endInput.min = startYearString;
    endInput.max = currentYearString;
    endInput.step = "1";
    endInput.value = currentYearString;
    fieldset.appendChild(endInput);

    startInput.addEventListener("input", () => {
        endInput.min = startInput.value;
    });

    endInput.addEventListener("input", () => {
        startInput.max = endInput.value;
    });
}

/**
 * @param fieldset
 * @returns {HTMLFieldSetElement} The fieldset with the checkbox appended to it.
 */
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

/**
 * Applies the filters to the currentResults.docs array and displays the filtered results.
 * @returns {void}
 */
function applyFilters() {
    // Get the book search result element, clear its content and display the filtered results
    const bookSearchResult = document.getElementById("book-search-result");

    // Get the values of the filter inputs
    const inputStartYear = document.getElementById("startYear").valueAsNumber;
    const inputEndYear = document.getElementById("endYear").valueAsNumber;

    // Get the book search summary element
    const bookSearchSummary = document.getElementById("book-search-result-summary");
    // Check if the start year is greater than the end year
    // Display an error message if it is
    if (!isValidStartYear(inputStartYear, startYear) || !isValidEndYear(inputEndYear, startYear) ||
        !isValidYearRange(inputStartYear, inputEndYear)) {
        displayMessage(bookSearchSummary, "The date range is invalid. Please enter a valid start year and end year.",
            "errorMessage", true);
        return;
    }
    const onlyShowBooksWithCover = document.getElementById("onlyShowBooksWithCover").checked;

    // Apply the filtering to the currentResults.docs array
    const filteredResults = currentResults.docs.filter(book => {
        if (!book.first_publish_year || book.first_publish_year < inputStartYear || book.first_publish_year > inputEndYear) {
            return false;
        }
        return !(onlyShowBooksWithCover && !book.cover_i);

    })

    // Display the filtered results
    if (filteredResults.length === 0) {
        displayMessage(bookSearchSummary, "No books found matching the selected filters.",
            "errorMessage", true);
        return;
    }
    // Display the filtered book search result summary
    displayMessage(bookSearchSummary, `Showing ${filteredResults.length} of ${currentResults.numFound} results after filtering`,
        "summaryMessage", true);

    // Display the filtered book search results
    displayBookResults(bookSearchResult, {docs: filteredResults});
}

/**
 * Resets the filters to their default values and applies the filters.
 * @returns {void}
 */
function resetFilters() {
    // Reset the values of the filter inputs
    document.getElementById("startYear").value = startYearString;
    document.getElementById("endYear").value = currentYearString;
    document.getElementById("onlyShowBooksWithCover").checked = false;

    // Re-render the summary message
    const bookSearchSummary = document.getElementById("book-search-result-summary");
    displaySearchSummary(bookSearchSummary, currentResults.numFound);

    // Re-render the book search results
    const bookSearchResult = document.getElementById("book-search-result");
    displayBookResults(bookSearchResult, {docs: currentResults.docs});
}

/**
 * @param fieldset The fieldset to append the button to
 * @returns {HTMLFieldSetElement} The fieldset with the apply filter button appended to it.
 */
function createApplyFiltersButton(fieldset) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Apply Filters";
    button.addEventListener("click", applyFilters);
    fieldset.appendChild(button);
}

/**
 *
 * @param fieldset The fieldset to append the button to
 * @returns {HTMLFieldSetElement} The fieldset with the reset filter button appended to it.
 */
function createResetFiltersButton(fieldset) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Reset Filters";
    button.addEventListener("click", resetFilters)
    fieldset.appendChild(button);
}

/**
 *
 * @param bookSearchForm The form element to append the fieldset to
 * @returns {HTMLFieldSetElement} The fieldset with the filter fields appended to it.
 */
function displayBookFilters(bookSearchForm) {
    const fieldset = document.createElement("fieldset");
    fieldset.id = "bookFilters";

    const legend = document.createElement("legend");
    legend.textContent = "Book Search Filters";
    fieldset.appendChild(legend);

    createFilterByYearField(fieldset);
    createOnlyShowBooksWithCoverField(fieldset);
    createApplyFiltersButton(fieldset);
    createResetFiltersButton(fieldset);
    bookSearchForm.appendChild(fieldset);

}