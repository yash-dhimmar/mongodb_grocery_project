const { User, Category, Subcategory, Brand, Admin, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

class AdminService {
  async login(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { email, password } = body
        var data = await Admin.find({ email: email })
        const hash = await bcrypt.hash(password, 10)
        if (data.length > 0) {
          var data1 = bcrypt.compareSync(`${password}`, data[0].password)
          console.log("data1============>", data1)
          if (data1) {
            return resolve(data[0])
          } else {
            var err = { message: "enter a valid password" }
            reject(err)
          }
        } else {
          var insert = await Admin.create({ email: email, password: hash })
          return resolve(insert)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async userslist(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await User.find({})
        resolve(data)

      })
    } catch (error) {
      return reject(error)
    }
  }
  async usersdetails(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        // var userdetail = await User.aggregate([

        //   { $match: { user_id: mongoose.Types.ObjectId(user_id) } },

        //   {
        //     $lookup:
        //     {
        //       from: "address",
        //       localField: "user_id",
        //       foreignField: "user_id",
        //       as: "address",
        //       pipeline: [
        //         {
        //           $lookup: {
        //             from: "orders",
        //             localField: "user_id",
        //             foreignField: "user_id",
        //             as: "orders"
        //           }
        //         },
        //         {
        //           $unwind: '$orders',
        //         },
        //         {
        //           $group: {
        //             _id: '$_id',
        //             order_id: {
        //               $first: '$orders.order_id',
        //             },
        //             date: {
        //               $first: '$orders.date',
        //             },
        //             user_name: {
        //               $first: '$firstname'
        //             },
        //             Amount: {
        //               $first: '$orders.grand_total',
        //             },
        //             payment_type: {
        //               $first: '$orders.payment_type',
        //             },
        //             status: {
        //               $first: '$orders.status',
        //             }
        //           }
        //         }
        //       ]
        //     }
        //   },
        // ])
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
                $first: { $concat: ['$home_details', '$landmark'] }
              },
            }
          },
        ])
        var order = await User.aggregate([
          { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
          {
            $lookup:
            {
              from: "orders",
              localField: "user_id",
              foreignField: "user_id",
              as: "orders"
            },
          },
          {
            $unwind: '$orders'
          },
          {
            $group: {
              _id: '$_id',
              order_id: {
                $first: '$orders.order_id',
              },
              date: {
                $first: '$orders.date',
              },
              user_name: {
                $first: { $concat: ['$firstname', '$lastname'] }
              },
              Amount: {
                $first: '$orders.grand_total',
              },
              payment_type: {
                $first: '$orders.payment_type',
              },
              status: {
                $first: '$orders.status',
              }
            }
          }
        ])
        resolve(user.concat([order]))
      })
    } catch (error) {
      return reject(error)
    }

  }

}
module.exports = new AdminService()

