import mongoose from "mongoose";

export const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "lesson" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "user"}],
});

const Course = mongoose.model("course", CourseSchema);

export default Course;
