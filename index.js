const app = require("./app")
const connectDatabase = require("./Data/databaseConnect")
require('dotenv').config()

process.on("uncaughtException", () => {
    console.log("UnCaughtException")
    server.close();
})

connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is up and running on ${process.env.PORT}`)
})


process.on("unhandledRejection", (error) => {
    console.log('Error ', error.message)
    console.log("Shutting down server due to unhandledRejection")

    server.close(() => {
        process.exit(1);
    })
})