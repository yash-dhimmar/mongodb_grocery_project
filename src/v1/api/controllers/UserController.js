const validator = require('../../../modules/validators/api/index')

const UserService = require('../services/UserService')
const responseHelper = require('../../api/resources/response');
const jwt = require('jsonwebtoken')
const { User, conn, UserDeviceToken } = require('../../../data/models/index')
const Validator = require('../middleware/validation')

class UserController {
  async sendotp(req, res) {
    try {
      await Validator.sendOtpValidation(req.body)
      var data = await UserService.sendotp(req.body)
      return responseHelper.success(data, 'sendotp successfully', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async login(req, res) {
    try {
      await Validator.loginValidation(req.body)
      var user = await UserService.login(req.body)
      if (user) {
        console.log("yash=======>",user[0].mobilenumber)
        var token = jwt.sign({ user }, 'secretkey', { expiresIn: '20d' })
      }
      console.log("token======>", token)
      await User.updateOne({ mobilenumber: user[0].mobilenumber }, { $set: { auth_token: token } })
      user[0].auth_token = token
      return responseHelper.success(user, 'login successfully', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async update(req, res) {
    try {
      await Validator.updateValidation(req.body)
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var mobilenumber = decodedData.user[0].mobilenumber;
      var data = await UserService.update(req.body, mobilenumber);
      return responseHelper.success(data, 'updated successfully', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }
  async resendotp(req, res) {
    try {
      await Validator.resendOtpValidation(req.body)
      var data = await UserService.resendotp(req.body)
      return responseHelper.success(data, 'otp resend successfully', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async category(req, res) {
    try {
      var data = await UserService.category(req.body)
      return responseHelper.success(data, 'category', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async product(req, res) {
    try {
      await Validator.productValidation(req.body)
      var data = await UserService.product(req.body)
      return responseHelper.success(data, 'product-list', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async search(req, res) {
    try {
      await Validator.searchValidation(req.body)
      var data = await UserService.search(req.body)
      return responseHelper.success(data, 'search', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async addtocart(req, res) {
    try {
      await Validator.addtocartValidation(req.body)
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user = decodedData.user[0].user_id;
      console.log("user==>", user)
      var data = await UserService.addtocart(req.body, user);
      return responseHelper.success(data, 'product add to cart successfully', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }
  async deletecartproduct(req, res) {
    try {
      await Validator.deletecartValidation(req.body)
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user = decodedData.user[0].user_id;
      console.log("user==>", user)
      var data = await UserService.deletecartproduct(req.body, user);
      return responseHelper.success(data, 'product deleted from add to cart successfully', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }
  async wishlist(req, res) {
    try {
      //await Validator.wishlistValidation(req.body)
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id;
      var data = await UserService.wishlist(req.body, user)
      return responseHelper.success(data, 'product wishlist successfully', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async getwishlist(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id;
      console.log("user============>", user)
      var data = await UserService.getwishlist(req.body, user)
      return responseHelper.success(data, 'wish list', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }
  async brandsfilter(req, res) {
    try {
      var data = await UserService.brandsfilter(req.body)
      return responseHelper.success(data, 'brands -filter', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async brandsearch(req, res) {
    try {
      await Validator.brandsearchValidation(req.body)
      var data = await UserService.brandsearch(req.body)
      return responseHelper.success(data, 'brands -search', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async discount(req, res) {
    try {
      var data = await UserService.discount(req.body)
      return responseHelper.success(data, 'discount', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async sortby(req, res) {
    try {
      var data = await UserService.sortby(req.body)
      return responseHelper.success(data, 'sortby', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async pricerange(req, res) {
    try {
      var data = await UserService.pricerange(req.body)
      return responseHelper.success(data, 'price-range', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async addaddress(req, res) {
    try {
      await Validator.addressvalidation(req.body)
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id
      var data = await UserService.addaddress(req.body, user)
      return responseHelper.success(data, 'address inserted successfully', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async deleteaddress(req, res) {
    try {
      await Validator.deleteaddressValidation(req.body)
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id
      var data = await UserService.deleteaddress(req.body, user)
      return responseHelper.success(data, 'address deleted successfully', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async addresslist(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id
      var data = await UserService.addresslist(req.body, user)
      return responseHelper.success(data, 'address list', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async homepage(req, res) {
    try {
      var data = await UserService.homepage(req.body)
      return responseHelper.success(data, 'homepage', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }
  async cartlist(req, res) {
    try {
      await Validator.cartlistValidation(req.body)
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id;
      var data = await UserService.cartlist(req.body, user)
      return responseHelper.success(data, 'cart-list', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }
  async checkout(req, res) {
    try {
      await Validator.checkoutValidation(req.body)
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id;
      var data = await UserService.checkout(req.body, user)
      return responseHelper.success(data, '-checkout', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }
  async orderlist(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id;
      var data = await UserService.orderlist(req.body, user)
      return responseHelper.success(data, 'order-list', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async orderdetail(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id;
      var data = await UserService.orderdetail(req.body, user)
      return responseHelper.success(data, 'order-detail', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }

  async addreview(req, res) {
    try {
      await Validator.addreviewValidation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id;
      var data = await UserService.addreview(req.body, user)
      return responseHelper.success(data, 'review added sucessfully ', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }

}
module.exports = new UserController();