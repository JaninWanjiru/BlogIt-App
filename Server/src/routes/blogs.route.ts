import { Router } from "express";
import { createBlog, getAllBlogs } from "../controllers/blog.controller";
import userVerification from "../middleware/UserVerification";

const router = Router()

router.post('/',userVerification, createBlog);
router.get("/",  getAllBlogs)

export default router;