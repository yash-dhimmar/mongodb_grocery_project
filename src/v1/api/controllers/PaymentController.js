const PaymentService = require('../services/PaymentService')
const responseHelper = require('../../api/resources/response');
const jwt= require('jsonwebtoken')

class PaymentController {
  async createcustomer(req,res){
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var firstname = decodedData.user[0].firstname
      var lastname = decodedData.user[0].lastname
      var email = decodedData.user[0].email
      var user_id = decodedData.user[0].user_id;
      var data = await PaymentService.createcustomer(req.body,firstname,lastname,email, user_id);
      return responseHelper.success(data, 'customer created successfuly', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }

  async addcard(req,res){
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user_id = decodedData.user[0].user_id;
      var data = await PaymentService.addcard(req.body,user_id);
      return responseHelper.success(data, 'customer add card data submited successfully', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }
  async createcharge(req,res){
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user_id = decodedData.user[0].user_id;
      var data = await PaymentService.createcharge(req.body,user_id);
      return responseHelper.success(data, 'amount', res)
    } catch (error) {
      console.log("error============>", error)
      return responseHelper.error(error, res)
    }
  }



}
module.exports = new PaymentController()