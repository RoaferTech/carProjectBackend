import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/upload/",
  filename: (req, file, cb) => {
    const uniqueSuffex = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extenstion = file.mimetype.startsWith("videos")
      ? ".mp4"
      : `.${file.originalname.split(".").pop()}`;
    cb(null, file.filename + "-" + uniqueSuffex + extenstion);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});
export default upload;
