document.addEventListener("DOMContentLoaded", () => {
    let monthlyIncome = 0;
    let monthlyBudget = 0;
    let expenses = [];
    let goals = [];

    const budgetForm = document.getElementById("budget-form");
    const growthChartCanvas = document.getElementById('growth-chart');

    // Handle Budget Form Submission
    budgetForm.addEventListener("submit", (event) => {
        event.preventDefault();
        monthlyIncome = parseFloat(document.getElementById("monthly-income").value);
        monthlyBudget = parseFloat(document.getElementById("monthly-budget").value);
        const years = parseInt(document.getElementById("years").value);

        const monthlySavings = monthlyIncome - monthlyBudget;
        const totalIncomeData = [];
        const totalBudgetData = [];
        const labels = [];

        for (let year = 1; year <= years; year++) {
            totalIncomeData.push(monthlyIncome * 12 * year);
            totalBudgetData.push(monthlyBudget * 12 * year);
            labels.push(`Year ${year}`);
        }

        new Chart(growthChartCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Income',
                        data: totalIncomeData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Total Budget',
                        data: totalBudgetData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Money Growth Over Time',
                        data: totalIncomeData.map((income, index) => income - totalBudgetData[index]),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Years'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Amount ($)'
                        }
                    }
                }
            }
        });

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

    // AI Button Handling
   askAiButton.addEventListener("click", async () => {
    const userInput = document.getElementById("ai-prompt").value;

    if (userInput.trim() === "") {
        output.innerHTML = 'Please enter a question.';
        return;
    }

    output.innerHTML = 'Generating AI suggestions...';  // Placeholder text

    try {
        const response = await fetch('/generate-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: userInput })
        });

        const data = await response.json();

        if (data.error) {
            output.innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
            output.innerHTML = `<p>${data.suggestions}</p>`;  // Display the AI suggestions
        }
    } catch (e) {
        output.innerHTML = `<p>Error: ${e.message}</p>`;
    }
});
    function askAiOutput() {
    const output = document.getElementById("ai-output");
    }


// Function to handle Gemini streaming
async function* streamGemini({ model = 'gemini-pro', contents = [] } = {}) {
    let response = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ model, contents })
    });

    yield* streamResponseChunks(response);
}

// Helper function for streaming response chunks
async function* streamResponseChunks(response) {
    let buffer = '';
    const CHUNK_SEPARATOR = '\n\n';

    let processBuffer = async function* (streamDone = false) {
        while (true) {
            let chunkSeparatorIndex = buffer.indexOf(CHUNK_SEPARATOR);
            if (streamDone && chunkSeparatorIndex < 0) {
                chunkSeparatorIndex = buffer.length;
            }
            if (chunkSeparatorIndex < 0) break;

            let chunk = buffer.substring(0, chunkSeparatorIndex);
            buffer = buffer.substring(chunkSeparatorIndex + CHUNK_SEPARATOR.length);
            chunk = chunk.replace(/^data:\s*/, '').trim();
            if (!chunk) continue;

            let { error, text } = JSON.parse(chunk);
            if (error) throw new Error(error.message || JSON.stringify(error));
            yield text;
        }
    };

    const reader = response.body.getReader();
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += new TextDecoder().decode(value);
            yield* processBuffer();
        }
    } finally {
        reader.releaseLock();
    }

    yield* processBuffer(true);
}});
