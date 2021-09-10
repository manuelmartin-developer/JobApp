const btn_create_user = document.querySelector('#btn_create_user')
const input_name = document.querySelector('#name')
const input_surname = document.querySelector('#surname')
const input_email = document.querySelector('#email')
const input_password = document.querySelector('#password')

btn_create_user.addEventListener('click', () => {
    (async () => {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: input_name.value,
                surname: input_surname.value,
                email: input_email.value,
                password: input_password.value,
            })
        })

        if (response.status === 201) {

            Swal.fire({
                icon: 'success',
                title: 'Hurra!',
                text: 'Ahora puedes hacer login',
            }).then(okay => {
                if (okay) {
                    window.location.href = '/login'
                }
            })
        } else if (response.status === 406) {

            Swal.fire({
                icon: 'error',
                title: 'Email',
                text: 'El email no es correcto'
            })
        } else if (response.status === 409) {

            Swal.fire({
                icon: 'error',
                title: 'Password',
                text: 'La contraseña debe tener al menos 6 caracteres'
            })
        } else if (response.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Opss...',
                text: 'El email ya está en uso'
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Revisa el formulario',
                text: 'Recuerda que debes rellenar todos los campos'
            })

        }
    })()
})