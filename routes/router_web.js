const router = require('express').Router();
const users = require('../controllers/users')
const { verifyToken, isAdmin, verifyRoleHome, verifyRoleProfile } = require('../middlewares/authJwt')

// GET
router.get('/', users.home)
router.get('/signup', users.signUp)
router.get('/login', users.login)
router.get('/favorites', verifyToken, users.getFavorites)
router.get('/profile', verifyRoleProfile, verifyToken, users.getProfile)
router.get('/users', verifyToken, isAdmin, users.getUsers)// ONLY ADMIN!
router.get('/dashboard', verifyToken, isAdmin, users.getDashboard)// ONLY ADMIN!

// POST
//router.post('/logout', users.logout)

module.exports = router