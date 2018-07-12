const btnLogIn = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-registration');

const inputLogIn = document.getElementById('input-login');
const inputRegName = document.getElementById('input-reg-name');
const inputRegEmail = document.getElementById('input-reg-email');
const inputMessage = document.getElementById('btn-send');

const aside = document.getElementById('aside');
const loggedinUserName = document.getElementById('user-name');
const modal = document.getElementById('cover');

let users = [];

class User {
    constructor (id, name, email, status="offline") {
        this.id = id;
        this.name = name;
        this.email = email,
        this.status = status;
    }
}

let userName = '';
let userEmail = '';
let id = 0;

function userCheck() {

    for (let i=0; i < users.length; i++) {
        if (users[i].name == userName) return users[i];
    };
        return false;
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
    let currentUser = userCheck();
    currentUser.status = "online";
    modal.style.display='none';

    loggedinUserName.innerHTML = currentUser.name;

    console.log(users);

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
    console.log(users);

    inputRegEmail.value = '';
    inputRegName.value = '';


});






