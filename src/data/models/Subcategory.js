
const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

function image(image){
  return 'http://localhost:4444/uploads/' + image
}


module.exports = (mongoose) => {
  const SubcategorySchema = new Schema({
    subcategory_id: {
      type: Schema.Types.ObjectId,
     default: new ObjectId()
    },
   
    image: {
      type: String,
      required: false,
      get:image,
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
      default: "1"
    },

  }, {
    timestamps: true
  });

  SubcategorySchema.set('toObject',{getters:true})
  SubcategorySchema.set('toJSON',{getters:true})

  return mongoose.model('Subcategory', SubcategorySchema, 'subcategory')
};
