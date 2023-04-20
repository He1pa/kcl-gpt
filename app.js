const chatHistory = document.getElementById('chat-history');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

chatForm.addEventListener('submit', async event => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (message) {
    addMessage('user', message);
    chatInput.value = '';
    const response = await sendMessage(message);
    addMessage('bot', response);
  }
});

async function sendMessage(message) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      'prompt': 'Q: ' + message + 'A:',
      'temperature': 0.5,
      'max_tokens': 60,
      'top_p': 1,
      'frequency_penalty': 0,
      'presence_penalty': 0
    })
  });
  const data = await response.json();
  return data.choices[0].text.trim();
}

function addMessage(sender, message) {
  const div = document.createElement('div');
  div.classList.add(sender);
  div.textContent = message;
  chatHistory.appendChild(div);
}
