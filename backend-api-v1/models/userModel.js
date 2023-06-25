const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    numbers: {
      type: [String],
      required: true
    },
    gender: {
      type: String,
      required: true,
      default: "man",
      enum: ["man", "woman"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "super-admin", "admin", "commercial", "manager", "delivery-man"],
      required: true,
    }, 
    password: {
      type: String,
      required: false,
      default: null
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    addresses: {
      type: Array,
      default: [],
    },
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    blogList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    viewedList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};

//Export the model
module.exports = mongoose.model("User", userSchema);
