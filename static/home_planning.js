document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("home-planning-form");
    const adviceContent = document.getElementById("advice-content");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form inputs
        const income = parseFloat(document.getElementById("income").value);
        const debt = parseFloat(document.getElementById("debt").value);
        const downPayment = parseFloat(document.getElementById("down-payment").value);
        const location = document.getElementById("location").value;

        // Calculate maximum house price based on standard affordability rules
        const maxLoan = calculateMaxLoan(income, debt, location);
        const maxHousePrice = maxLoan + downPayment;

        // Generate advice
        adviceContent.innerHTML = `
            Based on your inputs:
            <ul>
                <li>Max Loan Amount: $${maxLoan.toLocaleString()}</li>
                <li>Max Home Price (including down payment): $${maxHousePrice.toLocaleString()}</li>
            </ul>
            Advice: ${
                location === "high"
                    ? "Consider saving a higher down payment or exploring homes in nearby areas with lower living costs."
                    : "You're on track! Focus on affordability and keeping your debt-to-income ratio below 36%."
            }
        `;
    });

    function calculateMaxLoan(income, debt, location) {
        // Debt-to-income ratio threshold based on location
        const dtiThreshold = location === "low" ? 0.36 : location === "medium" ? 0.33 : 0.28;

        // Calculate annual debt
        const annualDebt = debt * 12;

        // Determine maximum annual housing budget
        const maxHousingBudget = (income * dtiThreshold) - annualDebt;

        // Convert to a maximum loan amount (e.g., assume 30-year loan at ~4% interest)
        return maxHousingBudget * 4; // Simplified multiplier for affordability
    }
});
