const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".png");
  },
});

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/files/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniquesuffix + "." + ext);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

const uploadFile = multer({
  storage: fileStorage,
  limits: { fileSize: 1000000 },
});

const bannerImgResize = async (req, res, next) => {
  if (!req.file) return next();
  await sharp(req.file.path)
  .resize(372, 437)
  .toFormat("png")
  .png({ quality: 90 })
  .toFile(`public/images/banners/${req.file.filename}`);
  fs.unlinkSync(`public/images/${req.file.filename}`);
  next();
};

const brandImgResize = async (req, res, next) => {
  if (!req.file) return next();
  await sharp(req.file.path)
  .resize(172, 172)
  .toFormat("png")
  .png({ quality: 90 })
  .toFile(`public/images/brands/${req.file.filename}`);
  fs.unlinkSync(`public/images/${req.file.filename}`);
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.file) return next();
  await sharp(req.file.path)
  .resize(640, 360)
  .toFormat("png")
  .png({ quality: 90 })
  .toFile(`public/images/blogs/${req.file.filename}`);
  fs.unlinkSync(`public/images/${req.file.filename}`);
  next();
};

const categoryImgResize = async (req, res, next) => {
  await sharp(req.file.path)
  .resize(512, 512)
  .toFormat("png")
  .png({ quality: 90 })
  .toFile(`public/images/categories/${req.file.filename}`);
  fs.unlinkSync(`public/images/${req.file.filename}`);
  next();
};

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
        fs.unlinkSync(`public/images/${file.filename}`);
    })
  );
  next();
};

module.exports = { uploadPhoto, productImgResize, bannerImgResize, brandImgResize, categoryImgResize, uploadFile, blogImgResize };
