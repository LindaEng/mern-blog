const Blog = require("../models/Blog")
const User = require("../models/User")
const mongoose = require("mongoose")

const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find()
        if(blogs.length <= 0) {
            return res.status(404).json({ message: "No Blogs found"})
        }
        res.status(200).json({blogs})
    } catch(error) {
        console.log(error)
        next(error)
        return res.status(500).json({message: "Server error. Cannot retrieve Blogs"})
    }
}

const getBlogById = async (req, res, next) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)
        if(!blog) {
            return res.status(404).json({ message: "blog not found" })
        }
        return res.status(200).json({blog})
    } catch (error) {
        console.log(error)
        next(error)
        return res.status(500).json({message: "cannot find blog"})
    }
}

const createBlog = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {title, description, image, user} = req.body
        const existingUser = await User.findById(user)

        if(!existingUser){
            await session.abortTransaction()
            return res.status(400).json({ message: "User not found"})
        }

        const newBlog = await Blog.create({
            title,
            description,
            image,
            user
        })

        await newBlog.save({ session })
        existingUser.blogs.push(newBlog)
        await existingUser.save({ session })

        await session.commitTransaction()
        session.endSession()
        res.status(200).json({newBlog})

    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        next(error)
        return res.status(500).json({message: "cannot create blog"})
    }
}


const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description, image } = req.body
        await Blog.findByIdAndUpdate(id , {
            title,
            description,
            image
        })
        res.status(200).json({ message: "blog successfully updated"})
    } catch (error) {
        console.log(error)
        next(error)
        return res.status(500).json({message: "cannot update blog"})
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params
        let blog = await Blog.findByIdAndDelete(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        res.status(200).json({message: "blog successfully deleted"})
    } catch (error) {
        console.log(error)
        next(error)
        return res.status(500).json({message: "cannot delete blog"})
    }
}

const getBlogsByUserId = async (req, res, next) => {
    try {
        const { id } = req.params
        const userBlogs = await User.findById(id).populate("blogs")
        if(userBlogs.length === 0) {
           return res.status(404).json({message: "No Blogs Found"})
        }
        return res.status(200).json({userBlogs: userBlogs})
    } catch (error) {
        console.log(error)
        next(error)
        return res.status(500).json({message: "cannot retrieve user blogs"})
    }
}

module.exports = {
    getAllBlogs,
    getBlogById,
    getBlogsByUserId,
    createBlog,
    updateBlog,
    deleteBlog
}