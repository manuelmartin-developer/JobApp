const router = require('express').Router();
const users = require('../controllers/users')

// GET
router.get('/', users.home)
router.get('/signup', users.signUp)
router.get('/login', users.login)
router.get('/favorites', users.getFavorites)
router.get('/profile', users.getProfile)
router.get('/users', users.getUsers)// ONLY ADMIN!
router.get('/dashboard', users.getAdded)// ONLY ADMIN!

// POST
//router.post('/logout', users.logout)

module.exports = router