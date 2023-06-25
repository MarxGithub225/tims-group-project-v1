const User = require("../models/userModel");
const Partner = require("../models/partnerModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
        let user = null ;

        const findUser =  await User.findById(decoded?.id);
        const findPartner =  await Partner.findById(decoded?.id);
        if(findUser) {
          user = findUser;
        }else if(findPartner) user = findPartner;

        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please Login again");
    }
  } else {
    throw new Error(" There is no token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "super-admin" && adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});

const isSuperAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "super-admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});

const isManager = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "super-admin" && adminUser.role !== "admin" && adminUser.role !== "manager") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});


const isPartner = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  const adminPartner = await Partner.findOne({ email });

  if(adminUser) {
    if (adminUser.role !== "super-admin" && adminUser.role !== "admin") {
      throw new Error("You are not an admin");
    } else {
      next();
    }
  }else if (!adminPartner) {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});
module.exports = { authMiddleware, isSuperAdmin, isAdmin, isManager, isPartner};
