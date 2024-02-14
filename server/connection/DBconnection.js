const mongoose = require("mongoose")

async function DBconnection(){
    await mongoose.connect('mongodb+srv://admin-Prashant:xyOJEDLx9YFrMFVu@cluster0.trqkrhz.mongodb.net/mernproject')
}

module.exports = DBconnection;