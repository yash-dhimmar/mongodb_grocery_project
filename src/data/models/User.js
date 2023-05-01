//const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;

module.exports = (mongoose) => {
    const UserSchema = new Schema({
        user_id:{
            type: Schema.Types.ObjectId,
            default:new ObjectId()
        },
      
        firstname: {
            type: String,
            required: false,
            default: "",
        },
        lastname: {
            type: String,
            required: false,
            default: "",
        },
        mobilenumber: {
            type:String,
            required: false,
           
        },
        device_id: {
            type: Number, //1=email,2=google,3=facebook,4=apple_id
            required: false,
            default: 0
        },
        email: {
            type: String,
            required: false,        
            default:"",
          
        },
        auth_token: {
            type: String,
            required: false,
            default:"",
        },
        status: {
            type: Boolean, // 0=inactive,1=active
            required: false,
            default: 1,
        },
        otp: {
            type: Number, //1=email,2=google,3=facebook,4=apple_id
            required: false,
        },
        is_registered: {
            type: Boolean,
            required: false,
            default: 0
        },
       
    }, {
        timestamps: true
    });


    return  mongoose.model('User', UserSchema, 'users')
};






















// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// module.exports = (mongoose) => {
//     const UserSchema = new Schema({
//         firstname:{
//             type: String,
//             required: false,
//             default:""
//         },
//         lastname:{
//             type: String,
//             required: false,
//             default:""
//         },
//         email:{
//             type: String,
//             required:false, 
//             default:""
           
//         },
//         image:{
//             type: String,
//             required:false,
//             default:""
//         },
//         address:{
//             type:String,
//             required:false,
//             default:""
//         },
//         device_id:{
//             type:String,
//             required:false,
//             default:""
//         },
//         mobilenumber:{
//             type:String,
//             required:false,
//             default:""
//         },
//         auth_token:{
//             type:String,
//             required:false,
//             default:""
//         },
//         otp:{
//             type:Number,
//             required:false,
          
//         },
//         is_registered:{
//             type:Number,
//             required:false,
//             default:"0"
//         },
//        status:{
//             type: Number, // 0=inactive,1=active
//             required: false,
//             default:"1"
           
//         },
     
//     },{
//         timestamps: true
//     });
//     return mongoose.model('User',UserSchema,'users')
// };
