const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var prodtstockSchema = new mongoose.Schema(
  {
    variableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PVariable"
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner"
    },
    agenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency"
    },
    arrivalDate: {
      type: Date,
    },
    sellingPrice: {
        type: Number,
        default: 0,
        required: true
    },
    purchasePrice: {
      type: Number,
      default: 0,
      required: true
    },
    promoPrice: {
        type: Number,
        default: 0
    },
    isPromoted: {
      type: Boolean,
      default: false
    },
    isBought: {
      type: Boolean,
      default: false
    },
    buyingPending: {
      type: Boolean,
      default: false
    },
    trasnferPending: {
      type: Boolean,
      default: false
    },
    promoStartAt: {
      type: Date,
    },
    promoEndAt: {
      type: Date,
    },
    discountThreshold: {
      type: Number,
      default: 0
    },
    warrantyPeriod: {
      type: Number,
      default: 0
    },
    serialNumber : {
      type: String
    },
    barCode : {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    historicals: [
      {
        action: {
          type: String
        },
        from: {
          type: String
        },
        to: {
          type: String
        },
        date : {
          type: Date
        }
      }
    ]
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("PStock", prodtstockSchema);
