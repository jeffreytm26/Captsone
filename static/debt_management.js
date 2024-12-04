document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("debt-management-form");
    const output = document.getElementById("repayment-output");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const loanAmount = parseFloat(document.getElementById("loan-amount").value);
        const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
        const monthlyPayment = parseFloat(document.getElementById("monthly-payment").value);
        const extraPayment = parseFloat(document.getElementById("extra-payment").value || 0);

        if (loanAmount <= 0 || interestRate < 0 || monthlyPayment <= 0) {
            output.innerHTML = "<p>Please enter valid values.</p>";
            return;
        }

        const totalMonthly = monthlyPayment + extraPayment;
        const monthlyInterestRate = interestRate / 12;

        let remainingBalance = loanAmount;
        let months = 0;
        let totalInterest = 0;

        while (remainingBalance > 0) {
            const interest = remainingBalance * monthlyInterestRate;
            totalInterest += interest;
            const principal = totalMonthly - interest;

            if (principal <= 0) {
                output.innerHTML = "<p>Monthly payment is too low to cover the interest.</p>";
                return;
            }

            remainingBalance -= principal;
            months++;
        }

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        output.innerHTML = `
            <p>Total Interest Paid: $${totalInterest.toFixed(2)}</p>
            <p>Time to Pay Off: ${years} years and ${remainingMonths} months</p>
        `;
    });
});
