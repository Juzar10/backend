const express = require("express")
const errorMiddleware = require("./middleware/errorMiddleware")
const app = express()

app.use(express.json())


const books = require("./routes/booksRoute")


app.use("/api/v1", books)

app.use(errorMiddleware)

module.exports = app