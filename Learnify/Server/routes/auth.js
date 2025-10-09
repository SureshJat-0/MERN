import express from "express";
import { userRegister, userLogin } from "../controllers/auth.js";

const AuthRouter = express.Router();

AuthRouter.route("/register").post(userRegister);
AuthRouter.route('/login').post(userLogin);

export default AuthRouter;