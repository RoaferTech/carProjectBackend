import mongoose from "mongoose";
const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Car Title is required"],
  },
  price: {
    type: Number,
    required: [true, "Car price is required"],
  },
  image: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: [true, "Car model is required"],
  },
  mileage: {
    type: String,
    required: [true, "Mileage is required"],
  },
  condition: {
    type: String,
    enum: ["used", "new", ""],
    // required: [true, "Car condition is required"],
  },
  transmission: {
    type: String,
    enum: ["automatic", "manual"],
    required: [true, "Transmission is required"],
  },
  fuelType: {
    type: String,
    enum: ["petrol", "diesel", "electric", "hybrid"],
    required: [true, "Fuel Type is required"],
  },
  desc: {
    type: String,
    maxLength: [500, "Description cannot exceed 500 characters"],
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

carSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

carSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Car = mongoose.model("Car", carSchema);

export default Car;
