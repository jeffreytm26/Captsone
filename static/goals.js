document.addEventListener("DOMContentLoaded", () => {
    let goals = [];

    const goalsForm = document.getElementById("goals-form");
    const dashboardContent = document.getElementById("dashboard-content");

    // Handle Goal Form Submission
    goalsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const goalName = document.getElementById("goal-name").value.trim();
        const goalAmount = parseFloat(document.getElementById("goal-amount").value);

        if (goalName === "" || isNaN(goalAmount) || goalAmount <= 0) {
            alert("Please enter a valid goal name and amount.");
            return;
        }

        goals.push({ name: goalName, amount: goalAmount });
        document.getElementById("goal-name").value = ""; // Clear input field
        document.getElementById("goal-amount").value = ""; // Clear input field
        updateGoalsDashboard();
    });

    function updateGoalsDashboard() {
        dashboardContent.innerHTML = ""; // Clear the current content

        if (goals.length > 0) {
            const goalsInfo = document.createElement("div");
            goalsInfo.innerHTML = "<h3>Financial Goals</h3>";
            const goalsList = document.createElement("ul");

            goals.forEach((goal, index) => {
                const goalItem = document.createElement("li");
                goalItem.innerHTML = `
                    ${goal.name}: Goal Amount $${goal.amount.toFixed(2)}
                    <button class="delete-goal" data-index="${index}">Delete</button>
                `;
                goalsList.appendChild(goalItem);
            });

            goalsInfo.appendChild(goalsList);
            dashboardContent.appendChild(goalsInfo);

            // Add delete functionality for each goal
            const deleteButtons = document.querySelectorAll(".delete-goal");
            deleteButtons.forEach(button => {
                button.addEventListener("click", (event) => {
                    const index = parseInt(event.target.getAttribute("data-index"));
                    goals.splice(index, 1); // Remove the goal from the array
                    updateGoalsDashboard(); // Refresh the dashboard
                });
            });
        } else {
            dashboardContent.innerHTML = "<p>No financial goals added yet.</p>";
        }
    }
});
