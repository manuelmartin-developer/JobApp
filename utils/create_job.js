const input_title = document.querySelector('#input_title');
const input_company = document.querySelector('#input_company');
const input_location = document.querySelector('#input_location');
const input_date= document.querySelector('#input_date');
const input_image = document.querySelector('#input_image');
const input_url = document.querySelector('#input_url');
const list_jobs = document.querySelector('.list_jobs');

const btn_create = document.querySelector('#btn_create');

// Este método carga todos los jobs de la base de datos, haciendo
// un fetch a la api. Una vez elaborado el método para pintar cada tarjeta
// habrá que refactorizarlo. 

(async () => {
    const response = await fetch('/api/ads');
    const jobs = await response.json();

    for (job of jobs) {
        //! REFACTORIZAR
        //? Aquí irá el método paintCard que pintará una tarjeta por cada elemento de la DB
        const card = document.createElement('div');
        card.setAttribute('class', 'detail-card')
        card.innerText = job.title;
        list_jobs.appendChild(card);
    }
})()

btn_create.addEventListener('click', (event) => {
    event.preventDefault()
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
    let renderData = async () => {
        const data = await getData()
        // Aquí se crea la tarjeta del job creado (con appendChild)
        //! VER demo clase 20 del 31/08 demo-client/js/utils/paintData
        list_jobs.innerHTML = data
        console.log(data)
    }
    renderData()

})