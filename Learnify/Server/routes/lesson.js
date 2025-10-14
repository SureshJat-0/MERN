import express from "express";

import verifyToken from "../middlewares/auth.js";

import { editLesson, postNewLesson } from "../controllers/lesson.js";

const LessonRouter = express.Router();

LessonRouter.route("/new").post(verifyToken ,postNewLesson);
LessonRouter.route("/edit").put(verifyToken ,editLesson);

export default LessonRouter;