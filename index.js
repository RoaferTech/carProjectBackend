import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ConnectDB } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import reviewRoutes from "./routes/reviewsRoutes.js";
import blogsRoutes from "./routes/blogRoutes.js";
dotenv.config();
const app = express();

ConnectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/cars", reviewRoutes);
app.use("/api/blogs", blogsRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
``;
