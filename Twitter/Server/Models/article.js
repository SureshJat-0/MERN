const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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