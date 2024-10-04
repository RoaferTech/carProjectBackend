import express from "express";
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controller/carsController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import upload from "../config/uploadImage.js";

const router = express.Router();
router.post("/", protectRoute, upload.single("image"), createCar);
router.get("/", getAllCars);
router.get("/:id", getCarById);
router.put("/:id", protectRoute, upload.single("image"), updateCar);
router.delete("/:id", protectRoute, deleteCar);

export default router;
