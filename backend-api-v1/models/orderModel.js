const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    cost: {
        type: Number,
        required: true
    },
    fees: {
      type: Number,
      required: true
    },
    voucher: {
      type: Boolean,
      default: false
    },
    voucherType: {
      type: String,
      default: ''
    },
    voucherPercent: {
      type: Number,
    },
    voucherBonus: {
      type: Number,
    },
    voucherNumberBought: {
      type: Number,
    },
    paidmethod: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: ''
    },
    shippingAddress: {
      type: Object,
      default: ''
    },
    orderStatus: {
      type: String,
      default: "pending",
      enum: [
        "pending",
        "accepting",
        "processing",
        "shipped",
        "cancelled",
        "delivered",
      ],
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tracking: [{
      type: Object
    }]
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
