const ProductModel = require('../models/ProductModel');
const AdminModel = require('../models/AdminModel');
const jwt = require('jsonwebtoken');

const key = "process.env.SECRET_KEY";

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const admin = await AdminModel.findOne({ email });
        if (!admin || admin.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ _id: admin._id, email: admin.email }, key);
        res.status(200).json({ message: "You are logged in", adminToken: token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createAdmin = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        await AdminModel.create({ email, password, username });
        res.status(200).json({ message: "Admin is registered" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};