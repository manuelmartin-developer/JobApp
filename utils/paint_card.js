const paintCard = (job) => {
    // Create the Job Card (it will cointain 2 divs: Info and Image)
    const jobCard = document.createElement('div')
    jobCard.setAttribute('class', 'card')
    // Create the Image Card (div > img)
    const imageCard = document.createElement('div')
    imageCard.setAttribute('class', 'imageCard')
    const companyImage = document.createElement('img')
    companyImage.setAttribute('src', job.jobImg)
    companyImage.setAttribute('class', 'image')

    // Create the Info Card (div > (a > h3) + h4 + h4 + h4)
    const infoCard = document.createElement('div')
    const infoCard2 = document.createElement('div')
    infoCard.setAttribute('class', 'infoCard')
    infoCard2.setAttribute('class', 'infoCard2')
    const jobLink = document.createElement('a')
    jobLink.setAttribute('href', job.jobUrl)
    jobLink.setAttribute('target', '_blank')
    const title = document.createElement('h3')
    title.innerHTML = job.jobTitle.slice(0, 35)
    title.setAttribute('class', 'title')
    const company = document.createElement('h4')
    company.setAttribute('class', 'company')
    company.innerHTML = `🏭 ${job.jobCompany}`
    const location = document.createElement('h4')
    location.setAttribute('class', 'location')
    location.innerHTML = `📍 ${job.jobLocation}`
    const date = document.createElement('h4')
    date.setAttribute('class', 'date')
    date.innerHTML = `🕧 ${job.jobDate}`

    imageCard.appendChild(companyImage)

    jobLink.appendChild(title)

    infoCard.appendChild(jobLink)
    infoCard2.appendChild(company)
    infoCard2.appendChild(location)
    infoCard2.appendChild(date)

    jobCard.appendChild(imageCard)
    infoCard.appendChild(infoCard2)
    jobCard.appendChild(infoCard)

    cards.appendChild(jobCard);
}