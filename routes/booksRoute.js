const express = require("express");
const { popularBooks, PopularBookGenre, searchBooks, autoCompleteBooks, detailBook, multipleBooks } = require("../controller/booksController");

const router = express.Router();

router.route("/books/popular/:genre").get(PopularBookGenre)
router.route("/books/popular").get(popularBooks)
router.route("/books/autocomplete").get(autoCompleteBooks)
router.route("/books/:id").get(detailBook)
router.route("/books/multiplebooks").post(multipleBooks)
router.route("/books").get(searchBooks)

module.exports = router