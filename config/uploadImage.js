import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extenstion = file.mimetype.startsWith("video/")
      ? ".mp4"
      : `.${file.originalname.split(".").pop()}`;
    cb(null, file.filename + "-" + uniqueSuffix + extenstion);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});
export default upload;
