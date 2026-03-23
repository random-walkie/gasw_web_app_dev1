"use strict";
// This is a module-level constant to store the VAT rate
const vatRate = 0.10;

/**
 *
 * @param giftCardValue The Gift Card Value (number, decimal)
 * @param quantity The Gift Card Quantity (number, integer)
 * @returns {number} The Gross Subtotal (number, decimal)
 */
function calculateGrossSubTotal(giftCardValue, quantity) {
    return giftCardValue * quantity;
}

/**
 *
 * @param giftCardValue The Gift Card Value (number, decimal)
 * @param quantity The Gift Card Quantity (number, integer)
 * @returns {number} The Gift Card VAT (number, decimal)
 */
function calculateVat(giftCardValue, quantity) {
    return calculateGrossSubTotal(giftCardValue, quantity) * (vatRate / (1 + vatRate));
}

/**
 *
 * @param giftCardValue The Gift Card Value (number, decimal)
 * @param quantity The Gift Card Quantity (number, integer)
 * @returns {number} The Net Subtotal (number, decimal)
 */
function calculateNetSubTotal(giftCardValue, quantity) {
    return calculateGrossSubTotal(giftCardValue, quantity) - calculateVat(giftCardValue, quantity);
}

/**
 *
 * @param deliverySpeed The Delivery Speed (string)
 * @returns {number} The Delivery Fee (number, decimal)
 */
function calculateDeliveryFee(deliverySpeed) {
    if (deliverySpeed === "standard") {
        return 3.00;
    } else if (deliverySpeed === "express") {
        return 5.00;
    } else if (deliverySpeed === "next-day") {
        return 10.00;
    }
    return 0.00;
}

/**
 *
 * @param isChecked The Premium Gift Box option (boolean)
 * @returns {number} The Premium Gift Box Fee (number, decimal)
 */
function calculatePremiumGiftBoxFee(isChecked) {
    if (isChecked) {
        return 2.50;
    }
    return 0.00;
}

/**
 *
 * @param giftCardValue The Gift Card Value (number, decimal)
 * @param quantity The Gift Card Quantity (number, integer)
 * @param deliverySpeed The Delivery Speed (string)
 * @param premiumGiftBoxChecked The Premium Gift Box option (boolean)
 * @returns {number} The Final Total (number, decimal)
 */
function calculateFinalTotal(giftCardValue, quantity, deliverySpeed, premiumGiftBoxChecked) {
    return calculateGrossSubTotal(giftCardValue, quantity) +
        calculateDeliveryFee(deliverySpeed) +
        calculatePremiumGiftBoxFee(premiumGiftBoxChecked);
}

/**
 *
 * @param result The result element
 * @param deliverySpeed The Delivery Speed (string)
 * @param premiumGiftBoxChecked The Premium Gift Box option (boolean)
 * @returns {HTMLElement} The result element with the delivery fee and premium gift box fee appended
 */
function addDeliveryParagraphs(result, deliverySpeed, premiumGiftBoxChecked) {
    const postFee = calculateDeliveryFee(deliverySpeed).toFixed(2);
    const postFeeParagraph = document.createElement("p");
    postFeeParagraph.textContent = "Post Fee: £" + postFee;
    result.appendChild(postFeeParagraph);

    const premiumGiftBoxFee = calculatePremiumGiftBoxFee(premiumGiftBoxChecked).toFixed(2);
    const premiumGiftBoxFeeParagraph = document.createElement("p");
    premiumGiftBoxFeeParagraph.textContent = "Premium Gift Box: £" + premiumGiftBoxFee;
    result.appendChild(premiumGiftBoxFeeParagraph);
    return result;
}

/**
 *
 * @param result The result element
 * @param giftCardValue The Gift Card Value (number, decimal)
 * @param quantity The Gift Card Quantity (number, integer)
 * @returns {HTMLElement} The result element with the net subtotal and vat appended
 */
function addVatParagraphs(result, giftCardValue, quantity) {
    const netSubtotal = calculateNetSubTotal(giftCardValue, quantity).toFixed(2);
    const netSubtotalParagraph = document.createElement("p");
    netSubtotalParagraph.textContent = "Subtotal (EX-VAT): £" + netSubtotal;
    result.appendChild(netSubtotalParagraph);

    const vat = calculateVat(giftCardValue, quantity).toFixed(2);
    const vatParagraph = document.createElement("p");
    vatParagraph.textContent = "VAT: £" + vat;
    result.appendChild(vatParagraph);
    return result;
}

/**
 * @param {Event} evt - The form submission event.
 * @returns {void}
 */
function showPaymentResults(evt) {
    evt.preventDefault();
    const result = document.getElementById("gift-card-result");
    result.innerHTML = "";

    const giftCardValue = parseFloat(document.getElementById("giftCardValue").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    const deliveryMethod = document.querySelector("input[name='deliveryMethod']:checked").value;

    let deliverySpeed = "";
    let premiumGiftBoxChecked = false;
    addVatParagraphs(result, giftCardValue, quantity);

    if (deliveryMethod === "post") {
        deliverySpeed = document.getElementById("deliverySpeed").value;
        premiumGiftBoxChecked = document.getElementById("packaging").checked;
        addDeliveryParagraphs(result, deliverySpeed, premiumGiftBoxChecked);
    }

    const finalTotal = calculateFinalTotal(giftCardValue, quantity, deliverySpeed, premiumGiftBoxChecked).toFixed(2);
    const finalTotalParagraph = document.createElement("p");
    finalTotalParagraph.textContent = "Total to Pay: £" + finalTotal;
    result.appendChild(finalTotalParagraph);

}

// Capture the form submission event and call the showPaymentResults function
const giftCardForm = document.getElementById("giftCardForm");
giftCardForm.addEventListener("submit", showPaymentResults);


