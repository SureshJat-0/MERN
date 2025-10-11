import express from "express";

import { uploadCourse, getAllCourses } from "../controllers/course.js";

const CourseRouter = express.Router();

CourseRouter.route("/new").post(uploadCourse);
CourseRouter.route("/all").get(getAllCourses);

export default CourseRouter;
