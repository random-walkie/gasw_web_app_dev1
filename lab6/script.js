function calculateInterestRate(initialAmount, yearsInvested, interestRate) {
    if (interestRate < 0) {
        console.log("Interest rates cannot be negative");
        return;
    }

    if (interestRate === 0) {
        console.log("There will be no interest.");
    } else {
        let currentAmount = initialAmount;

        for (let i = 0; i < yearsInvested; i++) {
            const yearlyInterest = currentAmount * interestRate;
            currentAmount += yearlyInterest;
            console.log(`Year: ${i + 1}, Interest Earned: ${Math.round(yearlyInterest)}£, Total Balance: ${Math.round(currentAmount)}£`);
        }

        const finalBalance = initialAmount * (1 + interestRate) ** yearsInvested;
        console.log(`The final amount after investing ${initialAmount}£ for ${yearsInvested} year(s) is ${Math.round(finalBalance)}£`);

    }
}

calculateInterestRate(1000, 5, 0.03);
calculateInterestRate(1000, 5, 0);
calculateInterestRate(1000, 5, -0.05);
