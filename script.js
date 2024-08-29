const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}
//login and sign up 
var is_login = localStorage.getItem('is_login');

if (is_login) {
    document.getElementById('vv').innerText = 'Log-out'
    document.getElementById('vv').onclick = function () {

        const currentUser = JSON.parse(localStorage.getItem('user_login_data'));
        const users = JSON.parse(localStorage.getItem('users'));

        if (currentUser) {
            const userIndex = users.findIndex(user => user.email === currentUser.email);

            if (userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem('users',JSON.stringify(users))
            }
        }

        localStorage.removeItem('is_login')
        localStorage.removeItem('user_login_data')
        location.reload()
    }
}