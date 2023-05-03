const { User, Category, Subcategory, Brand, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')
var mongoose = require('mongoose')

class OrderService {
  async orderlist(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Orders.find({},
          {
            "order_id": 1,
            "user_id": 1,
            "date": 1,
            "grand_total": 1,
            "payment_type": 1
          })
        return resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async orderdetail(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let {order_id}=body
        var mainprice = 0
        var data = await Orders.find({ order_id:order_id},
          {
            "order_id": 1,
            "payment_type": 1
          })
          if(data.length>0){
        var user = await Address.aggregate([
          { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
          {
            $lookup:
            {
              from: "users",
              localField: "user_id",
              foreignField: "user_id",
              as: "users"
            },
          },
          {
            $unwind: '$users'
          },
          {
            $group: {
              _id: '$_id',

              name: {
                $first: { $concat: ["$users.firstname", "$users.lastname"] },
              },
              mobilenumber: {
                $first: '$users.mobilenumber',
              },
              email: {
                $first: '$users.email'
              },
              address: {
                $first: '$landmark'
              },
            }
          },
        ])



        var product = await Addcart.aggregate([
          { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
          {
            $lookup:
            {
              from: "product",
              localField: "product_id",
              foreignField: "product_id",
              as: "products"
            },
          },
          {
            $unwind: '$products'
          },
          {
            $group: {
              _id: '$_id',
              productname: {
                $first: '$products.productname',
              },
              variation: {
                $first: '$products.variation',
              },
              price: {
                $first: '$products.price',
              },
              quantity: {
                $first: '$quantity'
              },
              Total: {
                $first: { $sum: { $multiply: ["$products.price", "$quantity"] } },
              },
            }
          },
        ])
        //calculate total
        for (let i = 0; i < product.length; i++) {
          mainprice = mainprice + product[i].Total
        }
        console.log("mainprice===========>", mainprice)

        //calculate tax
        let tax = await Setting.find({
        }, {
          "tax": 1
        });
        var tax2 = tax[0].tax
        var tax3 = mainprice * tax2 / 100
        console.log("tax3===========>", tax3)

        //calculate grandtotal
        var grand_total = mainprice + tax3
        console.log("grand_total===========>", grand_total)

        var data = {
          Total: mainprice,
          Tax: tax3,
          Grand_Total: grand_total
        }

        resolve(user.concat([product, data]))
      }else{
        var err = {message:"order_id not found plz enter valid order_id"}
        reject(err)
      }
        
      })
    } catch (error) {
      return reject(error)
    }
  }

}
module.exports = new OrderService();