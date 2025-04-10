const Quesion = require('../Models/Question.js');

const handleGetQuesions = async (req, res) => {
    const questions = await Quesion.find();
    res.send(questions);
}

module.exports = {
    handleGetQuesions,
}