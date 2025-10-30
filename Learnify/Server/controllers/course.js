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
  res.send({ message: "Course updated!", updatedCourse });
};

const uploadCourse = async (req, res) => {
  const { title, description } = req.body;
  if (!title && !description)
    return res
      .status(400)
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

const addStudentInCourse = async (req, res) => {
  const { courseId, studentId } = req.body;
  if (!courseId) return res.send({ message: "Course id required!" });
  if (!studentId) return res.send({ message: "Student id required!" });
  // adding student id in course
  const course = await Course.findById(courseId);
  course.students.push(studentId);
  await course.save();
  // adding course id in student
  const student = await User.findById(studentId);
  student.courses.push(courseId);
  await student.save();
  res.send({ student: studentId, message: "New student added!" });
};

const getStudentCourses = async (req, res) => {
  const studentId = req.params.studentId;
  const student = await User.findById(studentId).populate("courses");
  if (!student) return res.send({ message: "Invalid studentId" });
  const courses = student.courses;
  res.send(courses);
};

export {
  uploadCourse,
  getAllCourses,
  getTeacherCourses,
  getCourse,
  editcourse,
  addStudentInCourse,
  getStudentCourses,
};
