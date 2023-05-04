const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')

class SettingService {
  async insertsetting(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { free_delivery_upto, delivery_charge, tax } = body
        var data = await Setting.create({
          free_delivery_upto: free_delivery_upto,
          delivery_charge: delivery_charge,
          tax: tax
        })
        resolve(data)
      })
    } catch (error) {
      return reject(Error)
    }
  }
  async updatesetting(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { setting_id, free_delivery_upto, delivery_charge, tax } = body
        var data = await Setting.updateOne({ setting_id: setting_id }, {
          $set: {
            free_delivery_upto: free_delivery_upto,
            delivery_charge: delivery_charge,
            tax: tax
          }
        })
        resolve()
      })
    } catch (error) {
      return reject(error)
    }
  }

}
module.exports = new SettingService()