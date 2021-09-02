const Jobs = require('../models/jobSchema');
const NOSQL_db = require('../utils/nosql_db');

const users = {
    home: async (req, res) => {
        // ...
        res.status(200).render('home')
    },
    signUp: async (req, res) => {
        // ...
        res.status(200).render('register')
    },
    login: async (req, res) => {
        // ...
        res.status(200).render('login')
    },
    getFavorites: async (req, res) => {
        // ...
        res.status(200).render('favorites')
    },
    getProfile: async (req, res) => {
        // ...
        res.status(200).render('profile')
    },
    getUsers: async (req, res) => {
        // ...
        res.status(200).render('users')
    },
    getAdded: async (req, res) => {
        
        const jobs = await Jobs.find({});
        res.status(200).render('dashboard',{
            jobs
        });
    },
}

module.exports = users