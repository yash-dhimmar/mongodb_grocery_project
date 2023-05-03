const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')
class SubcategoryServices {
  async insertsubcategory(req) {
    try {
      return new Promise(async (resolve, reject) => {
        //let{,image}= body
        var data = await Subcategory.create({ image: req.file.filename, name: req.body.name, category_id: req.body.category_id })
        if (data) {
          return resolve(data)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async updatesubcategory(req) {
    try {
      return new Promise(async (resolve, reject) => {
        // let {category_id,category_name,image}= body
        var data = await Subcategory.updateOne({ subcategory_id: req.body.subcategory_id }, { $set: { name: req.body.name, image: req.file.filename } })
        if (data) {
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
    try {
      return new Promise(async (resolve, reject) => {
        let { subcategory_id } = body
        var data = await Subcategory.deleteOne({ subcategory_id: subcategory_id })
        if (data.length > 0) {
          return resolve()
        } else {
          var error = { message: "subcategory id not found please enter a valid subcategory_id" }
          reject(error)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async subcategorylist(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Subcategory.find({})
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }
}
module.exports = new SubcategoryServices()