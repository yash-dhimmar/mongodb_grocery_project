const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

function image(image){
  return 'http://localhost:4444/uploads/' + image
}
module.exports = (mongoose) => {
  const CategorySchema = new Schema({
    category_id: {
      type: Schema.Types.ObjectId,
      default: new ObjectId()

    },
    image: {
      type: String,
      get:image,
      default: "",
      required: false,

    },
    category_name: {
      type: String,
      required: false,
      default: ""

    },
    status: {
      type: Number, // 0=inactive,1=active
      required: false,
      default: "1"
    },

  }, {
    timestamps: true
  });

  CategorySchema.set('toObject',{getters:true})
  CategorySchema.set('toJSON',{getters:true})

  return mongoose.model('Category', CategorySchema, 'category')

  
};
