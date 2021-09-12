const cards = document.querySelector('.cards');

// Renderizamos el nuevo empleo en la vista
(async () => {
    const response = await fetch('/api/favorites')
    const favorites = await response.json();
    favorites.forEach(data => {
        // Problemas al insertar el ID del favorito para el posterior
        // borrado en la base de datos
        // paintFavorite(JSON.parse(favorite.job_offer));
        // Create the Job Card (it will cointain 2 divs: Info and Image)
        const favorite = JSON.parse(data.job_offer)
        const jobCard = document.createElement('div')
        jobCard.setAttribute('class', 'card')
        // Create the Image Card (div > img)
        const imageCard = document.createElement('div')
        imageCard.setAttribute('class', 'imageCard')
        const companyImage = document.createElement('img')
        companyImage.setAttribute('src', favorite.jobImage)

        // Create the Info Card (div > (a > h3) + h4 + h4 + h4)
        const infoCard = document.createElement('div')
        infoCard.setAttribute('class', 'infoCard')
        const jobLink = document.createElement('a')
        jobLink.setAttribute('href', favorite.jobUrl)
        jobLink.setAttribute('target', '_blank')
        const title = document.createElement('h3')
        title.innerHTML = favorite.jobTitle
        const company = document.createElement('h4')
        company.innerHTML = favorite.JobCompany
        const location = document.createElement('h4')
        location.innerHTML = favorite.jobLocation
        const date = document.createElement('h4')
        date.innerHTML = favorite.jobDate

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute("id", data.favorite_id)
        const iconDelete = document.createElement('i');
        iconDelete.setAttribute('class', 'far fa-trash-alt');
        deleteButton.appendChild(iconDelete);

        imageCard.appendChild(companyImage)

        jobLink.appendChild(title)

        infoCard.appendChild(jobLink)
        infoCard.appendChild(company)
        infoCard.appendChild(location)
        infoCard.appendChild(date)

        jobCard.appendChild(infoCard)
        jobCard.appendChild(imageCard)
        jobCard.appendChild(deleteButton)


        cards.appendChild(jobCard);
    })

    const allCards = document.querySelectorAll('.card');
    for (let card of allCards) {
        const deleteButton = card.querySelector('button');

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

                    (async function () {

                        await fetch('/api/favorites', {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: deleteButton.id
                            })
                        });
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'El favorito ha sido borrado',
                            showConfirmButton: false,
                            timer: 1500
                          })
                        card.remove();
                    })();

                };
            });
        });
    };


})()