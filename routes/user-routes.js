const express = require("express")
const { getAllUsers, getUserById, signUpUser } = require("../controllers/user-controller")
const router = express.Router()


router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.post("/signup", signUpUser)

module.exports = router