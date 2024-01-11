const express = require("express")
const router = express.Router()

const { getAllUsers, getUserById, signUpUser, login } = require("../controllers/user-controller")



router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.post("/signup", signUpUser)
router.post("/login", login)

module.exports = router