const btn_update_user = document.querySelector('#btn_update_user');
const oldEmail = document.querySelector('#input_email').value;

btn_update_user.addEventListener('click', () => {

    const newName = document.querySelector('#input_name').value;
    const newSurname = document.querySelector('#input_surname').value;
    const newEmail = document.querySelector('#input_email').value;

    (async function () {
        const editValues = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Si modificas el email, cambiarán tus datos de acceso",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cambia mis datos'
        }).then((result) => {
            if (result.isConfirmed) {
                (async function () {

                    const response = await fetch('/api/user', {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            newName: newName,
                            newSurname: newSurname,
                            newEmail: newEmail,
                            oldEmail: oldEmail
                        })
                    });
                    if (response.status = 201) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se han guardado los nuevos datos',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Ha ocurrido algún error',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })();
            }
        })
    })();
});