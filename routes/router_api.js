// Se corresponde con /controllers/api - CAMBIAR NOMBRES
const router = require('express').Router();
const api = require('../controllers/api')

// GET
router.get('/search', api.searchJob)

// POST
router.post('/user', api.signInUser)
router.post('/login', api.logInUser)
router.post('/logout', api.logOutUser)
router.post('/ads', api.postJob) //! ONLY ADMIN
router.post('/favorites', api.addFavorite)

// PUT
router.put('/user', api.updateUser)
router.put('/ads', api.updateJob) //! ONLY ADMIN


// DELETE
router.delete('/user', api.deleteUser) //! ONLY ADMIN
router.delete('/ads', api.deleteJob) //! ONLY ADMIN
router.delete('/favorites', api.deleteFavorite)

module.exports = router