import mongoose from "mongoose";

export const ConnectDB = () => {
  const MONGO_URL = process.env.MONGO_URI;
  mongoose
    .connect(`${MONGO_URL}`)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};
