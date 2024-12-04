document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What is the main purpose of credit scores?",
            options: ["To determine loan eligibility", "To track your spending", "To measure income", "To calculate taxes"],
            correct: "To determine loan eligibility"
        },
        {
            question: "Which investment is considered the safest?",
            options: ["Stocks", "Bonds", "Real Estate", "Gold"],
            correct: "Bonds"
        },
        {
            question: "What does 'ROI' stand for in finance?",
            options: ["Rate of Interest", "Return on Investment", "Revenue over Income", "Return of Investment"],
            correct: "Return on Investment"
        },
        {
            question: "What is the purpose of a 401(k) account?",
            options: ["To save for a vacation", "To save for retirement", "To pay for medical expenses", "To pay off debt"],
            correct: "To save for retirement"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionContainer = document.getElementById("question");
    const optionsList = document.getElementById("options-list");
    const scoreContainer = document.getElementById("score");
    const nextButton = document.getElementById("next-button");

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
        optionsList.innerHTML = "";

        currentQuestion.options.forEach(option => {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option-btn");
            button.addEventListener("click", () => handleAnswer(option));
            li.appendChild(button);
            optionsList.appendChild(li);
        });
    }

    function handleAnswer(selectedOption) {
        const correctAnswer = questions[currentQuestionIndex].correct;
        if (selectedOption === correctAnswer) {
            score += 10;
            scoreContainer.textContent = score;
        }
        nextButton.style.display = "inline-block";
    }

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            nextButton.style.display = "none";
        } else {
            questionContainer.textContent = "You've completed the quiz! Final Score: " + score;
            optionsList.innerHTML = "";
            nextButton.style.display = "none";
        }
    });

    // Start the first question
    loadQuestion();
});
