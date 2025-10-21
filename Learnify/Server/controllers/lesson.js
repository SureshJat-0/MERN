import Course from "../models/course.js";
import Lesson from "../models/lesson.js";

const getLesson = async (req, res) => {
  const { lessonId } = req.params;
  if(!lessonId) return res.send({ message: "Invalid lessonId!"});
  const lesson = await Lesson.findById(lessonId);
  if(!lesson) return res.send({ message: "Lesson not found!"});
  res.send(lesson);
}

const postNewLesson = async (req, res) => {
  const { courseId, title, description } = req.body;
  const course = await Course.findById(courseId);
  if (!course) return res.send({ message: "Invalid CourseId!" });
  const lesson = await Lesson.create({ title, description });
  course.lessons.push(lesson);
  await course.save();
  res.send({ lesson, message: "New lesson added!" });
};

const editLesson = async (req, res) => {
  const { lessonId, title, description } = req.body;
  const updatedLesson = { title, description };
  const lesson = await Lesson.findByIdAndUpdate(
    lessonId,
    { $set: updatedLesson },
    { new: true }
  );
  await lesson.save();
  if (!lesson) return res.send({ message: "Invalid lessonId!" });
  res.send({ message: "Lesson updated!", lesson });
};

export { postNewLesson, editLesson, getLesson };
