const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;

module.exports = (mongoose) => {
  const AddtocartSchema = new Schema({
    cart_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",

    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      type: Number,
      required: false,
      default: ""

    },

  }, {
    timestamps: true
  });
  return mongoose.model('Addcart', AddtocartSchema, 'add_to_cart')
};
