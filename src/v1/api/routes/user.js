const express = require('express');
const router = express.Router()
const Multer = require('multer')
const path = require('path')
const GlobalAuthClass = require('../middleware/auth');
const UserController = require('../../api/controllers/UserController');


router.post('/sendotp', UserController.sendotp);
router.post('/login', UserController.login);
router.post('/update', GlobalAuthClass.authenticate, UserController.update)
router.post('/resendotp', UserController.resendotp)
router.post('/category', UserController.category)
router.post('/subcategory-product-list', UserController.product)
router.post('/product-search', UserController.search)
router.post('/add-to-cart', GlobalAuthClass.authenticate, UserController.addtocart)
router.post('/delete-cart-product', GlobalAuthClass.authenticate, UserController.deletecartproduct)
router.post('/wishlist', GlobalAuthClass.authenticate, UserController.wishlist);
router.get('/getwishlist', GlobalAuthClass.authenticate, UserController.getwishlist)
router.post('/brands-filter', UserController.brandsfilter)
router.post('/brandsearch', UserController.brandsearch)
router.post('/discount', UserController.discount)
router.post('/sortby', UserController.sortby)
router.post('/pricerange', UserController.pricerange)
router.post('/add-address', GlobalAuthClass.authenticate, UserController.addaddress)
router.post('/delete-address', GlobalAuthClass.authenticate, UserController.deleteaddress)
router.post('/address-list', GlobalAuthClass.authenticate, UserController.addresslist)
router.post('/homepage', GlobalAuthClass.authenticate, UserController.homepage)
router.post('/cartlist', GlobalAuthClass.authenticate, UserController.cartlist)
router.post('/checkout', GlobalAuthClass.authenticate, UserController.checkout)
router.post('/order-list', GlobalAuthClass.authenticate, UserController.orderlist)
router.post('/order-detail', GlobalAuthClass.authenticate, UserController.orderdetail)

router.post('/add-review', GlobalAuthClass.authenticate, UserController.addreview)

module.exports = router;
