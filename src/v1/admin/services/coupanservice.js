const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')

class coupanservice {
  async addcoupan(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { coupanname, coupancode, min_price, discount_price, start_date, end_date } = body
        var data = await Coupan_management.create({
          coupanname: coupanname,
          coupancode: coupancode,
          min_price: min_price,
          discount_price: discount_price,
          start_date: start_date,
          end_date: end_date
        })
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async updatecoupan(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { coupan_id,coupanname, coupancode, min_price, discount_price, start_date, end_date } = body
        var data = await Coupan_management.updateOne({ coupan_id: coupan_id }, {
          $set: {
            coupanname: coupanname,
            coupancode: coupancode,
            min_price: min_price,
            discount_price: discount_price,
            start_date: start_date,
            end_date: end_date
          }
        })
        if (data) {
          resolve()
        }else{
          var err = {message:"coupan id not found plz enter valid id"}
          reject(err)
        }
      })

    } catch (error) {
      return reject(error)
    }
  }
  async coupandelete(body){
    try{
      return new Promise(async(resolve,reject)=>{
        let {coupan_id}=body
       var data = await Coupan_management.deleteOne({coupan_id:coupan_id})
       if (data.length>0) {
         return resolve()
       }else{
        var error = { message: "coupan id not found plz enter valid id"}
        reject(error)
      }
      })
    }catch (error){
      return reject(error)
    }
  }
  async coupanlist(body){
    try{
      return new Promise(async(resolve,reject)=>{
      var data = await Coupan_management.find({})
      resolve(data)
      })
    }catch(error){
      return reject (error)
    }
  }



}

module.exports = new coupanservice()