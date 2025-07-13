import { Router } from "express";
import { createBlog } from "../controllers/blog.controller";
import userVerification from "../middleware/UserVerification";

const router = Router()

router.post('/',userVerification, createBlog);

export default router;