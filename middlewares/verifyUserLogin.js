const crypt = require('bcryptjs')
const User = require('../models/users')

isEmptyLogin= (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    if (email === '' || password === '') {
        res.sendStatus(411);
        return;
    }
    next();
};
isValidEmailLogin = (req, res, next) => {
    const email = req.body.email;
    const regEx = /\S+@\S+\.\S+/;
    if (!regEx.test(email)) {
        res.sendStatus(406);
        return;
    }
    next();
};

checkEmailAndPassword = (req, res, next) => {
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
};



const verifyUserLogin = {
    isEmptyLogin,
    isValidEmailLogin,
    checkEmailAndPassword
}

module.exports = verifyUserLogin