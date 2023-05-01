
const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
  const SubcategorySchema = new Schema({
    subcategory_id: {
      type: Schema.Types.ObjectId,
     default: new ObjectId()
    },
   
    image: {
      type: String,
      required: false,
      default: ""

    },
    name: {
      type: String,
      required: false,
      default: ""
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    
    },
   status: {
      type: Number, // 0=inactive,1=active
      required: false,
      default: "0"
    },

  }, {
    timestamps: true
  });
  return mongoose.model('Subcategory', SubcategorySchema, 'subcategory')
};
