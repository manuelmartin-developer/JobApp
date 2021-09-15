const btn_mail = document.querySelector('#btn_mail');

btn_mail.addEventListener('click', () => {
    
    const input_email = document.querySelector('#input_email').value;
    (async () => {
        const response = await fetch('/api/recoverpass', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: input_email
            })
        })
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Email enviado',
                text: 'Mientras tanto, relájate e intenta recordar la contraseña',
            }).then(okay => {
                if (okay) {
                    window.location.href = '/'
                }
            })
        } else if (response.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Opss...',
                text: 'No existe ningún usuario con ese email'
            })
        } else if (response.status === 411) {
            Swal.fire({
                icon: 'error',
                title: 'Revisa los campos',
                text: 'El campo email no puede estar vacío'
            })
        } else if (response.status === 406) {
            Swal.fire({
                icon: 'error',
                title: 'Revisa el email',
                text: 'El formato del email no es correcto'
            })
        }
    })()
});