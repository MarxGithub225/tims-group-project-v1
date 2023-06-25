const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String,
      maxLength: 255
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isPartner: {
      type: Boolean,
      default: false,
    },
    createdBy: {
          type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    clicks: {
        type: Number,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Brand", brandSchema);
