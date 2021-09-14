const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/users')

verifyToken = (req, res, next) => {
    if (!req.cookies.token) {
        return res.status(403).send('No token')
    }
    const token = req.cookies.token

    if (!token) {
        return res.status(401).send('No token')
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token')
        }
        req.userID = decoded.userID
        req.userEmail = decoded.email
        next()
    })
}
isAdmin = (req, res, next) => {
    User.getUser(req.userEmail)
        .then(data => {

            if (data.length === 0) {
                return res.status(401).send("No admin");
            }
            if (data[0].role === 'user') {
                return res.status(401).send("No admin");
            }

            if (data[0].role === 'admin') {
                next()
            }

        })
};
verifyRoleHome = (req, res, next) => {
    if (!req.cookies.token) {
        next();
    } else {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send("No token");
        }
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid token");
            }
            req.userID = decoded.id;
            req.userEmail = decoded.email;
        });

        User.getUser(req.userEmail)
            .then(data => {

                if (data[0].role === 'user') {
                    return res.status(200).render("home_user", {
                        data
                    });
                }

                if (data[0].role === 'admin') {
                    return res.status(200).render("home_admin", {
                        data
                    });
                }
            })
    }
};
verifyRoleProfile = (req, res, next) => {

    if (!req.cookies.token) {
        next();
    } else {
        const token = req.cookies.token;
        if (!token) {

            return res.status(401).send("No token");
        }
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid token");
            }

            req.userID = decoded.id;
            req.userEmail = decoded.email;
        });

        User.getUser(req.userEmail)
            .then(data => {

                if (data[0].role === 'user') {
                    return res.status(200).render("profile_user", {
                        data
                    });
                }

                if (data[0].role === 'admin') {
                    return res.status(200).render("profile_admin", {
                        data
                    });
                }
            })
    }
};
const authJwt = {
    verifyToken,
    isAdmin,
    verifyRoleHome,
    verifyRoleProfile
}
module.exports = authJwt