const express = require("express")
const app = express()

app.use("/api", (req, res, next) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("app is listening to port 3000")
})