const http = require("http");
const express = require("express");
const port = 3000;
const cors = require("cors");
const { setupSocket } = require("./setupSocket.js");
const UserRouter = require("./Routes/User.js");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./Models/User.js");
const session = require("express-session");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
// to parse form data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// session
app.use(
  session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

// authentication
app.use(passport.session());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const server = http.createServer(app);
setupSocket(server);

app.use("/api/auth", UserRouter);

// connnection mongodb
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/chatapp?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4"
  )
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error caught: ", err);
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
});

server.listen(port, () => {
  console.log(`Server started: http://localhost:${port}/`);
});
