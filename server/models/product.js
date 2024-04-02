const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be positive'],
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity of product must be positive'],
    },
    description: {
      type: String,
      default: 'This product has no description',
    },
    manufacturer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Manufacturer',
    },
    productImages: [],
  },
  {
    timestamps: true,
  }
);

const Product = model('Product', productSchema);

module.exports = Product;
