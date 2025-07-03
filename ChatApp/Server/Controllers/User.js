const CustomError = require("../CustomError");
const User = require("../Models/User");
const passport = require('passport');

const handleUserSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new CustomError("All Fields are require", 400));
  }
  const newUser = new User({ username, email });
  const registedUser = await User.register(newUser, password);
  console.log("New user created: ", newUser.username);
  res.status(200).send({
    success: true,
    user: registedUser,
  });
};

const handleUserLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new CustomError("All Fields are require", 400));
  }
  passport.authenticate('local', (err, user, info) => {
    if(err) return next(err);
    if(!user) return next(new CustomError("Invalid Credentials!", 401));
    req.logIn(user, (err) => {
      if(err) return next(err);
      req.user = user;
      return res.status(200).json({success: true, message: "Login successful!"});
    })
  })(req, res, next);
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
