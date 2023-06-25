const Category = require("../models/prodcategoryModel");
const Subcategory = require("../models/prodsubcategoryModel");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const data = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    }
    const newCategory = await Category.create(data);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const createSubcategory = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const data = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    }
    const newSubcategory = await Subcategory.create(data);

    const getaCategory = await Category.findById(newSubcategory?.productCategoryId)

    const list = [...getaCategory.subCategories];
    list.push(newSubcategory._id)
    const updatedCategory = await Category.findByIdAndUpdate(getaCategory?._id, {subCategories: list}, {
      new: true,
    });
    res.json(newSubcategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
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
    const updatedCategory = await Category.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSubcategory = asyncHandler(async (req, res) => {
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
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updatedSubcategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id);
    
    if(getaCategory.image) {fs.unlinkSync('public/images/categories/' + getaCategory.image);}

    if(getaCategory.subCategories.length) {
      Promise.all(
        getaCategory.subCategories.map(async (subcatId) => {
          await Subcategory.findByIdAndDelete(subcatId);
        })
      )
    }
    
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSubcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaSubcategory = await Subcategory.findById(id);
    if(getaSubcategory.image) {fs.unlinkSync('public/images/categories/' + getaSubcategory.image);}
    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
    res.json(deletedSubcategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImage = asyncHandler(async (req, res) => {
  const { id, path } = req.params;
  try {

    fs.unlinkSync('public/images/categories/' + path);
    const getaCategory = await Category.findById(id);
    const updatedCategory = await Category.findByIdAndUpdate(id, {...getaCategory, image: null}, {
      new: true,
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImageSubcategory = asyncHandler(async (req, res) => {
  const { id, path } = req.params;
  try {

    fs.unlinkSync('public/images/categories/' + path);
    const getaSubcategory = await Subcategory.findById(id);
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, {...getaSubcategory, image: null}, {
      new: true,
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id)
    .populate("subCategories")
    .populate("updatedBy")
    .populate("createdBy");
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getSubcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaSubcategory = await Subcategory.findById(id)
    .populate("productCategoryId")
    .populate("updatedBy")
    .populate("createdBy");
    res.json(getaSubcategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getallCategory = asyncHandler(async (req, res) => {
  try {
     // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let filter = {"$and":Object.entries(JSON.parse(queryStr)).map(entry => {
      return {[entry[0]]: entry[1].match(/^[0-9a-fA-F]{24}$/) ? entry[1] : new RegExp(entry[1], 'i')};
    })}


    let query = Category.find(filter);
 
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
     const itemCount = await Category.countDocuments(filter);
 
     if (req.query.page && itemCount > 0) {
       if (skip >= itemCount) throw new Error("This Page does not exists");
     }
     const pageCount = Math.ceil(itemCount / limit);

    const getallCategory = await query
    .populate("subCategories")
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: getallCategory,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getallSubcategory = asyncHandler(async (req, res) => {
  try {
     // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let filter = {"$and":Object.entries(JSON.parse(queryStr)).map(entry => {
      return {[entry[0]]: entry[1].match(/^[0-9a-fA-F]{24}$/) ? entry[1] : new RegExp(entry[1], 'i')};
    })}

    let query = Subcategory.find(filter);
 
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
     const itemCount = await Subcategory.countDocuments(filter);
 
     if (req.query.page && itemCount > 0) {
       if (skip >= itemCount) throw new Error("This Page does not exists");
     }
     const pageCount = Math.ceil(itemCount / limit);

    const getallSubcategory = await query
    .populate("productCategoryId")
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: getallSubcategory,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  createSubcategory,
  updateCategory,
  updateSubcategory,
  deleteCategory,
  deleteSubcategory,
  getCategory,
  getSubcategory,
  getallCategory,
  getallSubcategory,
  deleteImage,
  deleteImageSubcategory
};
