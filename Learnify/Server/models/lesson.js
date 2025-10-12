import mongoose from "mongoose";

const LessonSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Lesson = mongoose.model("lesson", LessonSchema);

export default Lesson;