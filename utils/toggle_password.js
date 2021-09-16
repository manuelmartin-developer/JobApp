const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#input_password');

togglePassword.addEventListener('click', () => {

    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    togglePassword.className == 'fas fa-eye-slash' ? togglePassword.className = 'fas fa-eye' :
        togglePassword.className = 'fas fa-eye-slash'
});