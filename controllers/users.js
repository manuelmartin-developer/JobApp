const Jobs = require('../models/jobSchema');

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
    getDashboard: async (req, res) => {
        res.status(200).render('dashboard');
    },
}

module.exports = users