const puppeteer = require('puppeteer')

async function autoScroll(page) {
    let lastHeight = await page.evaluate('document.body.scrollHeight');
    while (true) {
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForTimeout(1000);
        let newHeight = await page.evaluate('document.body.scrollHeight');
        
        //! A falta de botón de cargar más resultados
        // let btnMore = await page.evaluate(() => {
        //     return document.querySelector('.infinite-scroller__show-more-button infinite-scroller__show-more-button--visible')
        // });
        // console.log(btnMore);
        // if(btnMore){
        //     await page.click('.section.two-pane-serp-page__results-list > button')
        // }
        if (newHeight === lastHeight) {
            break;
        }
        lastHeight = newHeight;
    }
}

const scraper = async (url) => {

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
            height: 926
        });
        
        
        console.log(`Navigating to ${url}...`);
        await page.goto(url);
        await page.waitForSelector('.jobs-search__results-list');
        await autoScroll(page);
        
        const jobs = await page.evaluate(() => {
            const jobData = [];
            let jobTitle = "";
            let jobCompany = "";
            let jobLocation = "";
            const issues = document.querySelectorAll('.jobs-search__results-list > li');
            issues.forEach(issue => {
                //!REFACTOR
                if(issue.querySelector(".base-search-card__info > h3")){
                    jobTitle = issue.querySelector(".base-search-card__info > h3").innerText
                }else{
                    jobTitle = "Sin datos"
                }
                if(issue.querySelector("div.base-search-card__info > h4 > a")){
                    jobCompany = issue.querySelector("div.base-search-card__info > h4 > a").innerText
                }else{
                    jobCompany = "Sin datos"
                }
                if(issue.querySelector("div.base-search-card__info > div > span.job-search-card__location")){
                    jobLocation = issue.querySelector("div.base-search-card__info > div > span.job-search-card__location").innerText
                }else{
                    jobLocation= "Sin datos"
                }
                jobData.push({
                    "jobTitle": jobTitle,
                    "jobCompany": jobCompany,
                    "jobLocation" : jobLocation
                })
            })

            return jobData
        });
        await browser.close();
        
        return jobs
    } catch (error) {
        console.log("Error: ", error);
    }

}
module.exports = {
    scraper
};