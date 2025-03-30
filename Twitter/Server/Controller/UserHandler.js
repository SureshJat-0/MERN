const passport = require("passport");
const User = require("../Models/user.js");


const handleSignupPost = async (req, res) => {
  const { username, fullname, password } = req.body;
  if (!username || !password || !fullname) {
    return res
      .status(400)
      .send({ Status: "Error", message: "Fill all fields" });
  }
  let newUser = new User({ username, fullname });
  const registerdUser = await User.register(newUser, password);
  console.log(registerdUser);
  res.json({ status: "Success" });
};

const handleLoginPost = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err); // Handle server error
    if (!user) {
      req.flash('error_msg', info.message || 'Invalid credentials');
      return res.status(401).json({ success: false, message: info.message || "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      req.flash('success_msg', "Login successful!");
      return res.json({ success: true, message: "Login successful!" });
    });
  })(req, res, next); // Pass req, res, and next manually
}

const handleLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    req.flash('success_msg', "Loggout successful!");
    res.json({logout: 'Success'});
  });
};

module.exports = {
  handleSignupPost,
  handleLoginPost,
  handleLogout,
};
