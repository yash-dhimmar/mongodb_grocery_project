const StockService = require('../services/stockservices')
const responseHelper = require('../resources/response')

class StockController {
  async stockmanagement(req, res) {
    try {
      var data = await StockService.stockmanagement(req.body)
      return responseHelper.success(data, 'stock here', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }


}

module.exports = new StockController