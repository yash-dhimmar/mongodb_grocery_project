const promise = require('bluebird');
const Joi = require('joi');

class Validator {
  async deletecategoryValidation(body) {
    try {
      const JoiSchema = Joi.object({
       category_id : Joi.string().required(),

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
       subcategory_id : Joi.string().required(),

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
       brand_id : Joi.string().required(),

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
       product_id : Joi.string().required(),

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
       email : Joi.string().required(),
       password:Joi.string().required()

      }).messages({
        'string.email': "email  must be required"
      })
      return await JoiSchema.validateAsync(body);
    } catch (err) {
      let error = { message: err.message, code: 400 };
      return promise.reject(error);
    }
  }
}

module.exports= new Validator()