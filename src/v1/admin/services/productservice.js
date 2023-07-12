const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')

class ProductService {
  async insertproduct(req) {

    return new Promise(async (resolve, reject) => {
      try {
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
      } catch (error) {
        return reject(error)
      }
    })

  }
  async updateproduct(req) {
    return new Promise(async (resolve, reject) => {
      try {
        let {product_id,productname,description,short_description,variation,price,discount_price,discount}=req.body
        var detail = await Product.findOne({
          product_id: product_id
        })
        if (detail) {
          var data = await Product.updateOne({ product_id:product_id }, {
            $set: {
              productname: productname,
              description:description,
              short_description: short_description,
              variation:variation,
              price: price,
              discount_price:discount_price,
              discount:discount,
              image: req.file.filename
            }
          })
          return resolve()
        } else {
          var error = { message: "product id not found please enter a valid product_id" }
          reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async productdelete(req) {
    return new Promise(async (resolve, reject) => {
      try {
        let { product_id } = req.body
        var detail = await Product.findOne({
          product_id: req.body.product_id
        })
        if (detail) {
          var data = await Product.deleteOne({ product_id: product_id })
          return resolve()
        } else {
          var error = { message: "product id not found please enter a valid product_id" }
          reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })
  }
  async productlist(body) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Product.find({})
        resolve(data)
      } catch (error) {
        return reject(error)
      }
    })

  }

}

module.exports = new ProductService()