const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;

module.exports = (mongoose) => {
  const SettingSchema = new Schema({
    setting_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
   
    free_delivery_upto: {
      type: Number,
      required: false,
      default: ""
    },
    delivery_charge: {
      type: String,
      required: false,
      default: ""
    },
    tax: {
      type: Number,
      required: false,
      default: ""
    },

  }, {
    timestamps: true
  });
  return mongoose.model('Setting', SettingSchema, 'setting')
};
