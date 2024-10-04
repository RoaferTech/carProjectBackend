import mongoose from "mongoose";
const blogsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: [true, "Blog Title is required"],
  },
  content: {
    type: String,
    required: [true, "Blog content required"],
  },
  auther: {
    type: String,
    required: [true, "Blog auther is required"],
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
blogsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
const Blog = mongoose.model("Blog", blogsSchema);

export default Blog;
