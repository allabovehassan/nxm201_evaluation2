const express = require("express")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const {connection} = require("./config/db")
const {router} = require("./routes/userRouter")
const {authenticator} = require("./middleware/authentication")
const {goldRouter} = require("./routes/goldrate")

const app = express()
app.use(cookieParser())
app.use(express.json())



app.use("/user", router)
app.use(authenticator)
app.use("/product",goldRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`Connected To DB`);
    } catch (error) {
        console.log({"message":error.message});
    }
    console.log(`Server is running at ${process.env.port}`)
})
