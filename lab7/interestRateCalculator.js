"use strict";
// Use eventt.preventDefault(); to prevent the form submission

let form = document.getElementById("interestRateCalculatorForm");
form.addEventListener("submit", calculateInterestRate);


function calculateInterestRate(event) {
    event.preventDefault();

    const initialAmount = parseFloat(document.getElementById("initialAmount").value);
    const yearsInvested = parseInt(document.getElementById("yearsInvested").value);
    const interestRate = parseInt(document.getElementById("interestRate").value) / 100;

    const results = document.getElementById("results");
    results.innerHTML = ""; // Clear previous results

    // we do input validation in html form, but leaving this here as defensive programming practice
    if (interestRate < 0) {
        alert("Negative interest not possible.");
        return false;
    } else if (interestRate === 0) {
        alert("There is no interest.");
        return false;
    } else {
        let finalAmount = initialAmount;
        for (let y = 1; y <= yearsInvested; y++) {
            finalAmount = initialAmount * (1 + interestRate) ** y;
            const totalInterest = Math.round(finalAmount - initialAmount);

            const resultParagraph = document.createElement("p");
            resultParagraph.classList.add("yearly-result");
            resultParagraph.innerText = `Year: ${y}, total Interest: £${totalInterest}`;
            results.appendChild(resultParagraph);
        }

        const summaryParagraph = document.createElement("p");
        summaryParagraph.classList.add("summary-result");
        summaryParagraph.innerText = `The final amount after investing £${initialAmount} for ${yearsInvested} years is £${Math.round(finalAmount)}`;
        results.appendChild(summaryParagraph);
    }
}

