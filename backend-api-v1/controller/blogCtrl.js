const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");
const fs = require("fs");
const createBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const data = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    }
    const newBlog = await Blog.create(data);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
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

    const updateBlog = await Blog.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const id = req.params;
  validateMongoDbId(id);
  try {
    const getaBlog = await Blog.findById(id);
    if(getaBlog.backgroundImage) {fs.unlinkSync('public/images/blogs/' + getaBlog.backgroundImage);}
    const deleteBlog = await Blog.findOneAndDelete(id);
    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImage = asyncHandler(async (req, res) => {
  const { id, path } = req.params;
  try {

    fs.unlinkSync('public/images/blogs/' + path);
    const getaBlog = await Blog.findById(id);
    const updatedBlog = await Blog.findByIdAndUpdate(id, {...getaBlog, backgroundImage: null}, {
      new: true,
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

const getaBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findBlog = await Blog.findById(id)
    .populate("updatedBy")
    .populate("createdBy");

    await Promise.all(
      findBlog.likes.map(async (r) => {
        r.userData = await User.findById(r.postedby)
      })
    )
    await Promise.all(
      findBlog.comments.map(async (r) => {
        r.userData = await User.findById(r.postedby)
      })
    )
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlog = asyncHandler(async (req, res) => {
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

    let query = Blog.find(filter);

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
    const itemCount = await Blog.countDocuments(filter);
    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);

    
    const blog = await query
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: blog,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllPublishedBlogs = asyncHandler(async (req, res) => {
  try {

    let filter = {};
    if(req.query.searchText) {
      filter = { "$and" : [{"$or":[{title: new RegExp(req.query.searchText, 'i')},{description: new RegExp(req.query.searchText, 'i')}]}, {isBlocked: false}]}
    }else {
      filter = {isBlocked: false}
    }

    let query = Blog.find(filter);

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
    const itemCount = await Blog.countDocuments(filter);
    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);

    
    const blog = await query
    .populate("updatedBy")
    .populate("createdBy");
    
    res.json({
      data: blog,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});

const likeaBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { blogId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyliked = user.blogList.find((id) => id.toString() === blogId);
    if (alreadyliked) {
        let blog = await Blog.findByIdAndUpdate(
          blogId,
          {
            $pull: { likes: _id },
          },
          {
            new: true,
          }
        )
        let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { blogList: blogId },
        },
        {
          new: true,
        }
        )
        .populate("blogList")
        .select('-password');

        res.json(user);
    } else {

      let blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: _id },
        },
        {
          new: true,
        }
      )

      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { blogList: blogId },
        },
        {
          new: true,
        }
      )
      .populate("blogList")
      .select('-password');
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const commentaBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const {blogId, comment } = req.body;
  try {
    const rateBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: {
          comments: {
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
    await Promise.all(
      rateBlog.comments.map(async (r) => {
        r.userData = await User.findById(r.postedby)
      })
    )
    res.json(rateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlogViews = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  validateMongoDbId(blogId);
  try {
    let updateBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    )
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  getaBlog,
  getAllBlog,
  getAllPublishedBlogs,
  updateBlog,
  deleteBlog,
  commentaBlog,
  likeaBlog,
  deleteImage,
  updateBlogViews
};