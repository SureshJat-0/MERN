const express = require("express");
const articleRouter = express.Router();

const { HandlePostArticle, HandleGetArticles, HandleGetProfileArticles } = require("../Controller/HandleArticle.js");

articleRouter.route("/").post(HandlePostArticle);
articleRouter.route("/").get(HandleGetArticles);
articleRouter.route('/profile').get(HandleGetProfileArticles);

module.exports = articleRouter;
