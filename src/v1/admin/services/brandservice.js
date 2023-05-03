const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')

class BrandService {

  async insertbrand(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Brand.create({
          image: req.file.filename,
          name: req.body.name,
          category_id: req.body.category_id,
          subcategory_id: req.body.subcategory_id
        })

        if (data) {
          return resolve(data)
        }

      })
    } catch (error) {
      return reject(error)
    }
  }

  async updatebrand(req) {
    try {
      return new Promise(async (resolve, reject) => {
        // let {category_id,category_name,image}= body
        var data = await Brand.updateOne({ brand_id: req.body.brand_id }, { $set: { name: req.body.name, image: req.file.filename } })
        if (data) {
          return resolve()
        } else {
          var error = { message: "category id not found please enter a valid category_id" }
          resolve(error)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }

  async branddelete(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { brand_id } = body
        var data = await Brand.deleteOne({ brand_id: brand_id })
        console.log("data================>", data)
        if (data.length > 0) {
          return resolve()
        } else {
          var error = { message: "brand id not found please enter a valid brand_id" }
          reject(error)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }

  async brandlist(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Brand.find({})
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }



}
module.exports = new BrandService()