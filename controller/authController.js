import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/UserModel.js";
const sendToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
};
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exists" });
    }
    user = await User.create({
      username,
      email,
      password,
      image: req.file ? req.file.path : null,
    });
    sendToken(user, res);

    res
      .status(201)
      .json({ success: true, user, message: "User Register Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    sendToken(user, res);
    res
      .status(200)
      .json({ success: true, user, message: "user login successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date() });
  res.status(200).json({ success: true, message: "User logout Successfull" });
};
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save();

    const transportor = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.RECEIVER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: "Password Reset",
      text: `You are receiving this email because you requested a password reset. 
      Please click on the following link to reset your password: ${resetUrl}`,
    };
    await transportor.sendMail(mailOptions);
    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Error in requestResetPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log("here is user");

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.password = password || user.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};
