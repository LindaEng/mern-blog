const express = require("express")
const app = express()
const mongoose = require("mongoose")

require("dotenv").config()
const MONGO_URL=process.env.MONGO_URL

app.use("/api", (req, res, next) => {
    res.send("Hello World")
})

mongoose.connect(MONGO_URL).then(() => {
    app.listen(3000, () => {
        console.log("app is listening to port 3000")
    })
}).catch((error) => console.log(error))

