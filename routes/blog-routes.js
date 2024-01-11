const express = require("express")
const router = express.Router()
const { getAllBlogs, getBlogById, getBlogsByUserId, createBlog, updateBlog, deleteBlog } = require("../controllers/blog-controller")

router.get("/", getAllBlogs)
router.get("/:id", getBlogById)
router.get("/user-blogs/:id", getBlogsByUserId)
router.post("/", createBlog)
router.put("/:id", updateBlog)
router.delete("/:id", deleteBlog)


module.exports = router