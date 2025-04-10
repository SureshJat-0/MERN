const express = require('express');
const QuizRouter = express.Router();

const { handleGetQuesions } = require('../Controller/Quiz.js');

QuizRouter.route('/questions').get(handleGetQuesions);

module.exports = QuizRouter;