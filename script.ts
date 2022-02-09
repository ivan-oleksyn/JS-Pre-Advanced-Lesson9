const getElem = selector => document.querySelector(selector);

interface IUser{
    id:number,
    login:string,
    password:string,
    email:string
}
class User implements IUser{
    public id: number;
    public login: string;
    public password: string;
    public email: string
    constructor(id: number, login: string, password: string, email: string) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.email = email;
    }
}

/* Variables */

let users: User[] = [], index: number, currentIndex: any, userIndex: any, testLogin: boolean,
    testPassword: boolean, testEmail: boolean;
let addBTN = getElem('.add-btn-form') as HTMLInputElement;
let editBTN = getElem('.edit-btn-form') as HTMLInputElement;
let form = getElem('.form') as HTMLFormElement;
let loginRegExp = /^[a-zA-Z]{4,16}$/i;
let passRegExp = /^[-.\w]{4,16}$/i;
let emailRegExp = /^[a-zA-Z-.\d]+@[a-zA-Z]+\.+[a-zA-Z]+/i;


const checkButton = ():void =>{
    if (testLogin && testPassword && testEmail) {
        addBTN.removeAttribute('disabled');
        editBTN.removeAttribute('disabled');
        addBTN.classList.add('active');
    } else {
        addBTN.setAttribute('disabled', 'disabled');
        editBTN.setAttribute('disabled', 'disabled');
    }
};

const render = ():void =>{
    getElem('.table-body').innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        index = users.indexOf(users[i]);
        getElem('.table-body').insertAdjacentHTML("beforeEnd", `<tr class = "border" > <td class = "index">${index+1}</td>
        <td class = "user-login"> ${users[i].login} </td><td class = "user-password"> ${users[i].password}</td > 
        <td class = "user-email"> ${users[i].email} </td>
        <td class = "user-edit"> <input type = "button" class = "btn-edit" value = "Edit" data-id = "${index+1}"> </td>
        <td class = "user-delete"> <input type = "button" class = "btn-delete" value = "Delete" data-id = "${index+1}"> </td></tr>`);
    };
};

const addUser = ():void =>{
    let user: IUser = {
        id: index,
        login: getElem('.login').value,
        password: getElem('.password').value,
        email:getElem('.email').value
    };
    users.push(user);
    render();
    form.reset();
};

const deleteUser = (): void => {
    currentIndex = (event.target as HTMLInputElement).dataset.id;
    users.splice(currentIndex - 1, 1);
};

const editUser = (): void => {
    userIndex = (event.target as HTMLInputElement).dataset.id;
    getElem('.login').value = users[userIndex - 1].login;
    getElem('.password').value = users[userIndex - 1].password;
    getElem('.email').value = users[userIndex - 1].email;
    addBTN.classList.add('hide');
    editBTN.classList.remove('hide');
};

const saveEditUser = (): void => {
    let user = new User(users[userIndex - 1].id, `${getElem('.login').value}`, `${getElem('.password').value}`,
        `${getElem('.email').value}`);
    users[userIndex - 1] = user;
    render();
    form.reset();
    addBTN.classList.remove('hide');
    editBTN.classList.add('hide');
};

getElem('.login').addEventListener('input', function ():void {
    testLogin = loginRegExp.test(getElem('.login').value);
    checkButton();
});
getElem('.password').addEventListener('input', function ():void{
    testPassword = passRegExp.test(getElem('.password').value);
    checkButton();
});
getElem('.email').addEventListener('input', function ():void {
    testEmail = emailRegExp.test(getElem('.email').value);
    checkButton();
});
addBTN.addEventListener('click', function (): void{
    addUser();
});
editBTN.addEventListener('click', function () {
    saveEditUser();
});
getElem('.table-body').addEventListener('click', function (element): void {
    if (element.target.value === 'Delete') {
        deleteUser();
        render();
    }
    if (element.target.value === 'Edit') {
        editUser();
    }
});