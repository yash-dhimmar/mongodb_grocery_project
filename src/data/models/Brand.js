const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
function image(image){
    return 'http://localhost:4444/uploads/' + image
  }

module.exports = (mongoose) => {
    const BrandSchema = new Schema({
     image: {
            type: String,
            required: false,
            default: "",
            get:image
        },
        name: {
            type: String,
            required: false,
            default: "",
        },
        status: {
            type: Boolean, // 0=inactive,1=active
            required: false,
            default: 1,
        },
        category_id: {
            type:Schema.Types.ObjectId,
            ref: 'Category',
           
        },
        subcategory_id: {
            type:Schema.Types.ObjectId,
            ref: 'SubCategory',
           
        },
        brand_id: {
            type:Schema.Types.ObjectId,
            default: new ObjectId()
        },
       
    },{
        timestamps: true,
    })
    BrandSchema.set('toObject',{getters:true})
    BrandSchema.set('toJSON',{getters:true})

    return mongoose.model('Brand',BrandSchema,'brand')
}