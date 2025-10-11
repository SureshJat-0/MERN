import mongoose from "mongoose";

const CouseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lessons: [{ type: String }],
});

const Course = mongoose.model("course", CouseSchema);

export default Course;
