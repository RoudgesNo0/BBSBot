document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('question-form');
    const questionInput = document.getElementById('question');
    const responseText = document.getElementById('response-text');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const question = questionInput.value.trim();

        if (!question) {
            alert('Bitte gib eine Frage ein.');
            return;
        }

        // Call the backend
        try {
            const response = await fetch('/proxy/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: question }),
            });

            const data = await response.json();
            if (response.ok) {
                responseText.textContent = data.answer || "Keine Antwort erhalten.";
            } else {
                responseText.textContent = `Fehler: ${data.error}`;
            }
        } catch (error) {
            responseText.textContent = 'Es gab einen Fehler beim Verbinden mit dem Server.';
        }
    });
});
