import Course from "../models/course.js";

const uploadCourse = async (req, res) => {
  const { title, description } = req.body;
  if (!title && !description)
    return res
      .statut(400)
      .send({ message: "Title and description is required!" });
  const course = await Course.create({ title, description });
  return res
    .status(200)
    .send({ message: "Course register successfully", course });
};

const getAllCourses = async (req, res) => {
  const courses = await Course.find({});
  res.send(courses);
};

export { uploadCourse, getAllCourses };
