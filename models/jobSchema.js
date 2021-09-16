const mongoose = require('../utils/nosql_db')

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
    },
    jobCompany: {
        type: String,
    },
    jobLocation: {
        type: String,
    },
    jobDate: {
        type: String,
    },
    jobImg: {
        type: String,
    },
    jobUrl: {
        type: String,
    },
})

module.exports = mongoose.model('Job', jobSchema, 'JobOffers')
