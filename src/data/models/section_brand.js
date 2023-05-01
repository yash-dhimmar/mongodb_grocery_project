const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
  const SectionbrandsSchema = new Schema({
    section_brand_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()

    },
    brand_id: {
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
  return mongoose.model('Section_Brand', SectionbrandsSchema, 'section_brand')
};
