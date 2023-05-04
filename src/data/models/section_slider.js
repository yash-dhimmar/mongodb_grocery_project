const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

function image(image){
  return 'http://localhost:4444/uploads/' + image
}

module.exports = (mongoose) => {
  const SectionSchema = new Schema({
    slider_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()
    },
    image: {
      type: String,
      get: image,
      required: false,
      default: "",
      
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

  SectionSchema.set('toObject', { getters: true })
  SectionSchema.set('toJSON', { getters: true })

  return mongoose.model('Section_Slider', SectionSchema, 'section_slider')
};
