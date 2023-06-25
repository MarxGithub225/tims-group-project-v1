const fs = require("fs");
const asyncHandler = require("express-async-handler");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const files = req.files;
    res.json(files);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadSingleImage = asyncHandler(async (req, res) => {
  try {
    const file = req.file;
    res.json(file);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImage = asyncHandler(async (req, res) => {
  const { folder, path } = req.params;
  try {
    fs.unlinkSync('public/images/' + `${folder}/${path}`);
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImage,
  uploadSingleImage
};