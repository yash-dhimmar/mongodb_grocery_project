const promise = require('bluebird');
const Joi = require('joi');

class Validator {
  async deletecategoryValidation(body) {
    try {
      const JoiSchema = Joi.object({
        category_id: Joi.string().required(),
      }).messages({
        'string.category_id': "id  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async deletesubcategoryValidation(body) {
    try {
      const JoiSchema = Joi.object({
        subcategory_id: Joi.string().required(),
      }).messages({
        'string.subcategory_id': "id  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async deletebrandValidation(body) {
    try {
      const JoiSchema = Joi.object({
        brand_id: Joi.string().required(),
      }).messages({
        'string.brand_id': "id  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async deleteproductValidation(body) {
    try {
      const JoiSchema = Joi.object({
        product_id: Joi.string().required(),
      }).messages({
        'string.product_id': "id  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async loginValidation(body) {
    try {
      const JoiSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
      }).messages({
        'string.email': "email  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async orderdetailValidation(body) {
    try {
      const JoiSchema = Joi.object({
        order_id: Joi.string().required(),
      }).messages({
        'string.order_id': "id  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async sliderdeleteValidation(body) {
    try {
      const JoiSchema = Joi.object({
        slider_id: Joi.string().required(),
      }).messages({
        'string.slider_id': "id  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async sliderdeleteproductValidation(body) {
    try {
      const JoiSchema = Joi.object({
        section_product_id: Joi.string().required(),
      }).messages({
        'string.section_product_id': "id  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async sliderdeletebrandValidation(body) {
    try {
      const JoiSchema = Joi.object({
        section_brand_id: Joi.string().required(),
      }).messages({
        'string.section_brand_id': "id  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async sliderdeletecategoryValidation(body) {
    try {
      const JoiSchema = Joi.object({
        section_category_id: Joi.string().required(),
      }).messages({
        'string.section_category_id': "id  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async addcoupanValidation(body) {
    try {
      const JoiSchema = Joi.object({
        coupanname: Joi.string().required(),
        coupancode: Joi.string().required(),
        min_price: Joi.required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async updatecoupanValidation(body) {
    try {
      const JoiSchema = Joi.object({
        coupan_id: Joi.string().required(),
        coupanname: Joi.string().required(),
        coupancode: Joi.string().required(),
        min_price: Joi.string().required(),
        discount_price:Joi.string().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async updatecoupanValidation(body) {
    try {
      const JoiSchema = Joi.object({
        coupan_id: Joi.string().required(),
        coupanname: Joi.string().required(),
        coupancode: Joi.string().required(),
        min_price: Joi.required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async deletecoupanValidation(body) {
    try {
      const JoiSchema = Joi.object({
        coupan_id: Joi.string().required()
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
  async insertsettingValidation(body) {
    try {
      const JoiSchema = Joi.object({
        free_delivery_upto: Joi.required(),
        delivery_charge: Joi.string().required(),
        offer: Joi.string().required(),
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }



}

module.exports = new Validator()