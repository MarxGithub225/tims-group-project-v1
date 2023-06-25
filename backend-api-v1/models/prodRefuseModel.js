const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var refuseSchema = new mongoose.Schema(
  {
    reason: {
      type: [String],
      enum: ["wrong-content", "pornographic-images", "poor-quality-images", "misspellings"],
      required: true,
    },
    notes: {
      type: String,
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
module.exports = mongoose.model("PRefuse", refuseSchema);
