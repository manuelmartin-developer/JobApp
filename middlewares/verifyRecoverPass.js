const User = require('../models/users')

isEmptyRecover= (req, res, next) => {

    const email = req.body.email;

    if (email === '') {
        res.sendStatus(411);
        return;
    }
    next();
};
isValidEmailRecover = (req, res, next) => {
    const email = req.body.email;
    const regEx = /\S+@\S+\.\S+/;
    if (!regEx.test(email)) {
        res.sendStatus(406);
        return;
    }
    next();
};

checkEmailRecover= (req, res, next) => {
    const user = User.getUser(req.body.email)
        .then((data) => {
            if (data.length == 0) {
                return res.sendStatus(400)
            }
            next()
        })
};



const verifyUserRecover = {
    isEmptyRecover,
    isValidEmailRecover,
    checkEmailRecover
}

module.exports = verifyUserRecover