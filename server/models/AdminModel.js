const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    password: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });

const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
