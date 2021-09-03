const input_title = document.querySelector('#input_title');
const input_company = document.querySelector('#input_company');
const input_image = document.querySelector('#input_image');
const input_location = document.querySelector('#input_location');
const input_salary = document.querySelector('#input_salary');
const input_description = document.querySelector('#input_description');
const list_jobs = document.querySelector('.list_jobs');

const btn_create = document.querySelector('#btn_create');

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
                image: input_image.value,
                location: input_location.value,
                salary: input_salary.value,
                description: input_description.value
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