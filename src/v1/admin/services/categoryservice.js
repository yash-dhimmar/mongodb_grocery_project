const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')
class CategoryServices {
  async insertcategory(req) {
    return new Promise(async (resolve, reject) => {
      try {
        //let{category_name,image}= body
        var data = await Category.create({ category_name: req.body.category_name, image: req.file.filename })
        if (data) {
          return resolve(data)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async updatecategory(req) {
    return new Promise(async (resolve, reject) => {
      try {
        let { category_id, category_name, image } = req.body
        var detail = await Category.findOne({
          category_id: category_id
        })
        if (detail) {
          var data = await Category.updateOne({ category_id:category_id },
            {
              $set: {
                category_name: category_name,
                image: req.file.filename
              }
            })

          return resolve()
        }
        else {
          var error = { message: "category id not found please enter a valid category_id" }
          return reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async deletecategory(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { category_id } = body
        var detail = await Category.findOne({
          category_id: category_id
        })
        if (detail.length > 0) {
          var data = await Category.deleteOne({ category_id: category_id })
          return resolve()
        } else {
          var error = { message: "category id not found please enter a valid category_id" }
          reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async categorylist(body) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Category.find({})
        resolve(data)
      } catch (error) {
        return reject(error)
      }
    })

  }




}
module.exports = new CategoryServices()