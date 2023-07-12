const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;

module.exports = (mongoose) => {
  const CoupanSchema = new Schema({
    coupan_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    coupanname: {
      type: String,
      required: false,
      default: ""
    },
    coupancode: {
      type: String,
      required: false,
      default: ""
    },
    min_price: {
      type: Number,
      required: false,
      default: ""
    },
    discount_price: {
      type: Number,
      required: false,
      default: ""
    },
    start_date: {
      type:Date,
      required: false,
      default: ""
    },
    end_date: {
      type: Date,
      required: false,
      default: ""
    },


  }, {
    timestamps: true
  });
  return mongoose.model('Coupan_management', CoupanSchema, 'coupan_management')
};
