import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
});

const extrasSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    sizes: {
      type: [sizeSchema],
      // validate: {
      //   validator: function (sizes: any) {
      //     return sizes.length > 0;
      //   },
      //   message: "A product must have at least one size option.",
      // },
    },
    extras: {
      type: [extrasSchema],
      // validate: {
      //   validator: function (extras: any) {
      //     return extras.length > 0;
      //   },
      //   message: "A product must have at least one extra option.",
      // },
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
