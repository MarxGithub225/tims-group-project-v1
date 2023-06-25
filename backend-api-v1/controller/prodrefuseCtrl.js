const Refuse = require("../models/prodRefuseModel");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createRefuse = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const data = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    }
    const newRefuse = await Refuse.create(data);
    res.json(newRefuse);
  } catch (error) {
    throw new Error(error);
  }
});
const updateRefuse = asyncHandler(async (req, res) => {
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
    const updatedRefuse = await Refuse.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updatedRefuse);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteRefuse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedRefuse = await Refuse.findByIdAndDelete(id);
    res.json(deletedRefuse);
  } catch (error) {
    throw new Error(error);
  }
});

const getRefuse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaRefuse = await Refuse.findById(id)
    .populate("updatedBy")
    .populate("createdBy");
    res.json(getaRefuse);
  } catch (error) {
    throw new Error(error);
  }
});
const getallRefuse = asyncHandler(async (req, res) => {
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


    let query = Refuse.find(filter);
 
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
     const itemCount = await Refuse.countDocuments(filter);
 
     if (req.query.page && itemCount > 0) {
       if (skip >= itemCount) throw new Error("This Page does not exists");
     }
     const pageCount = Math.ceil(itemCount / limit);

    const getallRefuse = await query
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: getallRefuse,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createRefuse,
  updateRefuse,
  deleteRefuse,
  getRefuse,
  getallRefuse
};
