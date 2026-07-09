async function sendMessage() {
  const input = document.getElementById("message");
  const chat = document.getElementById("chat");

  const message = input.value.trim();
  if (!message) return;

  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      chat.innerHTML += `<p><b>Error:</b> ${data.error.message}</p>`;
      return;
    }

    chat.innerHTML += `<p><b>
