"use strict";

/**
 * Creates a labelled <select> element from a list of options.
 * @param {string} id - The id and name for the select element.
 * @param {string} labelText - The visible label text.
 * @param {Array<{value: string, text: string, disabled?: boolean}>} options
 * @returns {DocumentFragment} A fragment containing the label and select.
 */
function createLabelledSelect(id, labelText, options) {
    const fragment = document.createDocumentFragment();

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = labelText;
    fragment.appendChild(label);

    const select = document.createElement("select");
    select.id = id;
    select.name = id;
    select.required = true;

    options.forEach(({value, text, disabled}) => {
        const opt = document.createElement("option");
        opt.value = value;
        opt.textContent = text;
        if (disabled) {
            opt.disabled = true;
            opt.selected = true;
        }
        select.appendChild(opt);
    });

    fragment.appendChild(select);
    return fragment;
}

/**
 * Creates the delivery speed label and select element.
 * @returns {DocumentFragment}
 */
function createDeliverySpeedField() {
    return createLabelledSelect("deliverySpeed", "Delivery Speed:", [
        {value: "", text: "Select a speed…", disabled: true},
        {value: "standard", text: "Standard (3–5 days)"},
        {value: "express", text: "Express (1–2 days)"},
        {value: "next-day", text: "Next Day"},
    ]);
}

/**
 * Creates a labelled <input> element for packaging checkbox.
 * @returns {DocumentFragment} A fragment containing the label and input.
 */
function createPackagingField() {
    const fragment = document.createDocumentFragment();

    const label = document.createElement("label");
    const id = "packaging";
    label.setAttribute("for", id);
    label.textContent = "Premium Gift box (+£2.50)";
    fragment.appendChild(label);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.name = id;
    checkbox.value = "gift-box";
    checkbox.required = false;
    fragment.appendChild(checkbox);
    return fragment;
}

/**
 * Creates a labelled <input> element for email address.
 * @returns {DocumentFragment} A fragment containing the label and input.
 */
function createEmailField() {
    const fragment = document.createDocumentFragment();
    const label = document.createElement("label");
    label.setAttribute("for", "email");
    label.textContent = "Email Address:";
    fragment.appendChild(label);

    const input = document.createElement("input");
    input.type = "email";
    input.id = "email";
    input.name = "email";
    input.required = true;
    fragment.appendChild(input);
    return fragment;
}

/**
 * Renders the physical delivery options fieldset inside #delivery-options.
 * Called whenever a delivery method radio button changes.
 * When "post" is selected: injects a fieldset with delivery speed select and packaging checkbox.
 * When "e-gift" is selected: injects a fieldset with email address input.
 */
function renderDeliveryOptions() {
    const selected = document.querySelector("input[name='deliveryMethod']:checked");
    const container = document.getElementById("delivery-options");

    container.innerHTML = "";

    const fieldset = document.createElement("fieldset");

    const legend = document.createElement("legend");

    if (!selected || selected.value !== "post") {
        legend.textContent = "E-Gift Card Delivery Address";
        fieldset.appendChild(legend);

        fieldset.appendChild(createEmailField());

        container.appendChild(fieldset);
    } else {
        legend.textContent = "Physical Delivery Options";
        fieldset.appendChild(legend);

        fieldset.appendChild(createDeliverySpeedField());
        fieldset.appendChild(createPackagingField());

        container.appendChild(fieldset);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("input[name='deliveryMethod']")
        .forEach(radio => radio.addEventListener("change", renderDeliveryOptions));
});
