const jwt = require('jsonwebtoken');
const env = require('dotenv');
const { User } = require('../../../data/models/index');
const responseHelper = require('../resources/response');
const UserController = require('../controllers/UserController');
class GlobalAuthClass {
  async authenticate(req, res, next) {
    try {
      if ('authorization' in req.headers && req.headers.authorization != null) {
        var token = req.headers.authorization;
        console.log("token============>", token)
        var decodedData = jwt.verify(token, 'secretkey');
        if (decodedData.iat < decodedData.exp) {
          next()
        }
      } else {
        throw new Error('Authorization token is missing');
      }
    } catch (error) {
      console.log(error)
      return responseHelper.error(error, res)
    }
  }

}

module.exports = new GlobalAuthClass();