const Brand = require("../models/brandModel");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBrand = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const data = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    }
    const newBrand = await Brand.create(data);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  validateMongoDbId(_id);
  validateMongoDbId(id);
  try {
    const data = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    }
    const updatedBrand = await Brand.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBrand = await Brand.findById(id);
    if(getaBrand.image) {fs.unlinkSync('public/images/brands/' + getaBrand.image);}
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImage = asyncHandler(async (req, res) => {
  const { id, path } = req.params;
  try {

    fs.unlinkSync('public/images/brands/' + path);
    const getaBrand = await Brand.findById(id);
    const updatedBrand = await Brand.findByIdAndUpdate(id, {...getaBrand, image: null}, {
      new: true,
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});
const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBrand = await Brand.findById(id)
    .populate("updatedBy")
    .populate("createdBy");
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const getallBrand = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let filter = {"$or":Object.entries(JSON.parse(queryStr)).map(entry => {
      return {[entry[0]]: entry[1].match(/^[0-9a-fA-F]{24}$/) ? entry[1] : new RegExp(entry[1], 'i')};
    })}


    let query = Brand.find(filter);

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    const itemCount = await Brand.countDocuments(filter);

    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);

    const getallBrand = await query
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: getallBrand,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
  deleteImage
};
