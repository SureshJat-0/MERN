import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import AuthRouter from "./routes/auth.js";
import CourseRouter from "./routes/course.js";

dotenv.config();

var corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

const app = express();
const PORT = 3000;

// Add this middleware to parse JSON bodies
app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb Connnected!"));

app.use("/api/auth", AuthRouter);
app.use("/api/courses", CourseRouter);

app.listen(PORT, () => {
  console.log("Server started!");
});
