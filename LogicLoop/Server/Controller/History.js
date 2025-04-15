const History = require("../Models/History.js");

const getHistory = async (req, res) => {
    const history = await History.find({}).populate("player");
    console.log(history);
  res.status(200).send(history);
};

const setHistory = async (req, res) => {
  try {
    const { name, score } = req.body;
    const player = req.user;
    if (player === undefined) {
      return res.status(400).send({ message: "You are not logged in" });
    }
    if (!name || !score) {
      return res.status(400).send({ message: "Invalid input" });
    }
    const history = await History.create({
      name,
      score,
      player,
    });
    console.log(history);
    res.status(200).send(history);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHistory,
  setHistory,
};
