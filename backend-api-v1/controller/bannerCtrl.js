const Banner = require("../models/bannerModel");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBanner = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const data = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    }
    const newBanner = await Banner.create(data);
    res.json(newBanner);
  } catch (error) {
    throw new Error(error);
  }
});
const updateBanner = asyncHandler(async (req, res) => {
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
    const updatedBanner = await Banner.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updatedBanner);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBanner = await Banner.findById(id);
    if(getaBanner.image) {fs.unlinkSync('public/images/banners/' + getaBanner.image);}
    const deletedBanner = await Banner.findByIdAndDelete(id);
    res.json(deletedBanner);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImage = asyncHandler(async (req, res) => {
  const { id, path } = req.params;
  try {

    fs.unlinkSync('public/images/banners/' + path);
    const getaBanner = await Banner.findById(id);
    const updatedBanner = await Banner.findByIdAndUpdate(id, {...getaBanner, image: null}, {
      new: true,
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});
const getBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBanner = await Banner.findById(id)
    .populate("updatedBy")
    .populate("createdBy");
    res.json(getaBanner);
  } catch (error) {
    throw new Error(error);
  }
});
const getallBanner = asyncHandler(async (req, res) => {
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


    let query = Banner.find(filter);
 
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
     const itemCount = await Banner.countDocuments(filter);
 
     if (req.query.page && itemCount > 0) {
       if (skip >= itemCount) throw new Error("This Page does not exists");
     }
     const pageCount = Math.ceil(itemCount / limit);

    const getallBanner = await query
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: getallBanner,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getallPublishedBanner = asyncHandler(async (req, res) => {
  try {

    let query = Banner.find({isBlocked: false, type: req.query.type});
 
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
 
    

    const getallBanner = await query
    .populate("updatedBy")
    .populate("createdBy");

    const allData = []
    await Promise.all(
      getallBanner.map((bann) => {
        if(new Date(bann.startAt).getTime() <= new Date().getTime() && new Date().getTime() <= new Date(bann.endAt).getTime()) {
          allData.push(bann)
        }
      })
    )

    if (req.query.page && allData.length > 0) {
      if (skip >= allData.length) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(allData.length / limit);
    
    res.json({
      data: allData,
      pageCount,
      currentPage: page,
      itemCount: allData.length
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBanner,
  updateBanner,
  deleteBanner,
  getBanner,
  getallBanner,
  getallPublishedBanner,
  deleteImage
};
