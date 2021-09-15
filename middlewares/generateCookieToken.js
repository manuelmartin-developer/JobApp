const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateCookieToken = (req, res, next) => {

    if(!req.params){
        next();
    }else{
        const token = req.params.token;
        res.cookie('token', token, {
            secure: false,
            httpOnly: true
        })
        next()
    }
}
module.exports = generateCookieToken