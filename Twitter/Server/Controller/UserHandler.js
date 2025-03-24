const User = require('../Models/user.js');

const HandleSignupPost = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return res.status(400).send({Status: 'Error', message: 'Fill all fields'});
    }
    let newUser = new User({username});
    const registerdUser = await User.register(newUser, password);
    console.log(registerdUser);
    res.json({status: 'Success'});
}

const HandleLoginPost = (req, res) => {
    res.json({status: 'Success', user: req.user});
}

module.exports = {
    HandleSignupPost,
    HandleLoginPost,
}