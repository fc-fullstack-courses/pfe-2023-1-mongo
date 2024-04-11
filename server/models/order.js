const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    // products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true}],
    products: [
      {
        name: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: String, required: true },
        picture: { type: String },
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    deliveryAddress: {
      country: { type: String },
      city: { type: String },
      postalService: { type: String },
      postalDepartment: { type: Number },
    },
    comment: { type: String },
  },
  { timestamps: true }
);

const Order = model('Order', orderSchema);

module.exports = Order;
