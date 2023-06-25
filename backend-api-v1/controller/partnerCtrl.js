const Partner = require("../models/partnerModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");


const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");

const createPartner = asyncHandler(async (req, res) => {

   /**
   * TODO:Get the email from req.body
   */
   const email = req.body.email;
   /**
    * TODO:With the help of email find the partner exists or not
    */
   const findPartner = await Partner.findOne({ email: email });
 
   if (!findPartner) {
     /**
      * TODO:if partner not found partner create a new partner
      */
     const data = {...req.body, personnalInfo: {...req.body.personnalInfo, fullName: `${req.body.personnalInfo.lastName} ${req.body.personnalInfo.firstName}`}}
     
     const newPartner = await Partner.create(data);
     res.json(newPartner);
   } else {
     /**
      * TODO:if partner found then thow an error: Partner already exists
      */
     throw new Error("Partner Already Exists");
   }
});

// Login a partner
const loginPartnerCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if partner exists or not
  const findPartner = await Partner.findOne({ email })
  if(req.body.addAccess) 
  {
    const refreshToken = await generateRefreshToken(findPartner?._id);
    const updatepartner = await Partner.findByIdAndUpdate(
      findPartner.id,
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
      _id: findPartner?._id,
      email: findPartner?.email,
      personnalInfo: findPartner?.personnalInfo,
      locationInfo: findPartner?.locationInfo,
      companyInfo: findPartner?.companyInfo,
      isBlocked: findPartner?.isBlocked,
      token: generateToken(findPartner?._id),
      refreshToken: updatepartner?.refreshToken
    });
  }
  else {
    if (findPartner && (await findPartner.isPasswordMatched(password))) {
      if(findPartner.isActivated) {
        const refreshToken = await generateRefreshToken(findPartner?._id);
        const updatepartner = await Partner.findByIdAndUpdate(
          findPartner.id,
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
          _id: findPartner?._id,
          email: findPartner?.email,
          personnalInfo: findPartner?.personnalInfo,
          locationInfo: findPartner?.locationInfo,
          companyInfo: findPartner?.companyInfo,
          isBlocked: findPartner?.isBlocked,
          token: generateToken(findPartner?._id),
          refreshToken: updatepartner?.refreshToken
        });
      }else {
        throw new Error("Account Not Validated Yet");
      }
      
    } else {
      throw new Error("Invalid Credentials");
    }
  }
  
});

const blockPartner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await Partner.findByIdAndUpdate(
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

const validatePartner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const validateusr = await Partner.findByIdAndUpdate(
      id,
      {
        isActivated: true,
      },
      {
        new: true,
      }
    );
    res.json(validateusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockPartner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await Partner.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "Partner UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePartner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  validateMongoDbId(_id);
  validateMongoDbId(id);
  try {
    const data = {
      ...req.body,
      updatedBy: req.user._id,
    }
    const updatedPartner = await Partner.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updatedPartner);
  } catch (error) {
    throw new Error(error);
  }
});
const deletePartner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedPartner = await Partner.findByIdAndDelete(id);
    res.json(deletedPartner);
  } catch (error) {
    throw new Error(error);
  }
});
const getPartner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaPartner = await Partner.findById(id)
    .populate("updatedBy");
    res.json(getaPartner);
  } catch (error) {
    throw new Error(error);
  }
});
const getallPartner = asyncHandler(async (req, res) => {
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


    let query = Partner.find(filter);

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
    const itemCount = await Partner.countDocuments(filter);

    if (req.query.page && itemCount > 0) {
      if (skip >= itemCount) throw new Error("This Page does not exists");
    }
    const pageCount = Math.ceil(itemCount / limit);
    const getallPartner = await query
    .populate("updatedBy");

    res.json({
      data: getallPartner,
      pageCount,
      currentPage: page,
      itemCount
    });

  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await Partner.findById(_id);
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
  const user = await Partner.findOne({ email });
  if (!user) throw new Error("Partner not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey Partner",
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
  const user = await Partner.findOne({
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
  createPartner,
  updatePartner,
  deletePartner,
  getPartner,
  getallPartner,
  loginPartnerCtrl,
  blockPartner,
  validatePartner,
  unblockPartner,
  updatePassword,
  forgotPasswordToken,
  resetPassword
};
