const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    backgroundImage: {
      type: String,
      maxLength: 255
    },
    videoUrl: {
      type: String,
      maxLength: 255
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
        type: String,
        required: true
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    comments: [
      {
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        postedAt: Date,
        userData: {}
      },
    ],
    likes: [
      {
        likedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        likedAt: Date,
        userData: {}
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVideo: {
      type: Boolean,
      default: false,
    },
    videoDuration: {
        type: Number,
        default: 0
    },
    readDuration: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
