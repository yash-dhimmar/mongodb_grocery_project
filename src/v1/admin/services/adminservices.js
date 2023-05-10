const { User, Category, Subcategory, Brand, Admin, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
var nodemailer = require('nodemailer');

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
  async forgotpassword(body,_id) {
    try {
      return new Promise(async (resolve, reject) => {
       let { email } = body
        var data = await Admin.find({ email:email})
        if (data.length > 0) {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: 'tristate.mteam@gmail.com',
              pass: 'nuwuxqxjnogjuwyb'
            }
          });
          var mailOptions = await transporter.sendMail({
            from: 'tristate.mteam@gmail.com',
            to: 'yashpra14@gmail.com',
            subject: 'password',
            text: 'tristate123'
          });
          console.log("mailOptions========>", mailOptions)
          resolve(mailOptions)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async changepassword(body, email) {
    try {
      return new Promise(async (resolve, reject) => {
        let { password, newpassword, conformpassword } = body
        var data = await Admin.find({ email: email })
        if (data.length > 0) {
          var pass = bcrypt.compareSync(`${password}`, data[0].password)
          if (pass) {
            if (password === newpassword) {
              var error = { message: "enter valid  new password" }
              error.code = 400
              reject(error)
            } else if (newpassword === conformpassword) {
             conformpassword = await bcrypt.hashSync(password, 10)
              var update = await Admin.updateOne({ email: email }, { $set: { password: conformpassword } })
              console.log("update===============>", update)
              resolve()
            } else {
              var err = { message: "password and conformpassword does not match" }
              reject(err)
            }
          }
          // else {
          //   var err = { message: "password does not match to the database" }
          //   reject(err)
          // }
        }
      })
    } catch (error) {
      return reject(error)
    }
  }


}
module.exports = new AdminService()

