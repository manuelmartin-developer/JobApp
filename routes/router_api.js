// Se corresponde con /controllers/api - CAMBIAR NOMBRES
const router = require('express').Router();
const api = require('../controllers/api')
const { isEmptyRegister, isValidEmail, checkDuplicateEmail, validatePassword } = require('../middlewares/verifyUserRegister');
const { isEmptyAddJob } = require('../middlewares/verifyAddJob');

// GET
router.get('/search', api.searchJob)
router.get('/ads', api.getAllJobs)//! ONLY ADMIN

// POST
router.post('/user', isEmptyRegister, isValidEmail, checkDuplicateEmail, validatePassword, api.postUser)
router.post('/login', api.logInUser)
router.post('/logout', api.logOutUser)
router.post('/ads', isEmptyAddJob, api.postJob) //! ONLY ADMIN
router.post('/favorites', api.addFavorite)

// PUT
router.put('/user', api.updateUser)
router.put('/ads', api.updateJob) //! ONLY ADMIN


// DELETE
router.delete('/user', api.deleteUser) //! ONLY ADMIN
router.delete('/ads', api.deleteJob) //! ONLY ADMIN
router.delete('/favorites', api.deleteFavorite)

module.exports = router