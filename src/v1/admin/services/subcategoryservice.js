const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')
class SubcategoryServices {
  async insertsubcategory(req) {

    return new Promise(async (resolve, reject) => {
      try {
        //let{,image}= body
        var data = await Subcategory.create({ image: req.file.filename, name: req.body.name, category_id: req.body.category_id })
        if (data) {
          return resolve(data)
        }
      } catch (error) {
        return reject(error)
      }
    })
  }
  async updatesubcategory(req) {
    try {
      return new Promise(async (resolve, reject) => {
         let {subcategory_id,name,image}= req.body
        var detail = await Subcategory.findOne({
          subcategory_id: req.body.subcategory_id
        })
        if (detail) {
          var data = await Subcategory.updateOne({ subcategory_id:subcategory_id }, { $set: { name:name, image: req.file.filename } })
          return resolve()
        } else {
          var error = { message: "subcategory id not found please enter a valid category_id" }
          reject(error)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async subcategorydelete(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { subcategory_id } = body
        var detail = await Subcategory.findOne({
          subcategory_id: subcategory_id
        })
        if (detail) {
          var data = await Subcategory.deleteOne({ subcategory_id: subcategory_id })
          return resolve()
        } else {
          var error = { message: "subcategory id not found please enter a valid subcategory_id" }
          reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async subcategorylist(body) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Subcategory.find({})
        resolve(data)
      } catch (error) {
        return reject(error)
      }
    })

  }
}
module.exports = new SubcategoryServices()