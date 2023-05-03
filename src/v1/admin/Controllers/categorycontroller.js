
const AdminService = require('../services/categoryservice')
const responseHelper = require('../../admin/resources/response');
const jwt = require('jsonwebtoken')
//const { User, conn, UserDeviceToken } = require('../../../data/models/index')
const Validator = require('../middleware/validation')


class CategoryController{

  async insertcategory(req,res){
    try{
      var data = await AdminService.insertcategory(req);
      return responseHelper.success(data,'category inserted  successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }

  async updatecategory(req,res){
    try{
      var data = await AdminService.updatecategory(req);
      return responseHelper.success(data,'category updated successfully',res)
    }catch(error){
      return responseHelper.error(error,res)



      
    }
  }

  async deletecategory(req,res){
    try{
      await Validator.deletecategoryValidation(req.body);
      var data = await AdminService.deletecategory(req.body);
      return responseHelper.success(data,'category deleted successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }

  async categorylist(req,res){
    try{
      var data = await AdminService.categorylist(req.body);
      return responseHelper.success(data,'category list',res)
    }catch(error){
      return responseHelper.error(error,res)         
    }
  }

}

module.exports = new CategoryController() 
