const puppeteer = require('puppeteer')

const extractJobData = (link, browser) => new Promise (async(resolve, reject) => {
    try {
        
        const jobData = {};
        const page = await browser.newPage();
        await page.goto(link);
        await page.waitForSelector('h1')

        jobData['jobTitle'] = await page.$eval('h1', title => title.innerText);
        jobData['jobCompany'] = await page.$eval('a.text-primary.link-muted.fs--18 > span', company => company.innerText);
        jobData['jobImg'] = await page.$eval('#wrapper > section.m-0.pt-5 > div:nth-child(1) > div > div.col-12.col-md-7.col-lg-8.mb-5 > div.row > div.col-12.col-md-12.col-lg-4 > div > a > figure > img', img => img.src);
        jobData['jobLocation'] = await page.$eval('#wrapper > section.m-0.pt-5 > div:nth-child(1) > div > div.col-12.col-md-7.col-lg-8.mb-5 > div.row > div.col-12.col-md-12.col-lg-8 > div.mb-3.mt-2 > h1 > small', location => location.innerText);
        jobData['jobDate'] = await page.$eval('#wrapper > section.m-0.pt-5 > div:nth-child(1) > div > div.col-12.col-md-7.col-lg-8.mb-5 > div.row > div.col-12.col-md-12.col-lg-8 > div.ml-0.mt-2 > span.ml-4', date => date.innerText);
        resolve(jobData);


    } catch (error) {
        reject(error);
    }
});

const scraper = async (url) => {

    try {
        const scrapedData = [];

        console.log("Opening the browser......");
        const browser = await puppeteer.launch({
            "headless": true,
            "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
            "ignoreHTTPSErrors": true
        
        });
        const page = await browser.newPage();

        console.log(`Navigating to ${url}...`);
        await page.goto(url);
        await page.waitForSelector('.row');

        const urls = await page.$$eval('h5 > a.text-gray-700.font-weight-bold', (links) => {
           
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
module.exports = { scraper };
