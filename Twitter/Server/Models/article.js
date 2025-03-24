const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    userName: {
        type: String,
    },
    article: {
        type: String,
        require: true,
    },
    imgUrl: {
        type: String,
        require: true,
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;