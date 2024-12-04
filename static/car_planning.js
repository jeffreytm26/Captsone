document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("car-planning-form");
    const adviceOutput = document.getElementById("advice-output");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Capture user inputs
        const monthlyIncome = parseFloat(document.getElementById("monthly-income").value);
        const monthlyExpenses = parseFloat(document.getElementById("monthly-expenses").value);
        const currentSavings = parseFloat(document.getElementById("current-savings").value);
        const downPayment = parseFloat(document.getElementById("down-payment").value);
        const loanTerm = parseInt(document.getElementById("loan-term").value);
        const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;

        // Calculate available monthly budget for a car loan
        const disposableIncome = monthlyIncome - monthlyExpenses;
        const maxCarPayment = (disposableIncome * 0.15).toFixed(2); // 15% of disposable income for car loan

        if (disposableIncome <= 0) {
            adviceOutput.innerHTML = `<p>Your expenses exceed your income. Consider revisiting your budget before purchasing a car.</p>`;
            return;
        }

        // Calculate maximum loan amount using the loan payment formula
        const monthlyRate = interestRate / 12;
        const totalMonths = loanTerm * 12;
        const maxLoanAmount = maxCarPayment / (monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths)));

        // Total car price (loan amount + down payment)
        const maxCarPrice = (maxLoanAmount + downPayment).toFixed(2);

        // Provide advice
        let advice = `<p>Based on your finances, your disposable income is <strong>$${disposableIncome.toFixed(2)}</strong> per month.</p>`;
        advice += `<p>You can afford a car loan payment of up to <strong>$${maxCarPayment}</strong> per month.</p>`;
        advice += `<p>With a loan term of <strong>${loanTerm} years</strong> at an interest rate of <strong>${(interestRate * 100).toFixed(2)}%</strong>, you can afford a car priced up to <strong>$${maxCarPrice}</strong> (including your down payment of $${downPayment}).</p>`;

        if (currentSavings < downPayment) {
            advice += `<p>You need to save an additional <strong>$${(downPayment - currentSavings).toFixed(2)}</strong> to meet your desired down payment.</p>`;
        } else {
            advice += `<p>You have enough savings to cover your desired down payment of <strong>$${downPayment}</strong>.</p>`;
        }

        adviceOutput.innerHTML = advice;
    });
});
