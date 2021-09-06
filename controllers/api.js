const Jobs = require('../models/jobSchema');
const { scraperLinkedin } = require('../utils/scraper_linkedin')


//! TO BE CHANGED
const api = {
    //! GET
    searchJob: async (req, res) => {
        try { 
            const query = req.query.query;
            const search = query.replace(" ", "+");
            const results = await scraperLinkedin(`https://es.linkedin.com/jobs/search?keywords=developer+${search}&location=Espa%C3%B1a&locationId=&geoId=105646813&sortBy=DD&f_TPR=&position=1&pageNum=0`);
            res.status(200).json(results);
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
                title: req.body.title,
                company: req.body.company,
                image: req.body.image,
                location: req.body.location,
                salary: req.body.salary,
                description: req.body.description
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
        // ...
        res.status(200).render('api')
    },
    deleteFavorite: async (req, res) => {
        // ...
        res.status(200).render('api')
    },
}

module.exports = api