const User = require("../Models/User");

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
};

module.exports = {
  getAllUsers,
};
