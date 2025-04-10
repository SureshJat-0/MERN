const mongoose = require('mongoose');

const connectMongo = async (url) => {
    await mongoose.connect(url);
}

module.exports = connectMongo;