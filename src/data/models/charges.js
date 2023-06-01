const { date } = require('joi');
const { Double, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { SMALLINT, DOUBLE } = require('sequelize');
const { Schema } = mongoose;



module.exports = (mongoose) => {
  const ChargeSchema = new Schema({
    charges_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
     
    },
    charge_id: {
      type: String,
      required: false,
      default: "",

    },
    amount: {
      type: Number,
      required: false,
      default: "",
    },
    date: {
      type: Date,
      required: false,
      default: "",
    },
    currency: {
      type: String,
      required: false,
      default: "",
    },
   

  }, {
    timestamps: true,
  })



  return mongoose.model('Charges', ChargeSchema, 'charges')
}