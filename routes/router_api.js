// Se corresponde con /controllers/api - CAMBIAR NOMBRES
const router = require('express').Router();
const api = require('../controllers/api')
const passport = require('passport')
const { isEmptyRegister, isValidEmailRegister, checkDuplicateEmail, validatePassword } = require('../middlewares/verifyUserRegister');
const { isEmptyAddJob } = require('../middlewares/verifyAddJob');
const { checkEmailAndPassword, isEmptyLogin, isValidEmailLogin } = require('../middlewares/verifyUserLogin')
const { verifyToken, isAdmin } = require('../middlewares/authJwt')
require('../passport_setup.js')

// GET
router.get('/search', api.searchJob)
router.get('/favorites', verifyToken, api.getAllFavorites)
router.get('/ads', verifyToken, isAdmin, api.getAllJobs)//! ONLY ADMIN
// GOOGLE OAUTH20
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

// POST
router.post('/user', isEmptyRegister, isValidEmailRegister, checkDuplicateEmail, validatePassword, api.postUser)
router.post('/login', isEmptyLogin, isValidEmailLogin, checkEmailAndPassword, api.logInUser)
router.post('/logout', verifyToken, api.logOutUser)
router.post('/ads', isEmptyAddJob, verifyToken, isAdmin, api.postJob) //! ONLY ADMIN
router.post('/favorites', verifyToken, api.addFavorite)

// PUT
router.put('/user', verifyToken, api.updateUser)
router.put('/ads', verifyToken, isAdmin, api.updateJob) //! ONLY ADMIN


// DELETE
router.delete('/user', verifyToken, isAdmin, api.deleteUser) //! ONLY ADMIN
router.delete('/ads', verifyToken, isAdmin, api.deleteJob) //! ONLY ADMIN
router.delete('/favorites', verifyToken, api.deleteFavorite)

module.exports = router