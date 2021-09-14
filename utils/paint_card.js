const paintCard = (job) => {
    // Create the Job Card (it will cointain 2 divs: Info and Image)
    const jobCard = document.createElement('div')
    jobCard.setAttribute('class', 'card')
    // Create the Image Card (div > img)
    const imageCard = document.createElement('div')
    imageCard.setAttribute('class', 'imageCard')
    const companyImage = document.createElement('img')
    companyImage.setAttribute('src', job.jobImg)

    // Create the Info Card (div > (a > h3) + h4 + h4 + h4)
    const infoCard = document.createElement('div')
    infoCard.setAttribute('class', 'infoCard')
    const jobLink = document.createElement('a')
    jobLink.setAttribute('href', job.jobUrl)
    jobLink.setAttribute('target', '_blank')
    const title = document.createElement('h3')
    title.innerHTML = job.jobTitle
    const company = document.createElement('h4')
    company.innerHTML = job.jobCompany
    const location = document.createElement('h4')
    location.innerHTML = job.jobLocation
    const date = document.createElement('h4')
    date.innerHTML = job.jobDate

    imageCard.appendChild(companyImage)

    jobLink.appendChild(title)

    infoCard.appendChild(jobLink)
    infoCard.appendChild(company)
    infoCard.appendChild(location)
    infoCard.appendChild(date)

    jobCard.appendChild(infoCard)
    jobCard.appendChild(imageCard)

    cards.appendChild(jobCard);
}