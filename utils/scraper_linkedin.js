const puppeteer = require('puppeteer')

async function autoScroll(page) {
    let lastHeight = await page.evaluate('document.body.scrollHeight');

    while (true) {
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForTimeout(500);
        let newHeight = await page.evaluate('document.body.scrollHeight');

        //! Botón de carga de más resultados desactivado por tiempo de carga excesivo
        // let btnMore = await page.evaluate(() => {
        //     return document.getElementsByClassName('infinite-scroller__show-more-button infinite-scroller__show-more-button--visible')
        // });

        // if(btnMore[0]){
        //     await page.click('.two-pane-serp-page__results-list > button')
        // }

        if (newHeight === lastHeight) {
            break;
        }
        lastHeight = newHeight;
    }
}

const scraperLinkedin = async (url) => {

    try {
        console.log("Opening the browser......");
        const browser = await puppeteer.launch({
            "headless": true,
            "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
            "ignoreHTTPSErrors": true

        });
        const page = await browser.newPage();
        page.setViewport({
            width: 1280,
            height: 7000
        });


        console.log(`Navigating to ${url}...`);
        await page.goto(url);
        await page.waitForSelector('.jobs-search__results-list');

        //! Desactivado scrooll para aumentar los tiempos de búsqueda
        await autoScroll(page);

        const jobs = await page.$$eval('.jobs-search__results-list', () => {
            const jobData = [];
            let jobTitle = "";
            let jobCompany = "";
            let jobLocation = "";
            let jobDate = "";
            let jobImg = "";
            let jobUrl = "";
            const issues = document.querySelectorAll('ul.jobs-search__results-list > li');
            issues.forEach(issue => {
                //!REFACTOR
                if (issue.querySelector(".base-search-card__info > h3")) {
                    jobTitle = issue.querySelector(".base-search-card__info > h3").innerText
                } else {
                    jobTitle = "Sin datos"
                }
                if (issue.querySelector("div.base-search-card__info > h4 > a")) {
                    jobCompany = issue.querySelector("div.base-search-card__info > h4 > a").innerText
                } else {
                    jobCompany = "Sin datos"
                }
                if (issue.querySelector("div.base-search-card__info > div > span.job-search-card__location")) {
                    jobLocation = issue.querySelector("div.base-search-card__info > div > span.job-search-card__location").innerText
                } else {
                    jobLocation = "Sin datos"
                }
                //! DATE
                if (issue.querySelector("div.base-search-card__info > div > time.job-search-card__listdate--new")) {
                    jobDate = issue.querySelector("div.base-search-card__info > div > time.job-search-card__listdate--new").innerText
                } else {
                    jobDate = issue.querySelector("div.base-search-card__info > div > time.job-search-card__listdate").innerText
                }
                //! IMG
                if (issue.querySelector("div.base-card > div.search-entity-media > img")) {
                    jobImg = issue.querySelector("div.base-card > div.search-entity-media > img").src
                } else {
                    jobImg = "/public/assets/images/no-image.webp"
                }
                //! JOB URL
                if (issue.querySelector("a.base-card__full-link")) {
                    jobUrl = issue.querySelector("a.base-card__full-link").href
                } else {
                    jobUrl = "Sin datos"
                }
                jobData.push({
                    "jobTitle": jobTitle,
                    "jobCompany": jobCompany,
                    "jobLocation": jobLocation,
                    "jobDate": jobDate,
                    "jobImg": jobImg,
                    "jobUrl": jobUrl
                })
            })
            return jobData
        });
        await browser.close();
        // console.log(jobs);
        return jobs
    } catch (error) {
        console.log("Error: ", error);
    }

}
module.exports = {
    scraperLinkedin
};