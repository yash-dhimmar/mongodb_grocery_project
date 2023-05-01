const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
  const SectioncategorySchema = new Schema({
    section_category_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()

    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',

    },
    offer:{
      type:Number,
      default:''
    },

    section_id: {
      type: Schema.Types.ObjectId,
      ref: 'Section',

    },
  
  }, {
    timestamps: true
  });
  return mongoose.model('Section_Category', SectioncategorySchema, 'section_category')
};
