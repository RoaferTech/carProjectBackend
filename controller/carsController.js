import Car from "../models/CarsModel.js";
export const createCar = async (req, res) => {
  const {
    title,
    price,
    model,
    mileage,
    condition,
    transmission,
    fuelType,
    desc,
  } = req.body;
  try {
    const newCar = new Car({
      title,
      price,
      model,
      mileage,
      condition,
      transmission,
      fuelType,
      desc,
      image: req.file ? req.file.path : null,
    });
    const savedCar = await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: savedCar });
  } catch (error) {
    console.error("Error creating car:", error);
    res
      .status(500)
      .json({ message: "Failed to create car", error: error.message });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch cars", error: error.message });
  }
};

export const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findById(id).populate({
      path: "reviews",
      populate: { path: "user", select: "username email" },
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ car, message: "Fetched Car By id" });
  } catch (error) {
    console.error("Error fetching car:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch car", error: error.message });
  }
};

export const updateCar = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car updated successfully", updatedCar });
  } catch (error) {
    console.error("Error updating car:", error);
    res
      .status(500)
      .json({ message: "Failed to update car", error: error.message });
  }
};

export const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting cars:", error);
    res
      .status(500)
      .json({ message: "Failed to delete car", error: error.message });
  }
};
