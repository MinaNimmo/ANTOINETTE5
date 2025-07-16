const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const userText = input.value.trim();
    if (!userText) return;

    chat.innerHTML += `<div><strong>You:</strong> ${userText}</div>`;
    input.value = "";

    try {
      const response = await fetch("https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B", {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_HF_API_KEY", // REPLACE THIS!!!
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `You are Marie Antoinette, speaking in an elegant, playful, dirty tone.\nHuman: ${userText}\nMarie:`
        })
      });

      const data = await response.json();
