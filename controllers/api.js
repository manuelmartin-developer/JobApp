const Jobs = require('../models/jobSchema');

//! TO BE CHANGED
const api = {
    //! GET
    searchJob: async (req, res) => {
        // ...
        res.status(200).render('api')
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