const btnLogIn = document.getElementById('btn-login');
const btnSendMessage = document.getElementById('btn-send');
const btnLogOut = document.getElementById('btn-logout');

const inputName = document.getElementById('input-name');
const inputNickname = document.getElementById('input-nickname');
const inputMessage = document.getElementById('input-message');

const aside = document.getElementById('aside');
const loggedinUserName = document.getElementById('user-name');
const modal = document.getElementById('cover');
const messageContainer = document.getElementById('main');

const backendUrl = 'http://127.0.0.1:9000/chat/';

let currentUserName = '';
let currentUserNickname = '';
let currentUser = {};
let messageText = '';


class User {
    constructor (name, nickname, status="online") {
        this.name = name;
        this.nickname = nickname,
        this.status = status;
    }
}


function createUser(data) {
    return fetch(backendUrl + "users/", {method: 'POST', headers: {'Content-Type': 'application/json'}, mode: "cors", body: JSON.stringify(data)})
    .then(response => response.json())
    .then(data => {
        currentUser = data;
        currentUser.status = "online";
        loggedinUserName.innerHTML = `<i class="fas fa-user-alt"></i> ${currentUser.name}`;
        aside.innerHTML += `<p> ${currentUser.nickname} <sup class="user-status">${currentUser.status}</sup> </p>`;
});
};
    
function renderMessage (author, content) {

    let date = new Date().toDateString();

    let message = document.createElement('div');
    message.classList.add('message');

    message.innerHTML = `<div class ="message-info">
    <div class ="author">${author}</div>
    <div class ="date">${date}</div>
    </div>
    <p class = "message-content">${content}</p>`

    messageContainer.appendChild(message);
}


inputName.addEventListener('change', function(e) {
    currentUserName = e.target.value;
});

inputNickname.addEventListener('change', function(e) {
    currentUserNickname = "@" + e.target.value;
   });

btnLogIn.addEventListener('click', function (e) {

    e.stopPropagation();
    e.preventDefault();

    let newUser = new User (currentUserName, currentUserNickname);

    fetch(backendUrl + "users/" + currentUserNickname)
    .then(response => response.json())
    .then(data => {
        currentUser = data[0];
        if (currentUser) {
            currentUser.status = "online";
            loggedinUserName.innerHTML = `<i class="fas fa-user-alt"></i> ${currentUser.name}`;
            aside.innerHTML = `<p> ${currentUser.nickname} <sup class="user-status">${currentUser.status}</sup> </p>`;
        } else {
            createUser(newUser);
        }
        modal.style.display='none';
    })   

    inputName.value = '';
    inputNickname.value = '';
});

inputMessage.addEventListener('change', function(e) {
    messageText = e.target.value;
   });

btnSendMessage.addEventListener('click',  function() {
    renderMessage(currentUserNickname, messageText);
    inputMessage.value = '';
});

btnLogOut.addEventListener('click', function (e) {
    console.log(currentUser);
    currentUser.status = "offline";
    console.log(currentUser);
    modal.style.display='block';
});









