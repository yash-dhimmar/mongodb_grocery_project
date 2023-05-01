const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;

module.exports = (mongoose) => {
  const OrdersSchema = new Schema({
    order_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref:"User",

    },
    address_id: {
      type: Schema.Types.ObjectId,
      ref: "Address"
    },
    coupan_id: {
      type: Schema.Types.ObjectId,
      ref: "Coupan_management"
    },
    payment_type: {
      type: String,
      required: false,
      default: ""

    },
    date: {
      type: Date,
      required: false,
      default: ""

    },
    grand_total: {
      type: Number,
      required: false,
      default: ""

    },
    sub_total: {
      type: Number,
      required: false,
      default: ""

    },
    delivery_charge: {
      type: String,
      required: false,
      default: ""

    },
    status: {
      type: Boolean, // 0=inactive,1=active
      required: false,
      default: 1,
    },





  }, {
    timestamps: true
  });
  return mongoose.model('Orders', OrdersSchema, 'orders')
};
