const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = (mongoose) => {
    const BrandSchema = new Schema({
     
     
        image: {
            type: String,
            required: false,
            default: "",
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

    return mongoose.model('Brand',BrandSchema,'brand')
}