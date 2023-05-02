const AdminService = require('../services/brandservice')
const responseHelper = require('../../admin/resources/response');
const Validator = require('../middleware/validation')

class BrandController {

  async insertbrand(req,res){
    try{
      var data = await AdminService.insertbrand(req)
      return responseHelper.success(data,'brand inserted successfully',res)
    }catch(error){
      console.log("error===========>",error)
      return responseHelper.error(error,res)
    }
  }

  async updatebrand(req,res){
    try{
      var data = await AdminService.updatebrand(req)
      return responseHelper.success(data,'brand updated successfully',res)
    }catch(error){
      console.log("error===========>",error)
      return responseHelper.error(error,res)
    }
  }

  async branddelete(req,res){
    try{
      await Validator.deletebrandValidation(req.body);
      var data = await AdminService.branddelete(req.body)
      return responseHelper.success(data,'brand deleted successfully',res)
    }catch(error){
      console.log("error===========>",error)
      return responseHelper.error(error,res)
    }
  }

  async brandlist(req,res){
    try{
      var data = await AdminService.brandlist(req)
      return responseHelper.success(data,'brand list',res)
    }catch(error){
      console.log("error===========>",error)
      return responseHelper.error(error,res)
    }
  }

}
module.exports= new BrandController()