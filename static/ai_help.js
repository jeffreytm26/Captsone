document.addEventListener("DOMContentLoaded", () => {
    const askAiButton = document.getElementById("ask-ai-button");
    const aiPromptInput = document.getElementById("ai-prompt");
    const aiSuggestionsDiv = document.getElementById("ai-suggestions");

    askAiButton.addEventListener("click", async () => {
        const userInput = aiPromptInput.value.trim();

        if (userInput === "") {
            aiSuggestionsDiv.innerHTML = 'Please enter a question.';
            return;
        }

        aiSuggestionsDiv.innerHTML = 'Generating AI suggestions...';  // Placeholder text

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
                aiSuggestionsDiv.innerHTML = `<p>Error: ${data.error}</p>`;
            } else {
                aiSuggestionsDiv.innerHTML = `<p>${data.suggestions}</p>`;  // Display the AI suggestions
            }
        } catch (e) {
            aiSuggestionsDiv.innerHTML = `<p>Error: ${e.message}</p>`;
        }
    });
});
