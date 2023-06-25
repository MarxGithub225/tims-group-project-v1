const User = require("../models/userModel");
const Product = require("../models/productModel");;
const Order = require("../models/orderModel");
const uniqid = require("uniqid");

const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);

    let newOrder = await new Order({
      ...req.body,
      orderBy: user._id
    }).save();
    await Promise.all(
      req.body?.products.map(async (pdt) => {
        await Promise.all(
          [
            pdt?.items.map(async (itemP) => {
              await Promise.all(
                itemP?.items.map(async (item) => {
                  let updateProduct = await Product.updateOne(
                    {_id: itemP?.productId, "colors._id": item?.colorId},
                    {
                      $inc: { purchaseCount: 1 },
                    },
                    {
                      new: true,
                    }
                  )
                })
              )
              let updateProduct = await Product.findByIdAndUpdate(
                itemP?.productId,
                {
                  $inc: { purchaseCount: 1 },
                },
                {
                  new: true,
                }
              )
            }),
            
          ]
          )
      })
    )
    res.json(newOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Order.find({ orderBy: id, ...JSON.parse(queryStr) });

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
    const itemCount = await Order.countDocuments();
    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);

    const userorders = await query
      .populate("orderBy")
      .exec();
      res.json({
        data: userorders,
        pageCount,
        currentPage: page,
        itemCount
      });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
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


    let query = Order.find(filter);

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
    const itemCount = await Order.countDocuments(filter);
    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);
    const alluserorders = await query
      .populate("orderBy")
      .exec();
      res.json({
        data: userorders,
        pageCount,
        currentPage: page,
        itemCount
      });
  } catch (error) {
    throw new Error(error);
  }
});
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findById(id)
      .populate("orderBy")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, step } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      { step,
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
};
