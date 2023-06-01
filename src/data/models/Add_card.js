const { Double, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { SMALLINT, DOUBLE } = require('sequelize');
const { Schema } = mongoose;



module.exports = (mongoose) => {
  const AddcardSchema = new Schema({
    add_card_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
     
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
      type: Number,
      required: false,
      default: "",
    },
    card_ExpMonth: {
      type: Number,
      required: false,
      default: "",
    },
    card_Number: {
      type: Number,
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

  }, {
    timestamps: true,
  })



  return mongoose.model('Add_card', AddcardSchema, 'add_card')
}