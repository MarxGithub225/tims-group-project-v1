const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PCategory"
    },
    refuseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PRefuse"
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner"
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PSubcategory"
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand"
    },
    model: {
      type: String,
    },
    weight: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    cost: {
      type: Number,
      default: 0
    },
    promoCost: {
      type: Number,
      default: 0
    },
    boughtNumber: {
      type: Number,
      default: 0
    },
    bonusNumber: {
      type: Number,
      default: 0
    },
    promostartAt: {
      type: Date
    },
    promoType: {
      type: String,
      default: '',
      enum: ['', 'sold', 'discount', 'bonus']
    },
    promoendAt: {
      type: Date
    },
    isPromoted: {
      type: Boolean,
      default: false
    },
    colors: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId
        },
        colorName: {
          type: String
        },
        isActivated: {
          type: Boolean,
          default: true
        },
        primaryImage: {
          type: String
        },
        purchaseCount: {
          type: Number,
          default: 0
        },
        images : [],
        variables: [
          {
            sku: {
              type: String
            },
            label: {
              type: String
            },
            quantity: {
              type: Number,
              default: 0
            },
            isActivated: {
              type: Boolean,
              default: true
            }
            
          }
        ],
      }
    ],
    smallDescription: {
      type: String,
      maxLength: 1000
    },
    description: {
        type: String,
        required: true
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    purchaseCount: {
        type: Number,
        default: 0
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        postedAt: Date,
        userData: {}
      },
    ],
    totalrating: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    isUpdated: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
    isArchived: {
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
    }
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
