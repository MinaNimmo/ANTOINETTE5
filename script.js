const chat = document.getElementById("chat");
const input = document.getElementById("userInput");



const model = "EleutherAI/gpt-j-6B";

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const userText = input.value.trim();
    if (!userText) return;

    chat.textContent += `YOU: ${userText}\n`;
    input.value = "";

    const prompt = `You are Marie Antoinette. You're horny, flirty, scandalous, dramatic, and you love cake. Respond to this:\n\n"${userText}"`;

    try {
   const res = await fetch("https://YOUR_REPLIT_URL/ask", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ prompt })
});


      const data = await res.json();

      if (data.error) {
        chat.textContent += `MARIE: Zut alors... I'm unavailable right now.\n`;
        console.error(data.error);
        return;
      }

      const reply = data[0]?.generated_text?.replace(prompt, "").trim() || "Marie is speechless.";
      chat.textContent += `MARIE: ${reply}\n`;
      chat.scrollTop = chat.scrollHeight;
    } catch (err) {
      chat.textContent += `MARIE: I cannot respond, darling.\n`;
      console.error(err);
    }
  }
});
