document.addEventListener("DOMContentLoaded", () => {
    let monthlyIncome = 0;
    let monthlyBudget = 0;
    let expenses = [];
    let goals = [];

    const budgetForm = document.getElementById("budget-form");
    budgetForm.addEventListener("submit", (event) => {
        event.preventDefault();
        monthlyIncome = parseFloat(document.getElementById("monthly-income").value);
        monthlyBudget = parseFloat(document.getElementById("monthly-budget").value);
        updateDashboard();
    });

    const expensesForm = document.getElementById("expenses-form");
    expensesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const expenseCategory = document.getElementById("expense-category").value;
        const expenseAmount = parseFloat(document.getElementById("expense-amount").value);
        expenses.push({ category: expenseCategory, amount: expenseAmount });
        updateDashboard();
    });

    const goalsForm = document.getElementById("goals-form");
    goalsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const goalName = document.getElementById("goal-name").value;
        const goalAmount = parseFloat(document.getElementById("goal-amount").value);
        goals.push({ name: goalName, amount: goalAmount });
        updateDashboard();
    });

    function updateDashboard() {
        const dashboardContent = document.getElementById("dashboard-content");
        dashboardContent.innerHTML = "";

        const budgetInfo = document.createElement("div");
        budgetInfo.innerHTML = `<h3>Budget Overview</h3><p>Monthly Income: $${monthlyIncome.toFixed(2)}</p><p>Monthly Budget: $${monthlyBudget.toFixed(2)}</p>`;
        dashboardContent.appendChild(budgetInfo);

        if (expenses.length > 0) {
            const expensesInfo = document.createElement("div");
            expensesInfo.innerHTML = "<h3>Expenses</h3>";
            const expensesList = document.createElement("ul");
            expenses.forEach(expense => {
                const expenseItem = document.createElement("li");
                expenseItem.textContent = `${expense.category}: $${expense.amount.toFixed(2)}`;
                expensesList.appendChild(expenseItem);
            });
            expensesInfo.appendChild(expensesList);
            dashboardContent.appendChild(expensesInfo);
        }

        if (goals.length > 0) {
            const goalsInfo = document.createElement("div");
            goalsInfo.innerHTML = "<h3>Financial Goals</h3>";
            const goalsList = document.createElement("ul");
            goals.forEach(goal => {
                const goalItem = document.createElement("li");
                goalItem.textContent = `${goal.name}: Goal Amount $${goal.amount.toFixed(2)}`;
                goalsList.appendChild(goalItem);
            });
            goalsInfo.appendChild(goalsList);
            dashboardContent.appendChild(goalsInfo);
        }
    }

    const askAiButton = document.getElementById("ask-ai-button");
    askAiButton.addEventListener("click", async () => {
        const userData = { income: monthlyIncome, budget: monthlyBudget, expenses: expenses, goals: goals };

        try {
            // Send a request to the Python Flask backend
            const response = await fetch('/generate-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: `Based on the following data, suggest financial improvements: Income: ${userData.income}, Budget: ${userData.budget}, Expenses: ${JSON.stringify(userData.expenses)}, Goals: ${JSON.stringify(userData.goals)}`
                }),
            });

            const aiResponse = await response.json();
            const aiSuggestions = document.getElementById("ai-suggestions");
            aiSuggestions.innerHTML = "<h3>AI Suggestions</h3>";
            aiSuggestions.innerHTML += `<p>${aiResponse.suggestions}</p>`;
        } catch (error) {
            console.error("Error with AI request:", error);
            const aiSuggestions = document.getElementById("ai-suggestions");
            aiSuggestions.innerHTML = "<p>There was an error getting AI suggestions. Please try again later.</p>";
        }
    });
});