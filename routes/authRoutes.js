import express from "express";
import {
  forgetPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controller/authController.js";
import upload from "../config/uploadImage.js";

const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forget-pass", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;
