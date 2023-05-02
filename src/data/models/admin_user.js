const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;

module.exports = (mongoose) => {
  const AdminSchema = new Schema({
    admin_user_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    name: {
      type: String,
      required: false,
      default: ""
    },
    mobilenumber: {
      type: Number,
      required: false,
      default: ""
    },
    email:{
      type:String,
      lowercase: true,
      unique:true,
      required:true,
      
    },
    password: {
      type: String,
      required: false,
      default: ""
    },

  }, {
    timestamps: true
  });
  return mongoose.model('Admin', AdminSchema, 'admin')
};
