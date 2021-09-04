const puppeteer = require('puppeteer')

const extractJobData = (link, browser) => new Promise (async(resolve, reject) => {
    try {
        
        const jobData = {};
        const page = await browser.newPage();
        await page.goto(link);
        await page.waitForSelector('h1')

        jobData['jobTitle'] = await page.$eval('#tituloOferta', title => title.innerText);
        jobData['jobCompany'] = await page.$eval('#toTop > section.row.margin-top-20.wrap-white.margin-5 > section.col-md-7.margin-left-15.margin-right-15 > div:nth-child(2) > div.col-md-9.col-xs-12 > div.row.margin-top-15.text-center-sm.text-center-xs > div:nth-child(1) > h2.clickable.texto-13.display-inline-imp.ng-binding', company => company.innerText);
        jobData['jobImg'] = await page.$eval('.logoEmpresaMaximo', img => img.src);
        jobData['jobLocation'] = await page.$eval('#toTop > section.row.margin-top-20.wrap-white.margin-5 > section:nth-child(6) > div > div:nth-child(13) > span.ng-binding > a', location => location.innerText);
        jobData['jobDate'] = await page.$eval('#toTop > section.row.margin-top-20.wrap-white.margin-5 > section.col-md-7.margin-left-15.margin-right-15 > div:nth-child(2) > div.col-md-9.col-xs-12 > div.row.margin-top-15.text-center-sm.text-center-xs > div:nth-child(2) > span.ng-binding', date => date.innerText);
        resolve(jobData);


    } catch (error) {
        reject(error);
    }
});

const scraper = async (url) => {

    try {
        const scrapedData = [];

        console.log("Opening the browser......");
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        console.log(`Navigating to ${url}...`);
        await page.goto(url);
        const context = browser.defaultBrowserContext();
        await context.overridePermissions(url, ['geolocation']);
        await page.waitForSelector('.row');

        const urls = await page.$$eval('.col-xs-7.col-sm-9 > p:nth-child(2) > a', (links) => {
           
            return links.map (link => link.href)
        });

      
        console.log('urls capturadas', urls.length, urls);

        for(jobLink of urls){
            const job = await extractJobData(jobLink, browser);
            scrapedData.push(job);
        }

        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length)
        await browser.close();

        return scrapedData;

    } catch (error) {
        console.log("Error: ", error);
    }

}
scraper('https://www.empleate.gob.es/empleo/#/trabajo?search=programador&pag=0&minExperiencia=1&fechaCreacionPortal=15')

module.exports = { scraper };
