require("dotenv").config();
const express = require("express");
const http = require("http");
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const socketFunction = require("./socket");
const passport = require("passport");
const User = require("./Models/User");
const { default: mongoose } = require("mongoose");
const LocalStretagy = require("passport-local").Strategy;
const session = require("express-session");
const AuthRouter = require("./Routes/Auth");
const UserRouter = require("./Routes/User");
const ChatRouter = require("./Routes/Chat");
const { ErrorHandler } = require("./Error");
const MongoStore = require("connect-mongo");

app.set("trust proxy", 1); // trust first proxy — needed for HTTPS cookies to work
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: {
      secure: true, // for production : https
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStretagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDb connected!");
  })
  .catch((err) => console.log("Mongo Error!", err));

// socket
socketFunction(server);

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/chat", ChatRouter);

// error handler
app.use(ErrorHandler);

server.listen(PORT, () => console.log("server started!"));
