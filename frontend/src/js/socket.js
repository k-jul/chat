const socket = io.connect('http://127.0.0.1:9000');

const btnLogIn = document.getElementById('btn-login');
const btnSendMessage = document.getElementById('btn-send');
const inputName = document.getElementById('input-name');
const inputNickname = document.getElementById('input-nickname');
const inputMessage = document.getElementById('input-message');
const userList = document.getElementById('user-list');
const loggedinUserName = document.getElementById('user-name');
const modal = document.getElementById('cover');
const messageContainer = document.getElementById('main');
const typingStatus = document.getElementById('typing-status');

let registeredUsers = [];
let lastMsgDate;
let currentUser = {};
let currentUserName = '';
let currentUserNickname = '';
let currentMessageText = '';

class User {
    constructor(name, nickname, status = "just_appeared") {
        this.name = name;
        this.nickname = nickname,
        this.status = status;
    }
}

class Message {
    constructor(sender, sendingTime, body) {
        this.sender = sender;
        this.sendingTime = sendingTime;
        this.body = body;
    }
}

function renderMessages(messages) {
    messages.forEach(element => {
        let message = document.createElement('div');
        message.classList.add('message');
        message.innerHTML = `<div class ="message-info">
<div class ="author">${element.sender.name} <i>${element.sender.nickname}</i></div>
<div class ="date">${moment(element.sendingTime).format('Mo MMMM YYYY hh:mm:ss')}</div>
</div>
<p class = "message-content">${element.body}</p>`
        messageContainer.appendChild(message);
        if (new RegExp(`.*${currentUserNickname}.*`).test(element.body)) message.style.background = "#aade8c";
        checkAndTrim100Msg();
        messageContainer.scrollTop = messageContainer.scrollHeight;
    });
};

function checkAndTrim100Msg() {
    let renderedMessages = messageContainer.children;
    if (renderedMessages.length >= 100) {
        let exceeding = renderedMessages.length - 100;
        for (let i = 0; i < exceeding; i++) {
            messageContainer.removeChild(renderedMessages[0]);
        }
    }
}

function renderUserList(data) {
    userList.innerHTML = '';
    data.forEach(element => {
        if (!registeredUsers.length) registeredUsers.push(element);
        userList.innerHTML += `<li id=${element._id}> ${element.name} (<span class = "nickname">${element.nickname}<span>) <sup class=${element.status}>${element.status.replace('_', ' ')}<sup> </li>`;
    });
};

function updateUserStatus(user) {
    let userToUpdate = document.getElementById(user._id);
    userToUpdate.innerHTML = `${user.name} (<span class = "nickname">${user.nickname}<span>) <sup class=${user.status}>${user.status.replace('_', ' ')}<sup>`
}

function renderAlertMsg(user, alert) {
    let message = document.createElement('div');
    message.classList.add('message');
    message.classList.add('message-alert');
    message.innerHTML = ` <div class ="message-info alert">${moment().format('Mo MMMM YYYY hh:mm:ss')}</div>
<p class = "message-content"><b>${user.name} <i> ${user.nickname}</i></b> ${alert} </p>`
    messageContainer.appendChild(message);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

socket.on('connection:success', () => {
    socket.emit('get:initial:messages', {});
    socket.emit('get:initial:users', {});

});

socket.on('get:initial:messages:success', messages => renderMessages(messages));
socket.on('get:initial:users:success', users => {
    registeredUsers = users;
    renderUserList(users);
});

inputName.addEventListener('change', e => {
    currentUserName = e.target.value;
});

inputNickname.addEventListener('change', e => {
    currentUserNickname = "@" + e.target.value;
});

btnLogIn.addEventListener('click', e => {
    let newUser = new User(currentUserName, currentUserNickname);
    socket.emit('login', newUser);
});

socket.on('login:success', user => {
    currentUser = user;
    modal.style.display = 'none';
    loggedinUserName.innerHTML = `<i class="fas fa-user-alt"></i> ${currentUser.name}`;
})

socket.on('user:entered', user => {
    if (!registeredUsers.find(element => element._id === user._id)) {
        registeredUsers.push(user);
        renderUserList(registeredUsers);
    }
    renderAlertMsg(user, "just entered the chat");
});

inputMessage.addEventListener('focus', function (e) {
    socket.emit('user:typing', currentUser);
});

inputMessage.addEventListener('blur', function (e) {
    socket.emit('user:stopped:typing', currentUser);
})

inputMessage.addEventListener('change', function (e) {
    currentMessageText = e.target.value;
});

inputMessage.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        let message = new Message(currentUser._id, new Date(), currentMessageText);
        socket.emit('new:message', [currentUser, message]);
        inputMessage.value = '';
    }
});

btnSendMessage.addEventListener('click', function () {
    let message = new Message(currentUser, new Date(), currentMessageText);
    socket.emit('new:message', [currentUser, message]);
    inputMessage.value = '';
});

socket.on('new:message', msg => {
    renderMessages([msg]);
})

socket.on('user:typing', typingUser => {
    typingStatus.innerHTML = `${typingUser.name} ${typingUser.nickname} is typing...`;
})

socket.on('user:stopped:typing', (userStoppedTyping) => {
    typingStatus.innerHTML = '';
});

socket.on('user:change:status', user => {
    updateUserStatus(user);
})
socket.on('user:left', user => {
    renderAlertMsg(user, "just left the chat");
})