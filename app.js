const API_KEY = "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";

async function sendMessage() {
    const input = document.getElementById("message");
    const chat = document.getElementById("chat");

    const message = input.value.trim();
    if (!message) return;

    chat.innerHTML += `<div class="user"><b>You:</b> ${message}</div>`;
    input.value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are Bikachu AI, a helpful assistant."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            chat.innerHTML += `<div class="bot"><b>Error:</b> ${data.error.message}</div>`;
            return;
        }

        const reply = data.choices[0].message.content;

        chat.innerHTML += `<div class="bot"><b>Bikachu AI:</b> ${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;

    } catch (err) {
        chat.innerHTML += `<div class="bot"><b>Error:</b> ${err.message}</div>`;
    }
}
