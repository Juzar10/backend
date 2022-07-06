const express = require("express")
const errorMiddleware = require("./middleware/errorMiddleware")
const app = express()

var cors = require('cors')

app.use(cors()) // Use this after the variable declarationw
app.use(express.json())


const books = require("./routes/booksRoute")
const user = require("./routes/userRoutes")


app.use("/api/v1", books)
app.use("/api/v1", user)

app.use(errorMiddleware)

module.exports = app