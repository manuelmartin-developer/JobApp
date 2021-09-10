const User = require('../models/users');


isEmptyRegister = (req, res, next) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;

    if(name ==='' || surname === '' || email === '' || password === ''){
        res.sendStatus(411);
        return;
    }
    next();
};
isValidEmailRegister = (req, res, next) => {
    const email = req.body.email;
    const regEx = /\S+@\S+\.\S+/;
    if(!regEx.test(email)){
        res.sendStatus(406);
        return;
    }
    next();
};

checkDuplicateEmail = (req, res, next) => {
    
    User.getUser(req.body.email)
    .then(user => {
        if(user.length !== 0){
            res.sendStatus(400);
            return;
        };
        next();
    });

  };
validatePassword = (req, res, next) => {
    const password = req.body.password;
    //! Intentar con regex
    if (password.length < 6) {
        res.sendStatus(409)
        return;
    };
    next();
};

  const verifySignUp = {
    checkDuplicateEmail,
    isValidEmailRegister,
    validatePassword,
    isEmptyRegister
  };
  module.exports = verifySignUp;