const express = require("express")
const { getAllUsers, getUserById, signUpUser, login } = require("../controllers/user-controller")
const router = express.Router()


router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.post("/signup", signUpUser)
router.post("/login", login)

module.exports = router