import express from "express";

import verifyToken from "../middlewares/auth.js";
import { uploadCourse, getAllCourses, getTeacherCourses, getCourse } from "../controllers/course.js";

const CourseRouter = express.Router();

CourseRouter.route("/get/:courseId").get(getCourse);
CourseRouter.route("/new").post(verifyToken, uploadCourse);
CourseRouter.route("/all").get(getAllCourses);
CourseRouter.route("/teacher/:teacherId").get(getTeacherCourses);

export default CourseRouter;
