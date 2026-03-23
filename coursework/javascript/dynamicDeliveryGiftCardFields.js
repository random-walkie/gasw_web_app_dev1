"use strict";

/**
 *
 * @param fieldset The fieldset to append the select element to
 * @returns {HTMLFieldSetElement} The fieldset with the select element appended to it.
 */
function createDeliverySpeedField(fieldset) {
    const label = document.createElement("label");
    label.setAttribute("for", "deliverySpeed");
    label.textContent = "Delivery Speed:";
    fieldset.appendChild(label);

    const select = document.createElement("select");
    select.id = "deliverySpeed";
    select.name = "deliverySpeed";
    select.required = true;
    fieldset.appendChild(select);

    const options = [
        {value: "", text: "Select a speed…", disabled: true},
        {value: "standard", text: "Standard (3–5 days) (+£3.00)"},
        {value: "express", text: "Express (1–2 days) (+£5.00)"},
        {value: "next-day", text: "Next Day (+£10.00)"},
    ];

    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.text;
        select.appendChild(opt);
    });

    fieldset.appendChild(select);
    return fieldset;
}

/**
 *
 * @param fieldset The fieldset to append the checkbox to
 * @returns {HTMLFieldSetElement} The fieldset with the checkbox appended to it.
 */
function createPackagingField(fieldset) {
    const label = document.createElement("label");
    label.setAttribute("for", "packaging");
    label.textContent = "Premium Gift Box (+£2.50):";
    fieldset.appendChild(label);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = "packaging";
    input.name = "packaging";
    fieldset.appendChild(input);
    return fieldset;
}

/**
 *
 * @param fieldset The fieldset to append the email field to
 * @returns {HTMLFieldSetElement} The fieldset with the email field appended to it.
 */
function createEmailField(fieldset) {
    const label = document.createElement("label");
    label.setAttribute("for", "email");
    label.textContent = "Email Address:";
    fieldset.appendChild(label);

    const input = document.createElement("input");
    input.type = "email";
    input.id = "email";
    input.name = "email";
    input.placeholder = "Enter your email address";
    input.pattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
    input.autocomplete = "email";
    input.required = true;
    fieldset.appendChild(input);
    return fieldset;
}

/**
 * Renders the physical delivery options fieldset inside #delivery-options.
 * @returns {void}
 */
function showDeliveryFields() {
    let selected = document.querySelector("input[name='deliveryMethod']:checked");
    let container = document.getElementById("delivery-options");

    container.innerHTML = ""; // clear old fields

    let fieldset = document.createElement("fieldset");
    container.appendChild(fieldset);
    let legend = document.createElement("legend");

    if (selected.value === "e-gift") {

        legend.textContent = "E-Gift Card Address";
        fieldset.appendChild(legend);
        createEmailField(fieldset);

    } else if (selected.value === "post") {

        legend.textContent = "Delivery Options";
        fieldset.appendChild(legend);
        createDeliverySpeedField(fieldset);
        createPackagingField(fieldset);
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get radio buttons and listen for changes
    const radios = document.querySelectorAll("input[name='deliveryMethod']");
    radios.forEach(function (radio) {
        radio.addEventListener("change", showDeliveryFields);
    });

    // Initial render of delivery options
    showDeliveryFields();
});
