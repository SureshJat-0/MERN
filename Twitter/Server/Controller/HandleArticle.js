const Article = require("../Models/article.js");

const HandlePostArticle = async (req, res) => {
  let { userName, article, imgUrl } = req.body;  
  if (!userName || !article || !imgUrl) {
    return res.status(400).send({ status: "Error", message: 'All Fields are required' });
  }
  let newArticle = await Article.create({
    userName,
    article,
    imgUrl,
  });
  console.log(newArticle);
  res.status(200).send({ status: "ok" });
};

const HandleGetArticles = async (req, res) => {
  const allArticles = await Article.find({});
  res.send(allArticles);
};

const HandleGetOneArticle = async (req, res) => {
    // remains : Error Handling for invalid length of id (using async wrap) 
    let currArticle = await Article.findById(req.params.id);
    if (!currArticle) {
        return res.status(200).send({status: 'Error', message: 'No Article found!'});
    }
    console.log(currArticle);
    res.send(currArticle);
}

module.exports = {
  HandlePostArticle,
  HandleGetArticles,
  HandleGetOneArticle
};
