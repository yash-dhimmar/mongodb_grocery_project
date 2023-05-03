const AdminService = require('../services/adminservices')
const responseHelper = require('../../admin/resources/response');
const Validator = require('../middleware/validation')
const jwt = require('jsonwebtoken')

class AdminController{
  async login(req,res){
    try{
      await Validator.loginValidation(req.body);
      var data = await AdminService.login(req.body)
      return responseHelper.success(data,'login successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }
  async userslist(req,res){
    try{
      var data = await AdminService.userslist(req.body)
      return responseHelper.success(data,'users-list',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }
  async usersdetails(req,res){
    try{
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.user[0].user_id;
      var data = await AdminService.usersdetails(req.body,user)
      return responseHelper.success(data,'users-details',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }


}
module.exports= new AdminController()