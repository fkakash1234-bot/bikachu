async function sendMessage() {
  const input = document.getElementById("message");
  const chat = document.getElementById("chat");

  const message = input.value.trim();
  if (!message) return;

  chat.innerHTML += `<div class="user"><b>You:</b> ${message}</div>`;
  input.value = "";

  try {
    const response = await fetch("https://bikachu.fkakash1234.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    chat.innerHTML += `<div class="bot"><b>Bikachu AI:</b> ${data.reply}</div>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    chat.innerHTML += `<div class="bot"><b>Error:</b> ${err.message}</div>`;
  }
}

document.getElementById("send").addEventListener("click", sendMessage);

document.getElementById("message").addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});
