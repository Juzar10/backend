const app = require("./app")
const connectDatabase = require("./database/databaseConnect")
require('dotenv').config()


connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is up and running on ${process.env.PORT}`)
}) 