const getElem = selector => document.querySelector(selector);
class User {
    id;
    login;
    password;
    email;
    constructor(id, login, password, email) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.email = email;
    }
}
let users = [], index, currentIndex, userIndex, testLogin, testPassword, testEmail;
let addBTN = getElem('.add-btn-form');
let editBTN = getElem('.edit-btn-form');
let form = getElem('.form');
let loginRegExp = /^[a-zA-Z]{4,16}$/i;
let passRegExp = /^[-.\w]{4,16}$/i;
let emailRegExp = /^[a-zA-Z-.\d]+@[a-zA-Z]+\.+[a-zA-Z]+/i;
const checkButton = () => {
    if (testLogin && testPassword && testEmail) {
        addBTN.removeAttribute('disabled');
        editBTN.removeAttribute('disabled');
        addBTN.classList.add('active');
    }
    else {
        addBTN.setAttribute('disabled', 'disabled');
        editBTN.setAttribute('disabled', 'disabled');
    }
};
const render = () => {
    getElem('.table-body').innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        index = users.indexOf(users[i]);
        getElem('.table-body').insertAdjacentHTML("beforeEnd", `<tr class = "border" > <td class = "index">${index + 1}</td>
        <td class = "user-login"> ${users[i].login} </td><td class = "user-password"> ${users[i].password}</td > 
        <td class = "user-email"> ${users[i].email} </td>
        <td class = "user-edit"> <input type = "button" class = "btn-edit" value = "Edit" data-id = "${index + 1}"> </td>
        <td class = "user-delete"> <input type = "button" class = "btn-delete" value = "Delete" data-id = "${index + 1}"> </td></tr>`);
    }
    ;
};
const addUser = () => {
    let user = {
        id: index,
        login: getElem('.login').value,
        password: getElem('.password').value,
        email: getElem('.email').value
    };
    users.push(user);
    render();
    form.reset();
};
const deleteUser = () => {
    currentIndex = event.target.dataset.id;
    users.splice(currentIndex - 1, 1);
};
const editUser = () => {
    userIndex = event.target.dataset.id;
    getElem('.login').value = users[userIndex - 1].login;
    getElem('.password').value = users[userIndex - 1].password;
    getElem('.email').value = users[userIndex - 1].email;
    addBTN.classList.add('hide');
    editBTN.classList.remove('hide');
};
const saveEditUser = () => {
    let user = new User(users[userIndex - 1].id, `${getElem('.login').value}`, `${getElem('.password').value}`, `${getElem('.email').value}`);
    users[userIndex - 1] = user;
    render();
    form.reset();
    addBTN.classList.remove('hide');
    editBTN.classList.add('hide');
};
getElem('.login').addEventListener('input', function () {
    testLogin = loginRegExp.test(getElem('.login').value);
    checkButton();
});
getElem('.password').addEventListener('input', function () {
    testPassword = passRegExp.test(getElem('.password').value);
    checkButton();
});
getElem('.email').addEventListener('input', function () {
    testEmail = emailRegExp.test(getElem('.email').value);
    checkButton();
});
addBTN.addEventListener('click', function () {
    addUser();
});
editBTN.addEventListener('click', function () {
    saveEditUser();
});
getElem('.table-body').addEventListener('click', function (element) {
    if (element.target.value === 'Delete') {
        deleteUser();
        render();
    }
    if (element.target.value === 'Edit') {
        editUser();
    }
});
