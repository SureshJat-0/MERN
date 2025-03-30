const express = require("express");
const flashRouter = express.Router();

const { showFlashMsg, setInfoMsg } = require("../Controller/handleFlash.js");

flashRouter.route("/show").get(showFlashMsg);
flashRouter.route("/info").post(setInfoMsg);

module.exports = flashRouter;
