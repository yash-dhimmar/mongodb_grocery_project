const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
  const SectionsSchema = new Schema({
    slider_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()

    },
   image: {
      type: String,
      required: false,
      default: ""

    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',

    },
    section_id: {
      type: Schema.Types.ObjectId,
      ref: 'Section',

    },
  
  }, {
    timestamps: true
  });
  return mongoose.model('Section_Slider', SectionsSchema, 'section_slider')
};
