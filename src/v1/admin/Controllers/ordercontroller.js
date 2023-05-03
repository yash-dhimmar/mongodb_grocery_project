const AdminService = require ('../services/orderservices')
const responseHelper = require('../resources/response')
const jwt = require('jsonwebtoken')
const Validator= require('../middleware/validation')

class OrderController {

  async orderlist (req,res){
    try{
      var data = await AdminService.orderlist(req.body)
      return responseHelper.success(data,'order list',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }
  async orderdetail(req,res){
    try{
      await Validator.orderdetailValidation(req.body)
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id;
      var data = await AdminService.orderdetail(req.body,user)
      return responseHelper.success(data,'order-detail',res)
    }catch (error){
      return responseHelper.error(error,res)
    }
  }

}
module.exports = new OrderController();