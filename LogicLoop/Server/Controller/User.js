const passport = require("passport");
const User = require("../Models/User.js");

const handleSignup = async (req, res) => {
  const { username, fullname, password } = req.body;

  if (!username || !password || !fullname) {
    return res
      .status(400)
      .json({ message: "Username, fullname and password are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ username, fullname });
    const registeredUser = await User.register(newUser, password);

    // Auto-login after registration
    req.login(registeredUser, (err) => {
      if (err)
        return res.status(500).json({ message: "Login failed after signup" });

      return res.status(201).json({
        message: "User created and logged in successfully",
        user: {
          username: registeredUser.username,
          fullname: registeredUser.fullname,
        },
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

const handleLogin = async (req, res, next) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Authenticate user
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      req.session.user = user;
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
};

module.exports = {
  handleSignup,
  handleLogin,
};
