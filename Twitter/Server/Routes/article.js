const express = require("express");
const articleRouter = express.Router();

const { HandlePostArticle, HandleGetArticles, HandleGetOneArticle } = require("../Controller/HandleArticle.js");

articleRouter.route("/").post(HandlePostArticle);
articleRouter.route("/").get(HandleGetArticles);
articleRouter.route('/:id').get(HandleGetOneArticle);

module.exports = articleRouter;
