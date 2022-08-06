const User = require("../Data/Models/userModel")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../util/errorHandler")

const registerUser = catchAsyncError(async (req, res) => {
    const { email, password, username } = req.body
    const user = await User.create({
        email, password, username

    })

    res.status(200).json({
        sucess: true,
        user,

    })
})

const loginUser = catchAsyncError(async (req, res, next) => {
    const { name, password } = req.body

    if (!name || !password) {
        return next(new ErrorHandler("Provide Email Id or password", 400))
    }
    const user = await User.findOne({ email: name }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid User Id or Password", 401))
    }

    const isPasswordMatched = user.password === password


    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid  Password", 401))
    }

    res.status(200).json({
        sucess: true,
        user,

    })
})
module.exports = { registerUser, loginUser }