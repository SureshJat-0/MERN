import Course from "../models/course.js";
import Lesson from "../models/lesson.js";

const postNewLesson = async (req, res) => {
  const { courseId, title, description } = req.body;
  const course = await Course.findById(courseId);
  if (!course) return res.send({ message: "Invalid CourseId!" });
  const lesson = await Lesson.create({ title, description });
  // Adding lesson to the course
  course.lessons.push(lesson);
  await course.save();
  res.send({ lesson, message: "New lesson added!" });
};

export { postNewLesson };
