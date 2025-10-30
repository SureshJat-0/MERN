import mongoose from "mongoose";
import { CourseSchema } from "./course.js";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
    default: "student",
    required: true,
  },
  courses: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
      }
    ],
    // Only teacher can have courses
    // validate: {
    //   validator: function (value) {
    //     if (this.role === "teacher") return true;
    //     return !value || value.length === 0;
    //   },
    // },
    // message: "Student can not have courses.",
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
