const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
  const SectionproductSchema = new Schema({
    section_product_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()

    },
    product_id: {
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
  return mongoose.model('Section_Product', SectionproductSchema, 'section_product')
};
