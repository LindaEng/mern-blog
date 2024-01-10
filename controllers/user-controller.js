const User = require("../models/User")
const bcrypt = require("bcrypt")

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
        next(error)
        return res.status(500).json({message: "Users not found"})
    }
}

//READ - Get by Id
const getUserById = async (req, res, next) => {
    try {
        const {id} = req.params()
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        next(error)
        return res.status(500).json({error})
    }
}

//CREATE - Sign up
const signUpUser = async (req, res, next) => {
    try {
        console.log("REQ BODY ",req.body);
        const { name, email, password } = req.body
        const foundUser = await User.findOne({email})

        if(foundUser) {
            return res.status(409).json({message: "User already exists"})
        }

        const hashedPassword = bcrypt.hashSync(password, 5)

        const newUser = {
            name,
            email,
            password: hashedPassword
        }
        await User.create(newUser)
        res.status(200).json({message: "User has been created!"})

    } catch (error) {
        console.log(error)
        next(error)
        return res.status(500).json({message: "Error in creating User"})
    }
}

//CREATE - Login
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const existingUser = await User.findOne({email})

        if(!existingUser) {
            return res.status(404).json({message: "User not found"})
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

        if(!isPasswordCorrect) {
            return res.status(402).json({message: "password incorrect"})
        } 

        return res.status(200).json({message: `Successfully logged in! Welcome back ${existingUser.name}`})
    } catch (error) {
        console.log(error);
        next(error)
        return res.status(500).json({message: "Error in creating User"})
    }
}


//UPDATE


//DELETE

module.exports = {
    getAllUsers,
    getUserById,
    signUpUser,
    login
}