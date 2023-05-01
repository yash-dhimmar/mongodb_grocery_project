const { Double, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { SMALLINT, DOUBLE } = require('sequelize');
const { Schema } = mongoose;

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
      required: true,
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
    },
    flag: {
      type: Boolean,
      required: false,
      default: "",
    },
     stock: {
      type: Boolean, // 0=inactive,1=active
      required: false,
      default:0,
    },

  }, {
    timestamps: true,
  })

  return mongoose.model('Product', ProductSchema, 'product')
}