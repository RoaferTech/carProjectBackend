import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, "Comment is Required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reviewSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
