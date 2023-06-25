const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var bannerSchema = new mongoose.Schema(
  {
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "main-banner",
        enum: ["main-banner", "half-banner"],
    },
    image: {
        type: String,
        maxLength: 255
    },
    startAt: {
        type: Date,
        default: new Date()
    },
    endAt: {
        type: Date,
        default: new Date()
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
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Banner", bannerSchema);
