const btn_create_user = document.querySelector('#btn_create_user')
const input_name = document.querySelector('#input_name')
const input_surname = document.querySelector('#input_surname')
const input_email = document.querySelector('#input_email')
const input_password = document.querySelector('#input_password')
const list_users = document.querySelector('.list_users');
const users = document.querySelectorAll('.one_user');

for (let user of users) {
    const name = user.querySelector('#user_name').innerText;
    const surname = user.querySelector('#user_surname').innerText;
    const email = user.querySelector('#user_email').innerText;

    const buttons = document.createElement('div');
    buttons.setAttribute('class', 'buttons');
    const editButton = document.createElement('button');
    editButton.setAttribute("id", email)
    const iconEdit = document.createElement('i');
    iconEdit.setAttribute('class', 'far fa-edit');
    editButton.appendChild(iconEdit);
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute("id", email)
    const iconDelete = document.createElement('i');
    iconDelete.setAttribute('class', 'far fa-trash-alt');
    deleteButton.appendChild(iconDelete);

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    user.appendChild(buttons)

    editButton.addEventListener('click', () => {
        (async function () {
            const editValues = await Swal.fire({
                title: 'Editar Usuario',
                html: `<label id="swal-label1" class="swal1-label">Nombre</label><br>` +
                    `<input id="swal-input1" class="swal1-input" value="${name}"><br>` +
                    `<label id="swal-label2" class="swal1-label">Apellido</label><br>` +
                    `<input id="swal-input2" class="swal1-input" value="${surname}"><br>` +
                    `<label id="swal-label2" class="swal1-label">Email</label><br>` +
                    `<input id="swal-input3" class="swal1-input" value="${email}" ><br>`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Editar',
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value,
                        document.getElementById('swal-input3').value
                    ]
                }
            })

            if (name !== document.getElementById('swal-input1').value || surname !== document.getElementById('swal-input2').value || email !== document.getElementById('swal-input3').value) {
                const newName = editValues.value[0];
                const newSurname = editValues.value[1];
                const newEmail = editValues.value[2];

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
                            oldEmail: email
                        })
                    });
                    if(response.status = 201){

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se han guardado los nuevos datos',
                            showConfirmButton: false,
                            timer: 2000
                          })
                        const user_info = user.querySelector('.user_info');
                        user_info.innerHTML = `<p id="user_name">${newName}</p>
                                            <p id="user_surname">${newSurname}</p>
                                            <p id="user_email">${newEmail}</p>`
                    }else{
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Ha ocurrido algún error',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }


                })();
            }
        })();
    });
    deleteButton.addEventListener('click', () => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no podrá deshacerse",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                const email = deleteButton.id;

                (async function () {
                    await fetch('/api/user', {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email
                        })
                    });
                     Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'El usuario ha sido borrado de la DB',
                        showConfirmButton: false,
                        timer: 2000
                      })
                    user.remove();
                })();

            };
        });
    });
}

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
                password: input_password.value
            })
        })

        if (response.status === 201) {

            Swal.fire({
                icon: 'success',
                title: 'Hurra!',
                text: 'Usuario creado',
            }).then(okay => {
                if (okay) {
                    const one_user = document.createElement('div');
                    one_user.setAttribute('class', 'one_user');
                    const name = document.createElement('p');
                    name.setAttribute('id', 'user_name');
                    name.innerText = input_name.value;
                    const email = document.createElement('p');
                    email.setAttribute('id', 'user_email');
                    email.innerText = input_email.value;
                    one_user.appendChild(name);
                    one_user.appendChild(email);
                    list_users.appendChild(one_user);

                    input_name.value = "";
                    input_surname.value = "";
                    input_email.value = "";
                    input_password.value = "";
                }
            })
        } else if (response.status === 406) {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El email no es correcto',
                showConfirmButton: false,
                timer: 1500
              })
        } else if (response.status === 409) {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'La contraseña debe tener al menos 6 caracteres',
                showConfirmButton: false,
                timer: 1500
              })
        } else if (response.status === 400) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El email ya está en uso',
                showConfirmButton: false,
                timer: 1500
              })

        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Recuerda que debes rellenar todos los campos',
                showConfirmButton: false,
                timer: 1500
              })

        }
    })()
})