async function sendMessage() {
  const input = document.getElementById("message");
  const chat = document.getElementById("chat");

  const message = input.value.trim();
  if (!message) return;

  // User message
  chat.innerHTML += `
    <div class="user-message">
      <b>🧑 You:</b> ${message}
    </div>
  `;

  input.value = "";

  // Loading
  chat.innerHTML += `
    <div id="loading" class="bot-message">
      ⏳ Bikachu AI is thinking...
    </div>
  `;

  chat.scrollTop = chat.scrollHeight;

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

    document.getElementById("loading").remove();

    chat.innerHTML += `
      <div class="bot-message">
        🤖 <b>Bikachu AI:</b><br>
        ${data.reply}
      </div>
    `;

    chat.scrollTop = chat.scrollHeight;

  } catch (error) {

    const loading = document.getElementById("loading");
    if (loading) loading.remove();

    chat.innerHTML += `
      <div class="bot-message">
        ❌ Error:<br>
        ${error.message}
      </div>
    `;

  }

}

document.getElementById("send").addEventListener("click", sendMessage);

document.getElementById("message").addEventListener("keypress", function(e){

    if(e.key==="Enter"){
        sendMessage();
    }

});
