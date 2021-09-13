const Jobs = require('../models/jobSchema');
const {
    scraperLinkedin
} = require('../utils/scraper_linkedin');
const {
    scraperWelcome
} = require('../utils/scraper_welcome');
const {
    createUser,
    getUser,
    updateAnUser,
    deleteOneUser,
    createFavorite,
    deleteOneFavorite,
    getAllUserFavorites
} = require('../models/users')

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const generateToken = require('../middlewares/generateToken');

const api = {

    searchJob: async (req, res) => {
        try {
            const query = req.query.query;
            const search = query.replace(" ", "%20");

            const linkedin = await scraperLinkedin(`https://es.linkedin.com/jobs/search?keywords=developer%20${search}&location=Espa%C3%B1a&locationId=&geoId=105646813&sortBy=DD&f_TPR=&position=1&pageNum=0`);
            const welcome = await scraperWelcome(`https://www.welcometothejungle.com/es/jobs?aroundQuery=Espa%C3%B1a%2C%20Espa%C3%B1a&refinementList%5Boffice.country_code%5D%5B%5D=ES&page=1&range%5Bexperience_level_minimum%5D%5Bmin%5D=0&range%5Bexperience_level_minimum%5D%5Bmax%5D=1&query=developer%20${search}`);
            const jobAds = await Jobs.find({
                jobTitle: {
                    $regex: query,
                    $options: 'i'
                }
            })
            const data = linkedin.concat(jobAds, welcome)
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    postUser: async (req, res) => {
        try {
            const name = await req.body.name
            const surname = await req.body.surname
            const email = await req.body.email
            const password = bcryptjs.hashSync(await req.body.password, 8)
            const newUser = await createUser(name, surname, email, password);
            if (newUser) {
                res.sendStatus(201);
            }

        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }

    },
    logInUser: async (req, res) => {
        try {
            const user = await getUser(req.body.email)
            const email = user[0].email
            const user_id = user[0].user_id
            await generateToken(res, user_id, email)
            res.sendStatus(200)
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    logOutUser: async (req, res) => {
        try {
            const token = req.headers['cookie'];
            jwt.sign(token, "", {
                expires: 1
            }, (logout, err) => {
                if (logout) {
                    res.cookie('token', token, {
                        expires: new Date(Date.now()),
                        secure: false,
                        httpOnly: true,
                    });

                    res.status(201).redirect('/');
                } else {
                    res.send({
                        msg: 'Error'
                    });
                }
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    postJob: async (req, res) => {

        try {
            const job = await new Jobs({
                jobTitle: req.body.title,
                jobCompany: req.body.company,
                jobLocation: req.body.location,
                jobDate: req.body.date,
                jobImg: req.body.image,
                jobUrl: req.body.url
            });
            const newJob = await job.save();
            res.status(200).json(newJob);

        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    getAllJobs: async (req, res) => {
        try {
            const allJobs = await Jobs.find();
            res.status(200).json(allJobs);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    addFavorite: async (req, res) => {
        try {
            const jobOffer = await req.body;

            let email;
            const header = req.headers["cookie"];
            const token = header.slice(6);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                email = decoded.email;
            });

            const newFavorite = await createFavorite(jobOffer, email);
            if (newFavorite) {
                res.sendStatus(201);
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    getAllFavorites: async (req, res) => {
        try {
            let email;
            const header = req.headers["cookie"];
            const token = header.slice(6);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                email = decoded.email;
            });
            const favorites = await getAllUserFavorites(email)
            res.status(200).json(favorites);
        } catch (error) {

        }
    },
    //! PUT
    updateUser: async (req, res) => {
        try {
            const newFields = req.body;
            const userToUpdate = await updateAnUser(newFields.newName, newFields.newSurname, newFields.newEmail, newFields.oldEmail);
            if (userToUpdate) {
                let cookieEmail;
                const header = req.headers["cookie"];
                const token = header.slice(6);
                jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                    cookieEmail = decoded.email;
                });
                if (newFields.newEmail !== newFields.oldEmail) {
                    const user = await getUser(newFields.newEmail);
                    if (cookieEmail !== newFields.oldEmail) {
                        return res.sendStatus(201);
                    }
                    const email = user[0].email;
                    const user_id = user[0].user_id;
                    await generateToken(res, user_id, email);
                    return res.sendStatus(201);
                }
                res.sendStatus(201)
            } else {
                return res.sendStatus(400)
            }
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }

    },
    updateJob: async (req, res) => {
        try {
            const url = await req.body.jobUrl;
            const data = await req.body;
            const newJob = await Jobs.findOneAndUpdate({
                jobUrl: url
            }, data);
            res.status(204).json(newJob);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    //! DELETE
    deleteUser: async (req, res) => {
        try {
            const email = await req.body.email;
            const userToDelete = await deleteOneUser(email);
            res.status(200).json(userToDelete)
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    deleteJob: async (req, res) => {
        try {
            const url = await req.body.url
            const deleteJob = await Jobs.findOneAndDelete({
                jobUrl: url
            });
            res.status(204).json(deleteJob);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    deleteFavorite: async (req, res) => {
        try {
            const id = await req.body.id;
            const favToDelete = await deleteOneFavorite(id);
            if (favToDelete) {
                res.sendStatus(200)
            } else {
                res.sendStatus(400)
            }
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
}

module.exports = api