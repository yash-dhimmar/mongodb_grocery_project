const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')

class BrandService {
  async insertbrand(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Brand.create({
          image: req.file.filename,
          name: req.body.name,
          category_id: req.body.category_id,
          subcategory_id: req.body.subcategory_id
        })

        if (data) {
          return resolve(data)
        }
      } catch (error) {
        return reject(error)
      }

    })

  }
  async updatebrand(req) {
    return new Promise(async (resolve, reject) => {
      try {
        let { brand_id, name, image } = req.body
        var detail = await Brand.findOne({
          brand: brand_id
        })
        if (detail.length > 0) {
          var data = await Brand.updateOne({ brand_id: brand_id }, { $set: { name: name, image: req.file.filename } })
          return resolve()
        } else {
          var error = { message: "brand id not found please enter a valid brand_id" }
          reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async branddelete(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { brand_id } = body
        var detail = await Brand.findOne({
          brand: brand_id
        })
        if (detail.length > 0) {
          var data = await Brand.deleteOne({ brand_id: brand_id })
          console.log("data================>", data)

          return resolve()
        } else {
          var error = { message: "brand id not found please enter a valid brand_id" }
          reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async brandlist(body) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Brand.find({})
        resolve(data)
      } catch (error) {
        return reject(error)
      }
    })

  }



}
module.exports = new BrandService()