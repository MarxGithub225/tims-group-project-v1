const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");

// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  /**
   * TODO:Get the email from req.body
   */
  const email = req.body.email;
  /**
   * TODO:With the help of email find the user exists or not
   */
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    /**
     * TODO:if user not found user create a new user
     */
    const data = {...req.body, fullName: `${req.body.lastName} ${req.body.firstName}`}
    if(req.user) {
      const { _id } = req.user;
      validateMongoDbId(_id);
      data= {...data,
        createdBy: req.user._id,
        updatedBy: req.user._id,
      }
      
    }
    
    const newUser = await User.create(data);
    if(newUser.password) delete newUser.password;
    res.json(newUser);
  } else {
    /**
     * TODO:if user found then thow an error: User already exists
     */
    throw new Error("User Already Exists");
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email })
  .populate("wishList")
  .populate("blogList")
  .populate("viewedList")
  .populate("createdBy")
  .populate("updatedBy")

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      fullName: findUser?.fullName,
      role: findUser?.role,
      email: findUser?.email,
      numbers: findUser?.numbers,
      addresses: findUser?.addresses,
      token: generateToken(findUser?._id),
      wishList: findUser?.wishList,
      blogList: findUser?.blogList,
      viewedList: findUser?.viewedList,
      refreshToken: updateuser?.refreshToken
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    if (
      findAdmin.role !== "super-admin" &&
      findAdmin.role !== "admin" &&
      findAdmin.role !== "commercial" &&
      findAdmin.role !== "manager" &&
      findAdmin.role !== "delivery-man"
    ) 
    throw new Error("Not Authorised");
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstName: findAdmin?.firstName,
      lastName: findAdmin?.lastName,
      fullName: findAdmin?.fullName,
      role: findAdmin?.role,
      email: findAdmin?.email,
      numbers: findAdmin?.numbers,
      token: generateToken(findAdmin?._id),
      refreshToken: updateuser?.refreshToken
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user._id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken, refreshToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  console.log('cook', req.cookies)
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {...req?.body, fullName: `${req.body.lastName} ${req.body.firstName}`},
      {
        new: true,
      }
    )
    .populate("wishList")
    .populate("blogList")
    .populate("viewedList")
    .populate("createdBy")
    .populate("updatedBy");

    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});


// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let filter = queryStr ? {"$or":Object.entries(JSON.parse(queryStr)).map(entry => {
      return {[entry[0]]: entry[1].match(/^[0-9a-fA-F]{24}$/) ? entry[1] : new RegExp(entry[1], 'i')};
    })}: {}


    let query = User.find(filter);

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
    const itemCount = await User.countDocuments(filter);

    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);

    const getUsers = await query
    .populate("wishList")
    .populate("blogList")
    .populate("viewedList")
    .populate("createdBy")
    .populate("updatedBy");

    res.json({
      data: getUsers,
      pageCount,
      currentPage: page,
      itemCount
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id)
    .populate("wishList")
    .populate("blogList")
    .populate("viewedList")
    .populate("createdBy")
    .populate("updatedBy");
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getMe = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const getaUser = await User.findById(_id)
    .populate("wishList")
    .populate("blogList")
    .populate("viewedList")
    .populate("createdBy")
    .populate("updatedBy");
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getMe
};
