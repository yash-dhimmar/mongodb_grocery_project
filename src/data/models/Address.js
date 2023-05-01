const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
  const AddressSchema = new Schema({
    address_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()

    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref:"User"
    },
    type: {
      type: Number,
      required: false,
      default: ""

    },
    home_details: {
      type: String,
      required: false,
      default: ""

    },
    landmark: {
      type: String, 
      required: false,
      default: ""
    },

    recipient_name: {
      type: String, 
      required: false,
      default: ""
    },

  }, {
    timestamps: true
  });
  return mongoose.model('Address', AddressSchema, 'address')
};
