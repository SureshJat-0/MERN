const express = require('express');
const UserRouter = express.Router();

const { getAllUsers, getUserProfile } = require('../Controllers/User');

UserRouter.route('/users').get(getAllUsers);
UserRouter.route('/profile').get(getUserProfile);

module.exports = UserRouter;