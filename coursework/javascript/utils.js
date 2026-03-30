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

function displayMessage(targetElement, message, cssClass) {
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;
    if (cssClass) {
        messageParagraph.classList.add(cssClass);
    }
    targetElement.appendChild(messageParagraph);
}