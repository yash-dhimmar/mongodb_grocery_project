const AdminService = require('../services/productservice')
const responseHelper = require('../../admin/resources/response');
const Validator= require('../middleware/validation')

class ProductController{
  async insertproduct(req,res){
    try{
      var data = await AdminService.insertproduct(req);
      return responseHelper.success(data,'product inserted  successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }

  async updateproduct(req,res){
    try{
      var data = await AdminService.updateproduct(req);
      return responseHelper.success(data,'product updated  successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }

  async productdelete(req,res){
    try{
      await Validator.deleteproductValidation(req.body);
      var data = await AdminService.productdelete(req.body);
      return responseHelper.success(data,'product deleted  successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }

  async productlist(req,res){
    try{
      var data = await AdminService.productlist(req.body);
      return responseHelper.success(data,'product list',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }





}

module.exports = new ProductController()