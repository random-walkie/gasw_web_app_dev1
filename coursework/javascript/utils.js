"use strict";

/**
 *
 * @param giftCardValue The Gift Card Value (number, decimal)
 * @returns {boolean} True if the value is valid, false otherwise.
 */
function isValidGiftCardValue(giftCardValue) {
    return !Number.isNaN(giftCardValue) && giftCardValue >= 5.00 && giftCardValue <= 200.00;
}

/**
 *
 * @param quantity The Gift Card Quantity (number, integer)
 * @returns {boolean} True if the quantity is valid, false otherwise.
 */
function isValidQuantity(quantity) {
    return Number.isInteger(quantity) && quantity >= 1 && quantity <= 20;
}

/**
 *
 * @param deliveryMethod The Delivery Method (string)
 * @returns {boolean} True if the delivery method is valid, false otherwise.
 */
function isValidDeliveryMethod(deliveryMethod) {
    return deliveryMethod === "e-gift" || deliveryMethod === "post";
}

/**
 *
 * @param deliverySpeed The Delivery Speed (string)
 * @returns {boolean} True if the delivery speed is valid, false otherwise.
 */
function isValidDeliverySpeed(deliverySpeed) {
    return deliverySpeed === "standard" || deliverySpeed === "express" || deliverySpeed === "next-day" || deliverySpeed === "";
}

/**
 * @param searchTerm The search term to validate.
 * @returns {boolean} True if the search term is valid, false otherwise.
 */
function isValidBookSearchTerm(searchTerm) {
    const isNotEmpty = searchTerm.trim() !== "";
    const isAcceptableLength = searchTerm.length >= 3 && searchTerm.length <= 50;
    return isNotEmpty && isAcceptableLength;
}

function isValidStartYear(inputStartYear, minYear) {
    return !Number.isNaN(inputStartYear) && inputStartYear >= minYear && inputStartYear <= new Date().getFullYear();
}

function isValidEndYear(inputEndYear, minYear) {
    return !Number.isNaN(inputEndYear) && inputEndYear >= minYear && inputEndYear <= new Date().getFullYear();
}

function isValidYearRange(inputStartYear, inputEndYear) {
    return inputStartYear <= inputEndYear;
}


/**
 * @param targetElement The element to which the message will be appended.
 * @param message The message to be displayed.
 * @param cssClass The CSS class to be applied to the message paragraph.
 * @param clearTargetHtml Whether to clear the target element's HTML before appending the message.
 * @returns {void}
 */
function displayMessage(targetElement, message, cssClass, clearTargetHtml = false) {
    if (clearTargetHtml) {
        targetElement.innerHTML = "";
    }

    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;
    if (cssClass) {
        messageParagraph.classList.add(cssClass);
    }
    targetElement.appendChild(messageParagraph);
}

/**
 * Toggles the visibility of an HTML element.
 * @returns {void}
 * @param htmlElement {HTMLElement} The element to toggle.
 */
function toggleElementVisibility(htmlElement) {
    if (htmlElement.style.display === "none") {
        htmlElement.style.display = "block";
    } else {
        htmlElement.style.display = "none";
    }
}