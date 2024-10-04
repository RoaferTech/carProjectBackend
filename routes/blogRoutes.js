import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controller/blogsController.js";
import upload from "../config/uploadImage.js";
const router = express.Router();
router.post("/", upload.single("image"), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
