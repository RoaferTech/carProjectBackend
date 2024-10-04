import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/upload/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.startsWith("video")
      ? ".mp4"
      : `.${file.originalname.split(".").pop()}`;
    cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix + extension);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});
export default upload;
