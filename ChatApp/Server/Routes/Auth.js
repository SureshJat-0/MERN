const express = require('express');
const AuthRouter = express.Router();

const { handleSignup, handleLogin } = require('../Controllers/Auth');

AuthRouter.route('/signup').post(handleSignup);
AuthRouter.route('/login').post(handleLogin);

module.exports = AuthRouter;