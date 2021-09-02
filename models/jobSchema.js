const mongoose = require('../utils/nosql_db')

const jobSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    favorites: Array,


})

module.exports = mongoose.model('Job', jobSchema, 'JobOffers')


/*
title
company
location
image
description


*/