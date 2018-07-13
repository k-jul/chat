const btnLogIn = document.getElementById('btn-login');
const btnSendMessage = document.getElementById('btn-send');
const btnLogOut = document.getElementById('btn-logout');

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
    constructor(senderId, receiverId = '5b48e17ebce6e02ca6ef27fc', sendingTime, body) {
        this.senderId = senderId;
        this.receiverId = receiverId;
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

function renderMessages (messages) {

    messages.forEach(element => {

        let message = document.createElement('div');
        message.classList.add('message');

        message.innerHTML = `<div class ="message-info">
<div class ="author">${element.senderId.name} <i>${element.senderId.nickname}</i></div>
<div class ="date">${(element.sendingTime)}</div>
</div>
<p class = "message-content">${element.body}</p>`

        messageContainer.appendChild(message);
    });

}

function getAllMessages() {

    fetch(backendUrl + "messages/")
        .then(response => response.json())
        .then(data => {
            messageContainer.innerHTML = '';
            lastMsgDate = data[data.length-1].sendingTime;
            renderMessages(data);
            
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
            renderMessages([msg]);
            lastMsgDate = msg.sendingTime;
        });
};

function getNewMessages (lastMsgDate) {
     fetch(backendUrl + "messages?lasMsgDate=" + lastMsgDate)
    .then(response => response.json())
    .then(data => {
        renderMessages(data);
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
    console.log(registeredUsers);

});

btnSendMessage.addEventListener('click', function () {

    let timeWhenSent = new Date();

    fetch(backendUrl + "users/" + currentUserNickname)
        .then(response => response.json())
        .then(data => {
            currentUser = data[0];

            let message = new Message(currentUser['_id'], receiverId = '', timeWhenSent, currentMessageText);
            createMessage(message);

            inputMessage.value = '';
        });
        
        getAllMessages();

});

btnLogOut.addEventListener('click', function (e) {
    modal.style.display = 'block';
});