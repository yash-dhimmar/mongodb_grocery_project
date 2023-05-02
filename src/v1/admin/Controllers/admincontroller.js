const AdminService = require('../services/adminservices')
const responseHelper = require('../../admin/resources/response');
const Validator = require('../middleware/validation')

class AdminController{
  async login(req,res){
    try{
      var data = await AdminService.login(req.body)
      return responseHelper.success(data,'login successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }


}
module.exports= new AdminController()