const express = require('express');
const HistoryRouter = express.Router();

const { getHistory, setHistory } = require('../Controller/History');

HistoryRouter.route('/').get(getHistory).post(setHistory);

module.exports = HistoryRouter;