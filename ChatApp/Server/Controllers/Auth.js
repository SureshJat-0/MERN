const passport = require("passport");
const User = require("../Models/User");

const handleSignup = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ status: "Fail", message: "All fields are require!" });
  }
  const newUser = new User({ username, password });
  const registeredUser = await User.register(newUser, password);
  console.log(registeredUser);
  res.status(200).json({
    status: "success",
    message: "User signup successfuly!",
    user: newUser,
  });
};

const handleLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ status: "Fail", message: "All fields are required!" });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err)
      return res
        .status(500)
        .json({ status: "Fail", message: "Internal server error!" });
    if (!user)
      return res
        .status(401)
        .json({
          status: "Fail",
          message: info?.message || "Invalid Credentials",
        });
    req.logIn(user, (err) => {
      if (err)
        return res
          .status(500)
          .json({ status: "Fail", message: "Internal server error!" });
      res.status(200).json({
        status: "Success",
        message: "Login successful!",
        user,
      });
    });
  })(req, res, next);
};

const handleLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ status: "fail", message: "Logout fails" });
    }
    res.clearCookie("connect.sid");
    res
      .status(200)
      .json({ status: "success", message: "User Logout successfuly!" });
  });
};

const getAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isAuthenticated: true, user: req.user });
  } else {
    return res.status(200).json({ isAuthenticated: false, user: null });
  }
};

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
  getAuthStatus,
};
