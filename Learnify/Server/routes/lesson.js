import express from "express";

import verifyToken from "../middlewares/auth.js";

import { postNewLesson } from "../controllers/lesson.js";

const LessonRouter = express.Router();

LessonRouter.route("/new").post(verifyToken ,postNewLesson);

export default LessonRouter;