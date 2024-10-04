import Car from "../models/CarsModel.js";
import Review from "../models/ReviewsModel.js";

const updateCarRating = async (id) => {
  const reviews = await Review.find({ car: id });
  if (reviews.length > 0) {
    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    await Car.findByIdAndUpdate(id, { averageRating });
  } else {
    await Car.findByIdAndUpdate(id, { averageRating: 0 });
  }
};

export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    const review = new Review({
      user: userId,
      car: id,
      rating,
      comment,
    });
    await review.save();
    car.reviews.push(review._id);
    await car.save();
    await updateCarRating(id);
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const getReviewForCar = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ car: id }).populate({
      path: "user",
      select: "username email",
    });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this car" });
    }
    res.status(200).json({ reviews, message: "All reviews here" });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await Car.findByIdAndUpdate(review.car, { $pull: { reviews: review._id } });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
