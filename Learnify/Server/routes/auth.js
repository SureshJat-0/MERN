import express from "express";
import { userRegister, userLogin, getUser } from "../controllers/auth.js";

const AuthRouter = express.Router();

AuthRouter.route("/register").post(userRegister);
AuthRouter.route('/login').post(userLogin);
AuthRouter.route('/me').get(getUser);

export default AuthRouter;