const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const socketFunction = require("./socket");
const passport = require("passport");
const User = require("./Models/User");
const { default: mongoose } = require("mongoose");
const UserRouter = require("./Routes/User");
const LocalStretagy = require("passport-local").Strategy;
const session = require('express-session');

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(session({
  secret: 'sureshSuperSecreteKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStretagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/ChatApp?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4"
  )
  .then(() => {
    console.log("MongoDb connected!");
  })
  .catch((err) => console.log("Mongo err", err));

// socket
socketFunction(server);

app.use('/api/auth', UserRouter);

server.listen(3000, () => console.log("server started!"));
