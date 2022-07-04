const express = require("express");
const { registerUser } = require("../controller/userController");

const router = express.Router();


router.route("/user/register", registerUser)

module.exports = router