const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxlength: [30, "Name cannot exceed 30"],
        minlength: [4, "Name should have more than 5 characters"]
    },

    password: {
        type: String,
        required: [true, "Please Enter a Password"],
        minlength: [8, "Password should be greater than 8 characters"],
        select: false
    },

})

module.exports = mongoose.model("User", userSchema)