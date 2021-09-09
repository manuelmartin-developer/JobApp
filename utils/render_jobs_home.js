const btn_search = document.querySelector('#btn_search');
const input_search = document.querySelector('#input_search');
const cards = document.querySelector('.cards');

btn_search.addEventListener('click', () => {

    // Hacemos fetch a la API para recabar los datos de empleos que
    // recibimos del scraping y de la BD mongo
    let getData = async () => {
        const response = await fetch(`/api/search?query=${input_search.value}`);
        const data = await response.json();
        return data;
    }

    // Renderizamos los datos en la vista con un IIFE
    (async () => {

        // Spinner que se muestra miestras la búsqueda se está realizando
        Swal.fire({
            title: 'Estamos buscando...',
            html: 'Espera un momento...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });

        //Esperamos a los datos
        const data = await getData()


        //Mostramos la cantidad de resultados de la búsqueda
        cards.innerHTML = "";
        const totalJobs = document.createElement('div')
        totalJobs.innerHTML = `Hay ${data.length} elementos en la búsqueda               `
        cards.appendChild(totalJobs);

        //Renderizamos todas las tarjetas de los trabajos encontrados
        data.forEach(job => paintCard(job))
        // Ańadimos el botón de favorito
        addfavBtn()
        //Cerramos alert
        swal.close()
    })()
})

const addfavBtn = ()=> {
    
    const cards = document.querySelectorAll('.card')
    for(let card of cards){
        const url = card.querySelector('a').href;
        
        const title = card.querySelector('.infoCard > a > h3').innerText;
        const favButton = document.createElement('button');
        favButton.setAttribute("id", url)
        const iconEdit = document.createElement('i');
        iconEdit.setAttribute('class', 'far fa-heart');
        favButton.appendChild(iconEdit);
    
        card.appendChild(favButton);

        favButton.addEventListener('click', () =>{
            //De momento, imprimimos por consola la url, aquí tendremos
            // que hacer un fetch [POST] a /api/favorites
            console.log(url);
        })
    }
}