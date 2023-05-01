const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;

module.exports = (mongoose) => {
  const OrderitemSchema = new Schema({
    item_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Orders",

    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    },
    price: {
      type: Number,
      required: false,
      default: ""

    },
    quantity: {
      type: Number,
      required: false,
      default: ""

    },
    discount_price: {
      type: Number,
      required: false,
      default: ""

    },

  }, {
    timestamps: true
  });
  return mongoose.model('Order_item', OrderitemSchema, 'order_item')
};
