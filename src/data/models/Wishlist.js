const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;

module.exports = (mongoose) => {
  const WishSchema = new Schema({
    wish_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",

    },
    product_id: {
      type:Schema.Types.ObjectId,
      ref: "Product"
    },

  }, {
    timestamps: true
  });
  return mongoose.model('Wishlist', WishSchema, 'wishlist')
};
