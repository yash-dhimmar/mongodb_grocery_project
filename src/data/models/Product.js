const { Double, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { SMALLINT, DOUBLE } = require('sequelize');
const { Schema } = mongoose;

function image(image){
  return 'http://localhost:4444/uploads/' + image
}

module.exports = (mongoose) => {
  const ProductSchema = new Schema({
    product_id: {
      type: Schema.Types.ObjectId,
      default:new ObjectId()
    

    },
    
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',

    },
    subcategory_id: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',

    },
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',

      //unique:true
    },
    productname: {
      type: String,
      required: false,
      default: "",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    short_description: {
      type: String,
      required: false,
      default: "",
    },
    variation: {
      type: String,
      required: false,
      default: "",
    },
    price: {
      type: Number,
      required: false,
      default: "",
    },
    discount_price: {
      type: Number,
      required: false,
      default: "",
    },
    discount: {
      type:Number,
      required: false,
      default: "",
    },
    image: {
      type: String,
      required: false,
      default: "",
      get:image
    },
    flag: {
      type: Boolean,
      required: false,
      default: "true",
    },
     stock: {
      type: Boolean, // 0=inactive,1=active
      required: false,
      default:1,
    },

  }, {
    timestamps: true,
  })

  ProductSchema.set('toObject',{getters:true})
  ProductSchema.set('toJSON',{getters:true})

  return mongoose.model('Product', ProductSchema, 'product')
}