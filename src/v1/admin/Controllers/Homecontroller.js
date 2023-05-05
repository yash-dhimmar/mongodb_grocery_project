const Homeservice = require('../services/Homeservice')
const responseHelper = require('../resources/response')
const Validator = require ('../middleware/validation')

class HomeController {

  async addslider(req, res) {
    try {
      var data = await Homeservice.addslider(req)
      return responseHelper.success(data, 'slider image added successfully', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async sliderdeleteproduct(req, res) {
    try {
      await Validator.sliderdeleteValidation(req.body)
      var data = await Homeservice.sliderdeleteproduct(req.body)
      return responseHelper.success(data, 'slider image deleted successfully', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async sliderlist(req, res) {
    try {
      var data = await Homeservice.sliderlist(req.body)
      return responseHelper.success(data, 'slider list', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async productslider(req, res) {
    try {
      var data = await Homeservice.productslider(req.body)
      return responseHelper.success(data, 'product slider data inserted successfully ', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async deletesliderproductsection(req, res) {
    try {
      await Validator.sliderdeleteproductValidation(req.body)
      var data = await Homeservice.deletesliderproductsection(req.body)
      return responseHelper.success(data, 'slider  image deleted successfully', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async productsectionlist(req, res) {
    try {
      var data = await Homeservice.productsectionlist(req.body)
      return responseHelper.success(data, 'product - section-list', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async addbrandslider(req, res) {
    try {
      var data = await Homeservice.addbrandslider(req.body)
      return responseHelper.success(data, 'brand added slier section', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async deletesliderbrandsection(req, res) {
    try {
      await Validator.sliderdeletebrandValidation(req.body)
      var data = await Homeservice.deletesliderbrandsection(req.body)
      return responseHelper.success(data, 'brand slider  image deleted successfully', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async brandsectionlist(req, res) {
    try {
      var data = await Homeservice.brandsectionlist(req.body)
      return responseHelper.success(data, 'brand - section-list', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async addcategoryslider(req, res) {
    try {
      var data = await Homeservice.addcategoryslider(req)
      return responseHelper.success(data, 'category added slier section', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async deleteslidercategorysection(req, res) {
    try {
      await Validator.sliderdeletecategoryValidation(req.body)
      var data = await Homeservice.deleteslidercategorysection(req.body)
      return responseHelper.success(data, 'category slider  image deleted successfully', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }
  async categorysectionlist(req, res) {
    try {
      var data = await Homeservice.categorysectionlist(req.body)
      return responseHelper.success(data, ' category- section-list', res)
    } catch (error) {
      console.log("error=============>", error)
      return responseHelper.error(error, res)
    }
  }

}
module.exports = new HomeController()