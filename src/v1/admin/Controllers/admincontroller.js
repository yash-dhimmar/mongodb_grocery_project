const { User, Category, Subcategory, Brand, Admin, Product, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')
const AdminService = require('../services/adminservices')
const responseHelper = require('../../admin/resources/response');
const Validator = require('../middleware/validation')
const jwt = require('jsonwebtoken')

class AdminController {
  async login(req, res) {
    try {
      await Validator.loginValidation(req.body);
      var user = await AdminService.login(req.body)
      user.auth_token = ''
      if (user) {
        var token = jwt.sign({ user }, 'secretkey', { expiresIn: '20d' })
      }
      console.log("token============>", token)
      await Admin.updateOne({ email: user.email }, { $set: { auth_token: token } })
      user.auth_token = token
      return responseHelper.success(user, 'login successfully', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }
  async userslist(req, res) {
    try {
      var data = await AdminService.userslist(req.body)
      return responseHelper.success(data, 'users-list', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async usersdetails(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id;
      var data = await AdminService.usersdetails(req.body, user)
      return responseHelper.success(data, 'users-details', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async forgotpassword(req, res) {
    try {
      var token = req.headers.authorization
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user._id
      var data = await AdminService.forgotpassword(req.body,user)
      return responseHelper.success(data, 'forgot-password', res)
    } catch (error) {
      console.log("error========>",error)
      return responseHelper.error(error, res)
    }
  }
  async changepassword(req, res) {
    try {
      var token = req.headers.authorization
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user.email
      var data = await AdminService.changepassword(req.body,user)
      return responseHelper.success(data, 'password changed successfully', res)
    } catch (error) {
      console.log("error========>",error)
      return responseHelper.error(error, res)
    }
  }

}
module.exports = new AdminController()