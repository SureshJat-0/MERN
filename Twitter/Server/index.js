const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const articleRouter = require("./Routes/article.js");
const UserRouter = require("./Routes/User.js");
const flashRouter = require("./Routes/flash.js");
const sessionMiddleware = require("./Middlewares/session.js");
const passport = require("passport");
const User = require("./Models/user.js");
const LocalStratagy = require("passport-local");
const flash = require("connect-flash");

const { connectMongo } = require("./config.js");
const url =
  "mongodb://127.0.0.1:27017/twitter?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4";

const PORT = 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//sessions
app.use(sessionMiddleware);
//authantication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// connecting mongodb
connectMongo(url)
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => console.log("Mongo Error"));

// Route for retrive flash message
app.use("/api/flash", flashRouter);

// Article Router
app.use("/api/data", articleRouter);

// login, signup routes
app.use("/api/auth", UserRouter);

app.listen(PORT, () => {
  console.log("Server Started");
});
