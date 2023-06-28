const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var prodcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    icon: {
      type: String,
      maxLength: 255
    },
    image: {
      type: String,
      maxLength: 255
    },
    isBlocked: {
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
    },
    productCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PCategory"
    },
    instructions: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("PSubcategory", prodcategorySchema);
