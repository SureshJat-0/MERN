import express from "express";
import { userRegister, userLogin, getUser } from "../controllers/auth.js";
import verifyToken from "../middlewares/auth.js";

const AuthRouter = express.Router();

AuthRouter.route("/register").post(userRegister);
AuthRouter.route("/login").post(userLogin);
AuthRouter.route("/me").get(verifyToken, getUser);

export default AuthRouter;
