const { Double, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { SMALLINT, DOUBLE } = require('sequelize');
const { Schema } = mongoose;



module.exports = (mongoose) => {
  const PaymentSchema = new Schema({
    payment_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: "",
    },
    user_stripe_id: {
      type: String,
      required: false,
      default: "",

    },
    card_id: {
      type: String,
      required: false,
      default: "",

    },
    card_Name: {
      type: String,
      required: false,
      default: "",
    },
    card_ExpYear: {
      type: String,
      required: false,
      default: "",
    },
    card_ExpMonth: {
      type: String,
      required: false,
      default: "",
    },
    card_Number: {
      type: String,
      required: false,
      default: "",
    },
    card_CVC: {
      type: Number,
      required: false,
      default: "",
    },
    source: {
      type: String,
      required: false,
      default: "",
    },
    amount: {
      type: Number,
      required: false,
      default: "",
    },

  }, {
    timestamps: true,
  })



  return mongoose.model('Payment', PaymentSchema, 'payment')
}