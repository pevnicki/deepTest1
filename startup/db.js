const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

const dbConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}

module.exports = function () {
    const db = config.get('db');
    mongoose.connect(db, dbConfig)
        .then(() => winston.info(`Connected to ${db}...`));
}
