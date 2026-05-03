const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"]
    },  
    password: {
        type: String,
        required: true
    }

    // name: String,
    // email: String,
    // password: String
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel