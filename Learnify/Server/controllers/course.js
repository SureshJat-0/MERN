import Course from "../models/course.js";
import User from "../models/user.js";

const getCourse = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId).populate("lessons");
  if (!course) return res.send({ message: "Invalid CourseId!" });
  res.send(course);
};

const editcourse = async (req, res) => {
  const { courseId, title, description } = req.body;
  const updatedData = { title, description };
  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { $set: updatedData },
    { new: true }
  );
  if (!updatedCourse) return res.send({ message: "Invalid courseId!" });
  res.send({ message: "Document updated!", updatedCourse });
};

const uploadCourse = async (req, res) => {
  const { title, description } = req.body;
  if (!title && !description)
    return res
      .statut(400)
      .send({ message: "Title and description is required!" });
  const course = await Course.create({ title, description });
  // Adding course to teacher DB
  const teacher = await User.findById(req.user.id);
  if (!teacher) return res.send({ message: "No teacher found!" });
  if (teacher.role !== "teacher")
    return res.send({ message: "User is not teacher!" });
  teacher.courses.push(course);
  await teacher.save();
  return res
    .status(200)
    .send({ message: "Course register successfully", course });
};

const getAllCourses = async (req, res) => {
  const courses = await Course.find({});
  res.send(courses);
};

const getTeacherCourses = async (req, res) => {
  const teacherId = req.params.teacherId;
  const teacher = await User.findById(teacherId).populate("courses");
  if (!teacher) return res.send({ message: "Invalid teacherId" });
  const courses = teacher.courses;
  res.send(courses);
};

export {
  uploadCourse,
  getAllCourses,
  getTeacherCourses,
  getCourse,
  editcourse,
};
