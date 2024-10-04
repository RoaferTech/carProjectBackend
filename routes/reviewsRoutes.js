import express from "express";
import {
  addReview,
  getReviewForCar,
  deleteReview,
  updateReview,
  getReviewById,
} from "../controller/reviewsController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/review", protectRoute, addReview);
router.get("/:id/reviews", getReviewForCar);
router.get("/:id/reviews/:id", getReviewById);
router.put("/:id/reviews/:id", protectRoute, updateReview);
router.delete("/:id/review/:id", protectRoute, deleteReview);

export default router;
