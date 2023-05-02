const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;

module.exports = (mongoose) => {
  const ReviewSchema = new Schema({
    review_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",

    },
    review_star: {
      type: Number,
      required: false,
      default: ""
    },
  }, {
    timestamps: true
  });
  return mongoose.model('Review', ReviewSchema, 'review')
};
