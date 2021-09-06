const input_title = document.querySelector('#input_title');
const input_company = document.querySelector('#input_company');
const input_location = document.querySelector('#input_location');
const input_date = document.querySelector('#input_date');
const input_image = document.querySelector('#input_image');
const input_url = document.querySelector('#input_url');
const cards = document.querySelector('.cards');

const btn_create = document.querySelector('#btn_create');

//! event.preventdefault() ya no funciona, ya que no usamos
//! un formulario, sino un botón. Hay que ver la manera de
//! evitar que se lance el post sin tener los datos en los input.
// Renderizamos en la vista los trabajos que están
// alojados en la BD

(async () => {
    const response = await fetch('/api/ads');
    const jobs = await response.json();

    // Pintamos cada una de las tarjetas
    jobs.forEach(job => {
        paintCard(job);

    })
    // Ańadimos los botones de editar y borrar
    const cards = document.querySelectorAll('.card')

    for (let card of cards) {

        const url = card.querySelector('a').href;
        const editButton = document.createElement('button');
        editButton.setAttribute("name", url)
        const iconEdit = document.createElement('i');
        iconEdit.setAttribute('class', 'far fa-edit');
        editButton.appendChild(iconEdit);

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute("name", url)
        const iconDelete = document.createElement('i');
        iconDelete.setAttribute('class', 'far fa-trash-alt');
        deleteButton.appendChild(iconDelete);

        card.appendChild(editButton);
        card.appendChild(deleteButton);

        editButton.addEventListener('click', () => {
            // Hay que hacer un alert con un formulario?
            // en el que puedas editar el trabajo.
        });

        deleteButton.addEventListener('click', () => {

            // Alert de confirmación de borrado
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
                    fetch('/api/ads', {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            url: deleteButton.name
                        })
                    });
                    Swal.fire(
                        'Borrado!',
                        'El trabajo ha sido borrado de la DB',
                        'success'
                    )
                }
            })
        });
    }

})()

btn_create.addEventListener('click', (event) => {
    // Con este listener simulamos manualmente un método POST -> recogemos los values de cada input -> se igualan al esquema new Job en "postJob" -> lo guarda a su vez en la base de datos -> se transforma en json y lo devuelve
    let getData = async () => {
        const response = await fetch('/api/ads', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: input_title.value,
                company: input_company.value,
                location: input_location.value,
                date: input_date.value,
                image: input_image.value,
                url: input_url.value
            })
        });
        const data = await response.json();
        return data;
    }
    // Renderizamos el nuevo empleo en la vista
    (async () => {
        const newJob = await getData()

        // Lanzamos un alert cuando se crea el nuevo trabajo
        Swal.fire(
            `${newJob.jobTitle}`,
            'añadido a la BD',
            'success'
        )
        // Pintamos el nuevo trabajo
        paintCard(newJob);
    })()

})