const User = require('../models/users')

isEmptyReset= (req, res, next) => {

    const pass1 = req.body.pass1;
    const pass2 = req.body.pass2;

    if (pass1 === '' || pass2 === '') {
        res.sendStatus(411);
        return;
    }
    next();
};
areBothPassEquals = (req, res, next) => {
    const pass1 = req.body.pass1;
    const pass2 = req.body.pass2;
    if (pass1 !== pass2) {
        res.sendStatus(406);
        return;
    }
    next();
};

areBothPassValid = (req, res, next) => {
    const pass1 = req.body.pass1;
    const pass2 = req.body.pass2;
    if (pass1.length < 6 || pass2.length < 6) {
        res.sendStatus(409);
        return;
    }
    next();
};



const verifyResetPass = {
    isEmptyReset,
    areBothPassEquals,
    areBothPassValid
}

module.exports = verifyResetPass