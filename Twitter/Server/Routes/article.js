const express = require("express");
const articleRouter = express.Router();
const { asyncWrap } = require("../Errors/asyncWrap.js");

const {
  HandlePostArticle,
  HandleGetArticles,
  HandleGetProfileArticles,
} = require("../Controller/HandleArticle.js");

articleRouter
  .route("/")
  .get(asyncWrap(HandleGetArticles))
  .post(asyncWrap(HandlePostArticle));
articleRouter.route("/profile").get(asyncWrap(HandleGetProfileArticles));

module.exports = articleRouter;
