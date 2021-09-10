
const input_title = document.querySelector('#input_title');
const input_company = document.querySelector('#input_company');
const input_location = document.querySelector('#input_location');
const input_date = document.querySelector('#input_date');
const input_image = document.querySelector('#input_image');
const input_url = document.querySelector('#input_url');
const cards = document.querySelector('.cards');

const btn_create = document.querySelector('#btn_create');

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
        const title = card.querySelector('.infoCard > a > h3').innerText;
        const company = card.querySelector('.infoCard > h4:nth-child(2)').innerText;
        const location = card.querySelector('.infoCard > h4:nth-child(3)').innerText;
        const date = card.querySelector('.infoCard > h4:nth-child(4)').innerText;
        const image = card.querySelector('.imageCard > img').src;

        const editButton = document.createElement('button');
        editButton.setAttribute("id", url)
        const iconEdit = document.createElement('i');
        iconEdit.setAttribute('class', 'far fa-edit');
        editButton.appendChild(iconEdit);

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute("id", url)
        const iconDelete = document.createElement('i');
        iconDelete.setAttribute('class', 'far fa-trash-alt');
        deleteButton.appendChild(iconDelete);

        card.appendChild(editButton);
        card.appendChild(deleteButton);

        editButton.addEventListener('click', () => {

            (async function () {
                const editValues = await Swal.fire({
                    title: 'Editar Trabajo',
                    html: `<label id="swal-label1" class="swal1-label">Título</label><br>` +
                        `<input id="swal-input1" class="swal1-input" value="${title}"><br>` +
                        `<label id="swal-label2" class="swal1-label">Empresa</label><br>` +
                        `<input id="swal-input2" class="swal1-input" value="${company}"><br>` +
                        `<label id="swal-label2" class="swal1-label">Localización</label><br>` +
                        `<input id="swal-input3" class="swal1-input" value="${location}"><br>` +
                        `<label id="swal-label2" class="swal1-label">Fecha publicación</label><br>` +
                        `<input id="swal-input4" class="swal1-input" value="${date}"><br>` +
                        `<label id="swal-label2" class="swal1-label">Imagen</label><br>` +
                        `<input id="swal-input5" class="swal1-input" value="${image}"><br>` +
                        `<label id="swal-label2" class="swal1-label">Url</label><br>` +
                        `<input id="swal-input6" class="swal1-input" value="${url}"><br>`,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Editar',
                    preConfirm: () => {
                        return [
                            document.getElementById('swal-input1').value,
                            document.getElementById('swal-input2').value,
                            document.getElementById('swal-input3').value,
                            document.getElementById('swal-input4').value,
                            document.getElementById('swal-input5').value,
                            document.getElementById('swal-input6').value
                        ]
                    }
                })

                if (editValues) {
                    const newTitle = editValues.value[0];
                    const newCompany = editValues.value[1];
                    const newLocation = editValues.value[2];
                    const newDate = editValues.value[3];
                    const newImage = editValues.value[4];
                    const newUrl = editValues.value[5];

                    (async function () {

                        await fetch('/api/ads', {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                jobTitle: newTitle,
                                jobCompany: newCompany,
                                joblocation: newLocation,
                                jobDate: newDate,
                                jobImg: newImage,
                                jobUrl: newUrl
                            })
                        });
                        Swal.fire(
                            'Oferta editada',
                            'success'
                        )
                        card.innerHTML = `<div class="card">
                                            <div class="infoCard"> 
                                                <a href="${newUrl}" target="_blank">
                                                    <h3>${newTitle}</h3>
                                                </a>
                                                <h4>${newCompany}</h4>
                                                <h4>${newLocation}</h4>
                                                <h4>${newDate}</h4>
                                            </div>
                                            <div class="imageCard">
                                                <img src="${newImage}">
                                            </div>
                                            <button id="${newUrl}">
                                                <i class="far fa-edit" aria-hidden="true"></i>
                                            </button>
                                            <button id="${newUrl}">
                                                <i class="far fa-trash-alt" aria-hidden="true"></i>
                                            </button>
                                        </div>`
                        

                    })();
                }
            })();

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

                    (async function () {

                        await fetch('/api/ads', {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                url: deleteButton.id
                            })
                        });
                        Swal.fire(
                            'Borrado!',
                            'El trabajo ha sido borrado de la DB',
                            'success'
                        )
                        card.remove();
                    })();

                };
            });
        });
    };

})();

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
        if(response.status === 200){

            const data = await response.json();
            return data;
        }else{
            return "empty"
        }

        
    }
    // Renderizamos el nuevo empleo en la vista
    (async () => {
        const newJob = await getData()
        if(newJob !== "empty"){
            // Lanzamos un alert cuando se crea el nuevo trabajo
            Swal.fire(
                `${newJob.jobTitle}`,
                'añadido a la BD',
                'success'
            )
            // Pintamos el nuevo trabajo
            paintCard(newJob);
    
            // Limpiamos los inputs
            input_title.value = "";
            input_company.value = "";
            input_location.value = "";
            input_date.value = "";
            input_image.value = "";
            input_url.value = "";
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Revisa el formulario',
                text: 'Recuerda que debes rellenar todos los campos'
            })
        }
      
        
    })()

})