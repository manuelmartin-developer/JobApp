const crypt = require('bcryptjs')
const User = require('../models/users')



checkEmailAndPassword = ((req, res, next) => {
    const user = User.getUser(req.body.email)
        .then((data) => {
            if (data.length == 0) {
                return res.sendStatus(400)
            }
            const passwordIsValid = crypt.compareSync(req.body.password, data[0].password)
            if (!passwordIsValid) {
                return res.sendStatus(401)
            }
            next()
        })
})

const verifyUserLogin = { checkEmailAndPassword }

module.exports = verifyUserLogin