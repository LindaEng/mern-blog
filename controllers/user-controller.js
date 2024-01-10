const User = require("../models/User")

//READ
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        if (users.length === 0) {
            return res.status(404).json({message: "no users found"})
        }
        res.status(200).json({users})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Users not found"})
        next(error)
    }
}

//CREATE


//UPDATE


//DELETE

module.exports = {
    getAllUsers
}