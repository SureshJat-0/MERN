import express from "express";

import verifyToken from "../middlewares/auth.js";

import { editLesson, postNewLesson, getLesson } from "../controllers/lesson.js";

const LessonRouter = express.Router();

LessonRouter.route("/get/:lessonId").get(getLesson);
LessonRouter.route("/new").post(verifyToken ,postNewLesson);
LessonRouter.route("/edit").put(verifyToken ,editLesson);

export default LessonRouter;