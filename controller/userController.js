const User = require("../Data/Models/userModel")
const catchAsyncError = require("../middleware/catchAsyncError")

const registerUser = catchAsyncError(async (req, res) => {
    const { name, password } = req.body
    const user = await User.create({
        name, password,

    })

    res.status(200).json({
        sucess: true,
        user,

    })
})

const loginUser = catchAsyncError(async (req, res) => {
    const { name, password } = req.body

    if (!name || !password) {
        return next(new ErrorHandler("Provide Email Id or password", 400))
    }

    const user = await User.findOne({ name }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid User Id or Password", 401))
    }

    const isPasswordMatched = user.password === password

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid User Id or Password", 401))
    }

    res.status(200).json({
        sucess: true,
        user,

    })
})
module.exports = { registerUser, loginUser }