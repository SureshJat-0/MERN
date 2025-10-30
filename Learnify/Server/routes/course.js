import express from "express";

import verifyToken from "../middlewares/auth.js";
import { uploadCourse, getAllCourses, getTeacherCourses, getCourse, editcourse, addStudentInCourse, getStudentCourses } from "../controllers/course.js";

const CourseRouter = express.Router();

CourseRouter.route("/get/:courseId").get(getCourse);
CourseRouter.route("/edit").put(editcourse);
CourseRouter.route("/new").post(verifyToken, uploadCourse);
CourseRouter.route("/all").get(getAllCourses);
CourseRouter.route("/teacher/:teacherId").get(getTeacherCourses);
CourseRouter.route("/student/:studentId").get(getStudentCourses);
CourseRouter.route("/student/new").post(verifyToken, addStudentInCourse);

export default CourseRouter;
