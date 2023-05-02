const { User, Category, Subcategory, Brand, Admin, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')
const bcrypt = require('bcrypt')

class AdminService {
  async login(body,req) {
    try {
      return new Promise(async (resolve, reject) => {
        let { email, password } = body
        var data = await Admin.find({ email: email })
        const hash = await bcrypt.hash(password, 10)

        if (data.length > 0) {
          var data1 = bcrypt.compareSync(`${password}`,data[0].password)
            console.log("data1============>",data1)
            if(data1){
              return resolve(data[0])
            }else{
              var err = {message:"enter a valid password"}
              reject(error)
            }
          }else {
            var insert = await Admin.create({ email: email, password: hash })
          return resolve(insert)
          }

      })
    } catch (error) {
      return reject(error)
    }
  }

}
module.exports = new AdminService()

