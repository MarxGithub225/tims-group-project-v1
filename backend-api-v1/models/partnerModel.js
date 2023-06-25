const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    personnalInfo : {
      fullName: {
        type: String,
        required: true,
      },
      firstName : {
        type: String,
        required: true
      },
      lastName : {
        type: String,
        required: true
      },
      number : {
        type: String,
        required: true
      },
      IDType: {
        type: String,
        default: "cni",
        enum: ["cni", "passport", "identity-certificate", "resident-card"],
        required: true,
      }, 
      IDNumber: {
        type: String,
        required: true
      },
      IDFile: {
        type: String,
        required: true
      },
    },
    locationInfo : {
      countryName : {
        type: String,
        required: true
      },
      cityName : {
        type: String,
        required: true
      },
      countryEmoji : {
        type: String,
        required: true
      },
      postalCode : {
        type: String,
        required: true
      },
    },
    companyInfo : {
      companyName : {
        type: String,
        required: true
      },
      commercialRegister : {
        type: String,
        required: true
      },
      taxpayerAccountNumber : {
        type: String,
        required: true
      }
    },
    bankInfo : {
      rib : {
        type: String,
        required: true
      },
      bankName : {
        type: String,
        required: true
      },
      bankCode : {
        type: String,
        required: true
      },
      iban : {
        type: String,
        required: true
      },
      ownerFullName : {
        type: String,
        required: true
      },
      ribFile : {
        type: String,
        required: true
      }
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActivated: {
      type: Boolean,
      default: false,
    }
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
module.exports = mongoose.model("Partner", userSchema);
