const express = require('express');
const router = express.Router()
const Multer = require('multer')
const path = require('path')
const GlobalAuthClass = require('../middleware/auth');
const UserController = require('../../api/controllers/UserController');
const PaymentController = require('../../api/controllers/PaymentController')

/* send otp to user mobile number */
router.post('/sendotp', UserController.sendotp);

/* user login api */
router.post('/login', UserController.login);

/* update user detail */
router.post('/update', GlobalAuthClass.authenticate, UserController.update)

/* resend otp to user mobile number */
router.post('/resendotp', UserController.resendotp)

/* product category  */
router.post('/category', UserController.category)

/* product subcategory  */
router.post('/subcategory-product-list', UserController.product)

/* product search api  */
router.post('/product-search', UserController.search)

/* product add to cart api  */
router.post('/add-to-cart', GlobalAuthClass.authenticate, UserController.addtocart)

/* product delete product from add to cart api  */
router.post('/delete-cart-product', GlobalAuthClass.authenticate, UserController.deletecartproduct)

/* product wishlist api  */
router.post('/wishlist', GlobalAuthClass.authenticate, UserController.wishlist);

/* product getwishlist api  */
router.get('/getwishlist', GlobalAuthClass.authenticate, UserController.getwishlist)

/* brands of product */
router.post('/brands-filter', UserController.brandsfilter)

/* brands search api */
router.post('/brandsearch', UserController.brandsearch)

/* product discount range */
router.post('/discount', UserController.discount)

/* product sortBy*/
router.post('/sortby', UserController.sortby)

/* product min max price range*/
router.post('/pricerange', UserController.pricerange)

/* user add-address */
router.post('/add-address', GlobalAuthClass.authenticate, UserController.addaddress)

/* user delete-address */
router.post('/delete-address', GlobalAuthClass.authenticate, UserController.deleteaddress)

/* user address list */
router.post('/address-list', GlobalAuthClass.authenticate, UserController.addresslist)

/* user home management */
router.post('/homepage', GlobalAuthClass.authenticate, UserController.homepage)

/* user cart list product */
router.post('/cartlist', GlobalAuthClass.authenticate, UserController.cartlist)

/* checkout api */
router.post('/checkout', GlobalAuthClass.authenticate, UserController.checkout)

/* user order list */
router.post('/order-list', GlobalAuthClass.authenticate, UserController.orderlist)

/* user orderdetail list */
router.post('/order-detail', GlobalAuthClass.authenticate, UserController.orderdetail)

/* add review product */
router.post('/add-review', GlobalAuthClass.authenticate, UserController.addreview)

router.post('/create-customer', GlobalAuthClass.authenticate,PaymentController.createcustomer)

router.post('/add-card-details',GlobalAuthClass.authenticate,PaymentController.addcard)

router.post('/create-charge',PaymentController.createcharge)

module.exports = router;
