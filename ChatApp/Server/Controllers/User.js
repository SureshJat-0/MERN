const User = require("../Models/User")

const getAllUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.json(allUsers);
}
const getUserProfile = async (req, res) => {
    if(req.isAuthenticated()) {
        res.status(200).json({user: req.user});
    } else {
        res.status(401).json({status: 'Fail', message: 'Unautherised!'});
    }
}

module.exports = {
    getAllUsers,
    getUserProfile,
}