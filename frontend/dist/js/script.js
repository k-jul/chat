
const btnLogIn = document.getElementById('btn-login');
const btnSendMessage = document.getElementById('btn-send');

const inputName = document.getElementById('input-name');
const inputNickname = document.getElementById('input-nickname');
const inputMessage = document.getElementById('input-message');

const userList = document.getElementById('user-list');
const loggedinUserName = document.getElementById('user-name');
const modal = document.getElementById('cover');
const messageContainer = document.getElementById('main');

const backendUrl = 'http://127.0.0.1:9000/chat/';

let registeredUsers = [];
let lastMsgDate;
let currentUser = {};
let currentUserName = '';
let currentUserNickname = '';

let currentMessage = {};
let currentMessageText = '';


class User {
    constructor(name, nickname, status = "online") {
        this.name = name;
        this.nickname = nickname,
            this.status = status;
    }
}

class Message {
    constructor(senderId, sendingTime, body) {
        this.sender = senderId;
        this.sendingTime = sendingTime;
        this.body = body;
    }
}

function createUser(data) {
    return fetch(backendUrl + "users/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            currentUser = data;
            loggedinUserName.innerHTML = `<i class="fas fa-user-alt"></i> ${currentUser.name}`;
            userList.innerHTML += `<li> ${currentUser.name} (${currentUser.nickname}) </li>`;
        });
};


function renderUserList() {

    fetch(backendUrl + "users/")
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = '';
            data.forEach(element => {
                registeredUsers.push(element);
                userList.innerHTML += element.nickname !== "@general" ? `<li> ${element.name} (${element.nickname}) </li>` : '';
            });
        })
};

function checkAndTrim100Msg (){

    let renderedMessages = messageContainer.children;

    if (renderedMessages.length >=100) {
        let exceeding = renderedMessages.length - 100;
        for (let i = 0; i < exceeding; i++) {
            messageContainer.removeChild(renderedMessages[0]);
        }
    }
}

function renderMessages (messages) {

    messages.forEach(element => {


        let message = document.createElement('div');
        message.classList.add('message');

        message.innerHTML = `<div class ="message-info">
<div class ="author">${element.sender.name} <i>${element.sender.nickname}</i></div>
<div class ="date">${moment(element.sendingTime).format('Mo MMMM YYYY hh:mm:ss')}</div>
</div>
<p class = "message-content">${element.body}</p>`

        messageContainer.appendChild(message);

        if(new RegExp(`.*${currentUserNickname}.*`).test(element.body)) message.style.background="#aade8c";

        checkAndTrim100Msg();
        messageContainer.scrollTop = messageContainer.scrollHeight;


    });

}

function getAllMessages() {

    fetch(backendUrl + "messages/")
        .then(response => response.json())
        .then(data => {
            if (data.length) {
            messageContainer.innerHTML = '';
            lastMsgDate = moment(data[data.length-1].sendingTime);
            renderMessages(data);
            } else return;            
        })

}

function createMessage(data) {

    return fetch(backendUrl + "messages/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(msg => {
            getNewMessages();
        
        });
};

function getNewMessages () {

    if (!lastMsgDate) lastMsgDate = moment().subtract(1, 'hours');

    return fetch(backendUrl + "messages/getNewMessages?lastMsgDate=" + lastMsgDate)
    .then(response => response.json())
    .then(data => {
        if (data.length) {
        lastMsgDate = moment(data[data.length-1].sendingTime);
        renderMessages(data);
        } else return;
    })
}



inputName.addEventListener('change', function (e) {
    currentUserName = e.target.value;
});

inputNickname.addEventListener('change', function (e) {
    currentUserNickname = "@" + e.target.value;
});

btnLogIn.addEventListener('click', function (e) {

    let newUser = new User(currentUserName, currentUserNickname);

    fetch(backendUrl + "users/" + currentUserNickname)
        .then(response => response.json())
        .then(data => {
            currentUser = data[0];
            if (currentUser) {
                modal.style.display = 'none';
                loggedinUserName.innerHTML = `<i class="fas fa-user-alt"></i> ${currentUser.name}`;
            } else {
                createUser(newUser);
                modal.style.display = 'none';
            }

            renderUserList();
            getAllMessages();
        })

    inputName.value = '';
    inputNickname.value = '';
});

inputMessage.addEventListener('change', function (e) {
    currentMessageText = e.target.value;

});

inputMessage.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {

    let message = new Message(currentUser['_id'], new Date (), currentMessageText);
    createMessage(message);

    inputMessage.value = '';

    }

});

btnSendMessage.addEventListener('click', function () {

    let message = new Message(currentUser['_id'], new Date(), currentMessageText);
    createMessage(message);

    inputMessage.value = '';
        
    //getNewMessages (lastMsgDate);

});

setInterval(getNewMessages, 1000);