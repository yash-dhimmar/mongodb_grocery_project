const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')

class ProductService {
  async insertproduct(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Product.create({
          category_id: req.body.category_id,
          subcategory_id: req.body.subcategory_id,
          brand_id: req.body.brand_id,
          productname: req.body.productname,
          description: req.body.description,
          short_description: req.body.short_description,
          variation: req.body.variation,
          price: req.body.price,
          discount_price: req.body.discount_price,
          discount: req.body.discont,
          image: req.file.filename
        })

        if (data) {
          return resolve(data)
        }

      })
    } catch (error) {
      return reject(error)
    }
  }
  async updateproduct(req) {
    try {
      return new Promise(async (resolve, reject) => {
        // let {category_id,category_name,image}= body
        var data = await Product.updateOne({ product_id: req.body.product_id }, {
          $set: {
            productname: req.body.productname,
            description: req.body.description,
            short_description: req.body.short_description,
            variation: req.body.variation,
            price: req.body.price,
            discount_price: req.body.discount_price,
            discount: req.body.discont,
            image: req.file.filename
          }
        })
        if (data) {
          return resolve()
        } else {
          var error = { message: "product id not found please enter a valid category_id" }
          reject(error)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async productdelete(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { product_id } = body
        var data = await Product.deleteOne({ product_id: product_id })
        if (data.length > 0) {
          return resolve()
        } else {
          var error = { message: "product id not found please enter a valid product_id" }
          resolve(error)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async productlist(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Product.find({})
        resolve(data)
      })

    } catch (error) {
      return reject(error)
    }
  }



}

module.exports = new ProductService()