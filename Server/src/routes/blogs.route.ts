import { Router } from "express";
import { createBlog, getAllBlogs, getBlog, getUserBlogs, updateBlog, deleteBlog } from "../controllers/blog.controller";
import userVerification from "../middleware/UserVerification";

const router = Router()

router.post('/',userVerification, createBlog);
router.get("/", userVerification, getAllBlogs)
router.get("/user", userVerification, getUserBlogs)
router.get("/:blogId", userVerification, getBlog)
router.put("/:blogId", userVerification, updateBlog)
router.delete("/:blogId", userVerification, deleteBlog)

export default router;