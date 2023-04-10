const socket = io("http://localhost:3000", {});

const clientsTotal = document.getElementById('client-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

const sendMessage = () => {
    if(messageInput.value == '') return;
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data);
    AddMessageToUI(true, data);
    messageInput.value = ''
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage()
})

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Clients: ${data}`
});

socket.on('chat-message', (data) => {
    // console.log(data);
    AddMessageToUI(false, data);
});

function AddMessageToUI(isOwnMessage, data){
    const element = `
    <li class = "message-left">
        <p class="${isOwnMessage ? 'message-right' : 'message-left'}">
        ${data.message}
        <span>${data.name}● ${moment(data.dateTime).fromNow()}</span>
        </p>
    </li>
    `
    messageContainer.innerHTML += element;
    scrolltoBottom();
}

function scrolltoBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
}