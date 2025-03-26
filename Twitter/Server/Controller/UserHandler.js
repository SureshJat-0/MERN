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

const handleLoginPost = (req, res) => {
  res.json({ status: "Success", user: req.user });
};

const handleLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.json({logout: 'Success'});
  });
};

module.exports = {
  handleSignupPost,
  handleLoginPost,
  handleLogout,
};
