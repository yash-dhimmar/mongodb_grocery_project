const CoupanService = require('../services/coupanservice')
const responseHelper = require('../resources/response')
const Validator = require('../middleware/validation')
class CoupanController {
  async addcoupan(req, res) {
    try {
     // await Validator.addcoupanValidation(req.body)
      var data = await CoupanService.addcoupan(req.body)
      return responseHelper.success(data, 'coupan added successfully', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async updatecoupan(req, res) {
    try {
     // await Validator.updatecoupanValidation(req.body)
      var data = await CoupanService.updatecoupan(req.body)
      return responseHelper.success(data, 'coupan updated successfully', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async coupandelete(req, res) {
    try {
      await Validator.deletecoupanValidation(req.body)
      var data = await CoupanService.coupandelete(req.body)
      return responseHelper.success(data, 'coupan deleted successfully', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async coupanlist(req, res) {
    try {
      var data = await CoupanService.coupanlist(req.body)
      return responseHelper.success(data, 'coupan list', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }

}
module.exports = new CoupanController()