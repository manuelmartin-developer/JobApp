const btn_pass = document.querySelector('#btn_pass');

btn_pass.addEventListener('click', () => {
    
    const input_pass1 = document.querySelector('#input_pass1').value;
    const input_pass2 = document.querySelector('#input_pass2').value;
    (async () => {
        const response = await fetch('/api/resetpass', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pass1: input_pass1,
                pass2: input_pass2
            })
        })
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Contraseña cambiada',
                text: 'Esta vez intenta apuntarla en una servilleta',
            }).then(okay => {
                if (okay) {
                    window.location.href = '/'
                }
            })
        } else if (response.status === 411) {
            Swal.fire({
                icon: 'error',
                title: 'Revisa los campos',
                text: 'Debes rellenar todos los campos'
            })
        } else if (response.status === 406) {
            Swal.fire({
                icon: 'error',
                title: 'Revisa los campos',
                text: 'Ambas contraseñas deben coincidir'
            })
        } else if (response.status === 409) {
            Swal.fire({
                icon: 'error',
                title: 'Revisa los campos',
                text: 'La nueva contraseña debe tener al menos 6 caracteres'
            })
        }
    })()
});