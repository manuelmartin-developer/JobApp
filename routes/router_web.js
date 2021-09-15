const router = require('express').Router();
const users = require('../controllers/users')
const { verifyToken, isAdmin, verifyRoleHome, verifyRoleProfile } = require('../middlewares/authJwt')
const generateCookieToken = require('../middlewares/generateCookieToken');

// GET
router.get('/', verifyRoleHome, users.home)
router.get('/signup', users.signUp)
router.get('/login', users.login)
router.get('/favorites', verifyToken, users.getFavorites)
router.get('/profile', verifyRoleProfile, verifyToken, users.getProfile)
router.get('/users', verifyToken, isAdmin, users.getUsers)// ONLY ADMIN!
router.get('/dashboard', verifyToken, isAdmin, users.getDashboard)// ONLY ADMIN!
router.get('/recoverpass', users.recoverPass)
router.get('/resetpass/:id?/:token?', generateCookieToken, users.resetPass)


module.exports = router