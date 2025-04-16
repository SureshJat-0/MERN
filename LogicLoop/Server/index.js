const express = require("express");
const port = 3000;
const app = express();
const connectMongo = require("./mongoConnect.js");
const QuizRouter = require("./Routes/quiz.js");
const UserRouter = require("./Routes/User.js");
const HistoryRouter = require("./Routes/History.js");
const cors = require("cors");
const passport = require("passport");
const User = require("./Models/User.js");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

// Allow requests from frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "MySureshSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
    }
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const dbUrl =
  "mongodb://127.0.0.1:27017/LogicLoop?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4";
connectMongo(dbUrl)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => console.log("Mongo Error"));

app.use("/api/quiz", QuizRouter);
app.use("/api/auth", UserRouter);
app.use("/api/history", HistoryRouter);

app.listen(port, () => {
  console.log(`Server started : http://localhost:${port}`);
});
