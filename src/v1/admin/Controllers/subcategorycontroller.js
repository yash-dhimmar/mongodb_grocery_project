
const AdminService = require('../services/subcategoryservice')
const responseHelper = require('../../admin/resources/response');
const jwt = require('jsonwebtoken')
//const { User, conn, UserDeviceToken } = require('../../../data/models/index')
const Validator = require('../middleware/validation')


class SubcategoryController{

  async insertsubcategory(req,res){
    try{
      var data = await AdminService.insertsubcategory(req);
      return responseHelper.success(data,'subcategory inserted  successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }

  async updatesubcategory(req,res){
    try{
      var data = await AdminService.updatesubcategory(req);
      return responseHelper.success(data,'subcategory updated successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }

  async subcategorydelete(req,res){
    try{
      await Validator.deletesubcategoryValidation(req.body);
      var data = await AdminService.subcategorydelete(req.body);
      return responseHelper.success(data,'subcategory deleted successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }

  async subcategorylist(req,res){
    try{
      var data = await AdminService.subcategorylist(req.body);
      return responseHelper.success(data,'subcategory list',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }


}

module.exports = new SubcategoryController() 
