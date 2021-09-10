const btn_login_user = document.querySelector('#btn_login_user')
const input_email = document.querySelector('#input_email')
const input_password = document.querySelector('#input_password')


btn_login_user.addEventListener('click', () => {
    (async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: input_email.value,
                password: input_password.value,
            })
        })
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Hurra!',
                text: 'Ahora estás logueado',
            }).then(okay => {
                if (okay) {
                    window.location.href = '/profile'
                }
            })
        } else if (response.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Opss...',
                text: 'No existe ningún usuario con ese email'
            })
        } else if (response.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Revisa la contraseña',
                text: 'La contraseña es incorrecta'
            })
        }else if (response.status === 411) {
            Swal.fire({
                icon: 'error',
                title: 'Revisa los campos',
                text: 'No puede haber ningún campo vacío'
            })
        } else if (response.status === 406) {
            Swal.fire({
                icon: 'error',
                title: 'Revisa el email',
                text: 'El formato del email no es correcto'
            })
        }
    })()
})