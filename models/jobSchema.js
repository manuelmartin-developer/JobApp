const mongoose = require('../utils/nosql_db')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    company: {
        type: String,
    },
    location: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    salary: {
        type: Number,
    },
})

module.exports = mongoose.model('Job', jobSchema, 'JobOffers')
