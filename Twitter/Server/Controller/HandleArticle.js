const Article = require("../Models/article.js");

// post new article
const HandlePostArticle = async (req, res) => {
  let body = req.body;
  if (!body.article || !body.imgUrl) {
    return res
      .status(400)
      .send({ status: "Error", message: "All Fields are required" });
  }
  let newArticle = await Article.create({
    ...body,
    owner: req.user._id,
  });
  console.log(newArticle);
  res.status(200).send({ status: "ok" });
};

// find all articles
const HandleGetArticles = async (req, res) => {
  const allArticles = await Article.find({}).populate("owner");
  res.send(allArticles);
};

const HandleGetProfileArticles = async (req, res) => {
  let allArticles = await Article.find({}).populate('owner');
  let profileArticles = allArticles.filter((article) => {
    if (article.owner._id.equals(req.user._id)) {
      return article;
    }
  });
  res.status(200).json(profileArticles);
};

module.exports = {
  HandlePostArticle,
  HandleGetArticles,
  HandleGetProfileArticles,
};
