const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userRoutes = require("./routes/user-routes")
const blogRoutes = require("./routes/blog-routes")

require("dotenv").config()
const MONGO_URL=process.env.MONGO_URL

app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/blogs", blogRoutes)

mongoose.connect(MONGO_URL).then(() => {
    app.listen(3000, () => {
        console.log("app is listening to port 3000")
    })
}).catch((error) => console.log(error))

