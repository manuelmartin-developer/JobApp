const Jobs = require('../models/jobSchema');
const { scraperLinkedin } = require('../utils/scraper_linkedin');
const { scraperWelcome } = require('../utils/scraper_welcome');

//! TO BE CHANGED
const api = {
    //! GET
    searchJob: async (req, res) => {
        try { 
            const query = req.query.query;
            const search = query.replace(" ", "+");
            
            const linkedin = await scraperLinkedin(`https://es.linkedin.com/jobs/search?keywords=developer+${search}&location=Espa%C3%B1a&locationId=&geoId=105646813&sortBy=DD&f_TPR=&position=1&pageNum=0`);
            const welcome = await scraperWelcome(`https://www.welcometothejungle.com/es/jobs?aroundQuery=Espa%C3%B1a%2C%20Espa%C3%B1a&refinementList%5Boffice.country_code%5D%5B%5D=ES&page=1&range%5Bexperience_level_minimum%5D%5Bmin%5D=0&range%5Bexperience_level_minimum%5D%5Bmax%5D=1&query=developer+${search}`);
            const jobAds = await Jobs.find({
                jobTitle: {$regex : query, $options: 'i'}
            })
            const data = linkedin.concat(jobAds,welcome)
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });         
        }
    },

    //! POST
    signInUser: async (req, res) => {
        // ...
        res.status(200).render('api')
    },
    logInUser: async (req, res) => {
        // ...
        res.status(200).render('api')
    },
    logOutUser: async (req, res) => {
        // ...
        res.status(200).render('api')
    },
    postJob: async (req, res) => {
        try {
            const job = await new Jobs({
                jobTitle: req.body.title,
                jobCompany: req.body.company,
                jobLocation: req.body.location,
                jobDate: req.body.date,
                jobImg: req.body.image,
                jobUrl: req.body.url,
            });
            const newJob = await job.save();
            res.status(200).json(newJob);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    getAllJobs: async (req, res) => {
        try {
            const allJobs = await Jobs.find();
            res.status(200).json(allJobs);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    addFavorite: async (req, res) => {
        // ...
        res.status(200).render('api')
    },
    //! PUT
    updateUser: async (req, res) => {
        // ...
        res.status(200).render('api')
    },
    updateJob: async (req, res) => {
        // ...
        res.status(200).render('api')
    },
    //! DELETE
    deleteUser: async (req, res) => {
        // ...
        res.status(200).render('api')
    },
    deleteJob: async (req, res) => {
        try {
            const url = await req.body.url
            const deleteJob = await Jobs.findOneAndDelete({
                jobUrl: url
            });
            res.status (204).json(deleteJob);             
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    deleteFavorite: async (req, res) => {
        // ...
        res.status(200).render('api')
    },
}

module.exports = api