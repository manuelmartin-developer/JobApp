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

        //Cerramos alert
        swal.close()
    })()
})