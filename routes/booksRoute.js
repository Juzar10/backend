const express = require("express");
const getBooks = require("../controller/books");

const router = express.Router();

router.route("/books").get(getBooks)


module.exports = router