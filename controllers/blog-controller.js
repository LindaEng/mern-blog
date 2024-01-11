const Blog = require("../models/Blog")


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
    try {
        const {title, description, image, user} = req.body
        const newBlog = await Blog.create({
            title,
            description,
            image,
            user
        })
        res.status(200).json({newBlog})
    } catch (error) {
        console.log(error)
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
        await Blog.findByIdAndDelete(id)
        res.status(200).json({message: "blog successfully deleted"})
    } catch (error) {
        console.log(error)
        next(error)
        return res.status(500).json({message: "cannot delete blog"})
    }
}

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}