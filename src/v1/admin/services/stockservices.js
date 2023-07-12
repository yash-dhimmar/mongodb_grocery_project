const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')
const { reject } = require('bluebird')

class StockServices {
  async stockmanagement(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { category_id, subcategory_id, brand_id } = body
        var products = await Product.find({ category_id: category_id, subcategory_id: subcategory_id, brand_id: brand_id },
          {
            "productname": 1,
            variation: 1,
            price: 1
          })
        console.log("bill=================>", products)

        resolve(products)
      } catch (error) {
        return reject(error)
      }
    })


  }

}
module.exports = new StockServices()