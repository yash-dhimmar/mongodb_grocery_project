const SettingService = require ('../services/settingservice')
const responseHelper = require('../resources/response')
const Validator= require('../middleware/validation')

class SettingController {
  async insertsetting(req,res){
    try{
      await Validator.insertsettingValidation(req.body)
      var data = await SettingService.insertsetting(req.body)
      return responseHelper.success(data,'inserted successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }
  async updatesetting(req,res){
    try{
      var data = await SettingService.updatesetting(req.body)
      return responseHelper.success(data,'updated successfully',res)
    }catch(error){
      return responseHelper.error(error,res)
    }
  }


}
module.exports = new SettingController()