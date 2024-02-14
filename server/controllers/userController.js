const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const key = process.env.SECRET_KEY;

exports.registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        await UserModel.create({ email, password, name });
        res.status(200).json({ message: "User is registered" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ _id: user._id, email: user.email }, key);
        res.status(200).json({ message: "You are logged in", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
