document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("retirement-planning-form");
    const output = document.getElementById("retirement-output");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const currentAge = parseInt(document.getElementById("current-age").value);
        const retirementAge = parseInt(document.getElementById("retirement-age").value);
        const currentSavings = parseFloat(document.getElementById("current-savings").value);
        const monthlyContribution = parseFloat(document.getElementById("monthly-contribution").value);
        const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;

        if (currentAge >= retirementAge || currentSavings < 0 || monthlyContribution <= 0 || interestRate < 0) {
            output.innerHTML = "<p>Please enter valid values.</p>";
            return;
        }

        const yearsToRetirement = retirementAge - currentAge;
        const monthsToRetirement = yearsToRetirement * 12;
        const monthlyInterestRate = interestRate / 12;

        let totalSavings = currentSavings;

        for (let i = 0; i < monthsToRetirement; i++) {
            totalSavings += monthlyContribution;
            totalSavings *= (1 + monthlyInterestRate);
        }

        output.innerHTML = `
            <p>Total Savings at Retirement: $${totalSavings.toFixed(2)}</p>
        `;
    });
});
