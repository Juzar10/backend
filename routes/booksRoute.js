const express = require("express");
const { popularBooks, PopularBookGenre, searchBooks, autoCompleteBooks, detailBook } = require("../controller/booksController");
const { registerUser, loginUser } = require("../controller/userController");

const router = express.Router();

router.route("/books/popular/:genre").get(PopularBookGenre)
router.route("/books/popular").get(popularBooks)
router.route("/books/autocomplete").get(autoCompleteBooks)
router.route("/books").get(searchBooks)

router.route("/books/:id").get(detailBook)

router.route("/user/register").post(registerUser)

router.route("/user/login").post(loginUser)



module.exports = router