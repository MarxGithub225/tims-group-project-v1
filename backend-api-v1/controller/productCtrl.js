const Product = require("../models/productModel");
const User = require("../models/userModel");
const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");
const fs = require("fs");
const createProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const data = {
      ...req.body,
      partnerId: req.user._id,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    }
    const newProduct = await Product.create(data);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  validateMongoDbId(_id);
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const data = {
      ...req.body,
      updatedBy: req.user._id,
    }

    const updateProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductViews = asyncHandler(async (req, res) => {
  const { prodId } = req.params;
  validateMongoDbId(prodId);
  try {
    let userDataReturn = null;
    if(req?.user?._id) {
      const { _id } = req?.user;
      validateMongoDbId(_id);

      let user = await User.findById(_id);
      const alreadyadded = user.viewedList.find((id) => id.toString() === prodId);
      if (!alreadyadded) {
        let userData = await User.findByIdAndUpdate(
          _id,
          {
            $push: { viewedList: prodId },
          },
          {
            new: true,
          }
        )
        .populate("viewedList")
        .select('-password');

        userDataReturn = userData
      } 
    }

    let updateProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    )
    res.json(userDataReturn ? userDataReturn.viewedList: 'ok');
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  validateMongoDbId(id);
  try {
    const getaProduct = await Product.findById(id);
    if(getaProduct.images.length) {
      await Promise.all(
       getaProduct.images.map((file) => {
         fs.unlinkSync('public/images/products/' + file);
       })
      )
    }
    const deleteProduct = await Product.findOneAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImage = asyncHandler(async (req, res) => {
  const { id, path } = req.params;
  try {
    fs.unlinkSync('public/images/products/' + path);
    const getaProduct = await Product.findById(id);
    const index = getaProduct.images.indexOf(path)
    const list = [...getaProduct.images];
    list.splice(index, 1);
    const updatedProduct = await Product.findByIdAndUpdate(id, {...getaProduct, images: list}, {
      new: true,
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id)
    .populate("refuseId")
    .populate("partnerId")
    .populate("brandId")
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("updatedBy")
    .populate("createdBy");

    await Promise.all(
      findProduct.ratings.map(async (r) => {
        r.userData = await User.findById(r.postedby)
      })
    )
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const {allProduct} = req.query
    let filter = {}

    if(!allProduct) {
      filter = {"$or": [{isNew: true}, {isUpdated: true}]}
    }else {
      if(req.query.search) {
        filter = {"$and": [{title: new RegExp(req.query.search, 'i')}, {approved: true}, {isNew: false}, {isUpdated: false}]}
      }else filter = {"$and": [{approved: true}, {isNew: false}, {isUpdated: false}]}
    }
    
    let query = Product.find(filter);

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
    const itemCount = await Product.countDocuments(filter);
    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);

    
    const product = await query
    .populate("refuseId")
    .populate("partnerId")
    .populate("brandId")
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: product,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllPartnerProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    let filter ={};

    if(req.query.search) {
      filter = { "$and" : [{title: new RegExp(req.query.search, 'i')}, {partnerId: _id}, {isArchived: req.query.archived === 'archived' ? true : false}]}
    }else filter = filter = { "$and" : [{partnerId: _id}, {isArchived: req.query.archived === 'archived' ? true : false}]}
    let query = Product.find(filter);

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-cancelled -createdAt");
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
    const itemCount = await Product.countDocuments(filter);
    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);

    
    const product = await query
    .populate("refuseId")
    .populate("partnerId")
    .populate("brandId")
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: product,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBestSeller = asyncHandler(async (req, res) => {
  try {
    let filter = {"$and": [{approved: true}, {isBlocked: false}]}
    let query = Product.find(filter)
    .sort("-purchaseCount -viewsCount")
    .select("-__v")
    .skip(0).limit(20);
    
    const product = await query
    .populate("partnerId")
    .populate("brandId")
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({ data: product });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBestSellerByCategory = asyncHandler(async (req, res) => {
  const {categoryId} = req.query
  try {

    let filter = {};
    let rateFilter = req.query.rating? {totalrating: {$gte: req.query.rating}}: {isNew: false};
    let priceFilter = req.query.min && req.query.max? {cost: {$gte: req.query.min, $lte: req.query.max}}: {isNew: false};

    filter = { "$and" : [{categoryId: categoryId}, {approved: true}, {isBlocked: false}, rateFilter, priceFilter]}
    let query = Product.find(filter)
    .sort("-purchaseCount -viewsCount")
    .select("-__v")
    .skip(0).limit(20);
    
    const product = await query
    .populate("partnerId")
    .populate("brandId")
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({ data: product });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBestSellerBySubCategory = asyncHandler(async (req, res) => {
  const {categoryId} = req.query
  try {

    let filter = {};
    let rateFilter = req.query.rating? {totalrating: {$gte: req.query.rating}}: {isNew: false};
    let priceFilter = req.query.min && req.query.max? {cost: {$gte: req.query.min, $lte: req.query.max}}: {isNew: false};

    filter = { "$and" : [{subcategoryId: categoryId}, {approved: true}, {isBlocked: false}, rateFilter, priceFilter]}
    let query = Product.find(filter)
    .sort("-purchaseCount -viewsCount")
    .select("-__v")
    .skip(0).limit(20);
    
    const product = await query
    .populate("refuseId")
    .populate("partnerId")
    .populate("brandId")
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({ data: product });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProductsGroupByCategory = asyncHandler(async (req, res) => {

  try {
    // Filtering
    let query = await Product.aggregate([
      { 
        $sort: { "-createdAt": -1 } 
      },
      { $match:{ approved: true, isBlocked: false}},
      {$group : {_id: "$categoryId", count:{$sum:1}, categoryId: {$addToSet: "$categoryId"}, data: { $push: '$$ROOT' }}},
      
    ])
   
   const product = await Product.populate(query, {path: "categoryId"});
   res.json({ data: product });
 } catch (error) {
   throw new Error(error);
 }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishList.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList: prodId },
        },
        {
          new: true,
        }
        )
        .populate("wishList")
        .select('-password');
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishList: prodId },
        },
        {
          new: true,
        }
      )
      .populate("wishList")
      .select('-password');
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment, "ratings.$.postedAt": new Date() },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
              postedAt: new Date()
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );

    await Promise.all(
      finalproduct.ratings.map(async (r) => {
        r.userData = await User.findById(r.postedby)
      })
    )
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProductByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  try {
    // Filtering
    
    let filter = {"$and": [{approved: true}, {isBlocked: false}, {categoryId: categoryId}]}


    let query = Product.find(filter);

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
    const itemCount = await Product.countDocuments(filter);
    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);

    
    const product = await query
    .populate("refuseId")
    .populate("partnerId")
    .populate("brandId")
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: product,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});

const searchProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    let searchBrand = []
    if(req.query.searchText) {
      searchBrand = await Brand.find({name: {$regex: req.query.searchText}});
    }
    

    let filter = {};
    let rateFilter = req.query.rating? {totalrating: {$gte: req.query.rating}}: {isNew: false};
    let priceFilter = req.query.min && req.query.max? {cost: {$gte: req.query.min, $lte: req.query.max}}: {isNew: false};
    if(req.query.searchText) {

      if(req.query.categoryId) {
        filter = { "$and" : [{"$or":[{brandId: searchBrand.length ? searchBrand[0]?._id : null},{title: new RegExp(req.query.searchText, 'i')},{smallDescription: new RegExp(req.query.searchText, 'i')},{description: new RegExp(req.query.searchText, 'i')},{cost: typeof req.query.searchText === "number" ? req.query.searchText : -1},{promoCost: typeof req.query.searchText === "number" ? req.query.searchText : -1}]}, {categoryId: req.query.categoryId}, {approved: true}, {isBlocked: false}, rateFilter, priceFilter]}
      }else {
        if(req.query.subcategoryId)
        filter = { "$and" : [{"$or":[{brandId: searchBrand.length ? searchBrand[0]?._id : null},{title: new RegExp(req.query.searchText, 'i')},{smallDescription: new RegExp(req.query.searchText, 'i')},{description: new RegExp(req.query.searchText, 'i')},{cost: typeof req.query.searchText === "number" ? req.query.searchText : -1},{promoCost: typeof req.query.searchText === "number" ? req.query.searchText : -1}]}, {subcategoryId: req.query.subcategoryId}, {approved: true}, {isBlocked: false}, rateFilter, priceFilter]}
        else filter = { "$and" : [{"$or":[{brandId: searchBrand.length ? searchBrand[0]?._id : null},{title: new RegExp(req.query.searchText, 'i')},{smallDescription: new RegExp(req.query.searchText, 'i')},{description: new RegExp(req.query.searchText, 'i')},{cost: typeof req.query.searchText === "number" ? req.query.searchText : -1},{promoCost: typeof req.query.searchText === "number" ? req.query.searchText : -1}]}, {approved: true}, {isBlocked: false}, rateFilter, priceFilter]}
      }
      
    }else {
      if(req.query.categoryId) {
        filter = { "$and" : [{categoryId: req.query.categoryId}, {approved: true}, {isBlocked: false}, rateFilter, priceFilter]}
      }else {
        if(req.query.subcategoryId)
        filter = { "$and" : [{subcategoryId: req.query.subcategoryId}, {approved: true}, {isBlocked: false}, rateFilter, priceFilter]}
        else
        filter = { "$and" : [{approved: true}, {isBlocked: false}, rateFilter, priceFilter]}
      }
    }

    let query = Product.find(filter);

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
    const itemCount = await Product.countDocuments(filter);
    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);

    
    const product = await query
    .populate("refuseId")
    .populate("partnerId")
    .populate("brandId")
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: product,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  getAllPartnerProduct,
  getAllBestSeller,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  deleteImage,
  getAllProductsGroupByCategory,
  getAllProductByCategory, 
  searchProduct,
  getAllBestSellerByCategory,
  getAllBestSellerBySubCategory,
  updateProductViews
};