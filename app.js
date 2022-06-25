const express = require("express")
const app = express()

const books = require("./routes/booksRoute")


app.use("/api/v1", books)

module.exports = app