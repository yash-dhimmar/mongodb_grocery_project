const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
  const CategorySchema = new Schema({
    category_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()

    },
    image: {
      type: String,
      required: false,
      default: ""

    },
    category_name: {
      type: String,
      required: false,
      default: ""

    },
    status: {
      type: Number, // 0=inactive,1=active
      required: false,
      default: ""
    },

  }, {
    timestamps: true
  });
  return mongoose.model('Category', CategorySchema, 'category')
};
