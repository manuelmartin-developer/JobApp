const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (res, id_user, email) => {
    const token = jwt.sign({
        id_user, email
    }, process.env.JWT_KEY, {
        expiresIn: '1d'
    });
    return res.cookie('token', token, {
        secure: false,
        httpOnly: true
    })
}
module.exports = generateToken