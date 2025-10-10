import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const userRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).send({ message: "Email already exists" });
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashPassword, role });
  return res.send({ message: "User registered successfully!" });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ message: "Credentials are required!" });
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ message: "User not found!" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).send({ message: "Invalid credentials!" });
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return res.send({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
};

const getUser = (req, res) => {
  res.send({ user: req.user });
};

export { userRegister, userLogin, getUser };
