const btnLogIn = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-registration');
const btnSendMessage = document.getElementById('btn-send');
const btnLogOut = document.getElementById('btn-logout');

const inputLogIn = document.getElementById('input-login');
const inputRegName = document.getElementById('input-reg-name');
const inputRegEmail = document.getElementById('input-reg-email');
const inputMessage = document.getElementById('input-field');

const aside = document.getElementById('aside');
const loggedinUserName = document.getElementById('user-name');
const modal = document.getElementById('cover');
const messageContainer = document.getElementById('main');

let users = [];
let userName = '';
let userEmail = '';
let currentUser = {};
let id = 0;
let messageText = '';

class User {
    constructor (id, name, email, status="offline") {
        this.id = id;
        this.name = name;
        this.email = email,
        this.status = status;
    }
}

function userCheck() {

    for (let i=0; i < users.length; i++) {
        if (users[i].name == userName) return users[i];
    };
        return false;
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


inputLogIn.addEventListener('change', function(e) {
    userName = e.target.value;
});

inputRegName.addEventListener('change', function(e) {
    userName = e.target.value;
   });

inputRegEmail.addEventListener('change', function(e) {
    userEmail = e.target.value;
   });

btnLogIn.addEventListener('click', function (e) {

    e.stopPropagation();
    e.preventDefault();

    if (userCheck())  {
    currentUser = userCheck();
    currentUser.status = "online";
    modal.style.display='none';

    loggedinUserName.innerHTML = `<i class="fas fa-user-alt"></i> ${currentUser.name}`;
    aside.innerHTML += `<p> ${currentUser.name} <sup class="user-status">${currentUser.status}</sup> </p>`;

    } else alert ('Please register!');

    inputLogIn.value = '';

});

btnRegister.addEventListener('click', function(e) {

    e.stopPropagation();
    e.preventDefault();

    if (userCheck())  {
        alert("This username is already taken!");
        inputRegEmail.value = '';
        inputRegName.value = '';
        return;
    }

    id++;

    users.push(new User (id, userName, userEmail));

    inputRegEmail.value = '';
    inputRegName.value = '';


});

inputMessage.addEventListener('change', function(e) {
    messageText = e.target.value;
   });

btnSendMessage.addEventListener('click',  function() {
    renderMessage(loggedinUserName.innerHTML, messageText);
    inputMessage.value = '';
});

btnLogOut.addEventListener('click', function (e) {
    currentUser.status = "offline";
    modal.style.display='block';
    console.log(users);
});









