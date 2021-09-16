const { getAllUsers } = require("../models/users")
const Jobs = require('../models/jobSchema');
const jsStringify = require('js-stringify');

const users = {
    home: async (req, res) => {
        const data = await Jobs.find();
        res.status(200).render('home_guest', {
            jsStringify,
            data
        })
    },
    signUp: async (req, res) => {
        res.status(200).render('register')
    },
    login: async (req, res) => {
        res.status(200).render('login')
    },
    getFavorites: async (req, res) => {
        res.status(200).render('favorites')
    },
    getProfile: async (req, res) => {
        res.status(200).render('profile')
    },
    getUsers: async (req, res) => {
        const users = await getAllUsers()
        res.status(200).render('users', { users })
    },
    getDashboard: async (req, res) => {
        res.status(200).render('dashboard')
    },
    recoverPass: async (req, res) => {
        res.status(200).render('recover_pass')
        
    },
    resetPass: async (req, res) => {
        res.status(200).render('reset_pass'); 
    },
}

module.exports = users