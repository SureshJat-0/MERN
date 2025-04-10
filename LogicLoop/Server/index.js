const express = require("express");
const port = 3000;
const app = express();
const connectMongo = require("./mongoConnect.js");
const QuizRouter = require("./Routes/quiz.js");
const cors = require('cors');


// Allow requests from frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

const dbUrl =
  "mongodb://127.0.0.1:27017/LogicLoop?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4";
connectMongo(dbUrl)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => console.log("Mongo Error"));

app.use("/api/quiz", QuizRouter);

app.listen(port, () => {
  console.log(`Server started : http://localhost:${port}`);
});
