let allMessages = [];

function sendMessage() {
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;

    if (message.trim() === '') return;

    fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user, message: message }),
    }).then(response => response.json())
      .then(data => {
          console.log(data);
          fetchMessages();
          document.getElementById('message').value = '';
      });
}

function fetchMessages() {
    fetch('/get_messages')
    .then(response => response.json())
    .then(data => {
        allMessages = data;
        displayMessages();
    });
}

function displayMessages() {
    const messages = document.getElementById('messages');
    messages.innerHTML = '';

    allMessages.forEach(msg => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = msg;
        messages.appendChild(li);
    });

    const container = document.getElementById('messages-container');
    container.scrollTop = container.scrollHeight;
}

document.getElementById('message').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

setInterval(fetchMessages, 2000);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registrado con éxito:', registration);
        }).catch(function(error) {
            console.log('Error al registrar el ServiceWorker:', error);
        });
    });
}
