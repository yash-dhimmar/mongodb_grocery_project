const express = require('express');
const router = express.Router()
const Multer = require('multer')
const path = require('path')
const GlobalAuthClass = require('../middleware/auth');
const CategoryController = require('../../admin/Controllers/categorycontroller');
const SubcategoryController = require('../../admin/Controllers/subcategorycontroller')
const BrandController = require('../../admin/Controllers/brandcontroller')
const ProductController = require('../../admin/Controllers/productcontroller')
const OrderController = require('../Controllers/ordercontroller')
const CoupanController = require('../Controllers/coupancontroller')
const SettingController = require('../Controllers/settingcontroller')
const AdminController = require('../Controllers/admincontroller')
const HomeController = require('../Controllers/Homecontroller')
const StockController = require('../Controllers/stockcontroller')
const upload = require('../middleware/multer')

/* admin login api */
router.post('/login', AdminController.login);
/* admin users list api */
router.post('/users-list', AdminController.userslist)
/* admin users details api */
router.post('/users-details', AdminController.usersdetails)
router.post ('/forgot-password',GlobalAuthClass.authenticate,AdminController.forgotpassword)

router.post('/change-password',GlobalAuthClass.authenticate,AdminController.changepassword)

/* admin category CRUD  api */
router.post('/insert-category', upload.single("image"), CategoryController.insertcategory)
router.post('/update-category', upload.single("image"), CategoryController.updatecategory)
router.post('/delete-category', CategoryController.deletecategory)
router.post('/category-list', CategoryController.categorylist)

/* admin subcategory CRUD  api */
router.post('/insert-subcategory', upload.single("image"), SubcategoryController.insertsubcategory)
router.post('/update-subcategory', upload.single("image"), SubcategoryController.updatesubcategory)
router.post('/subcategory-delete', SubcategoryController.subcategorydelete)
router.post('/subcategory-list', SubcategoryController.subcategorylist)

/* admin brand CRUD  api */
router.post('/insert-brand', upload.single("image"), BrandController.insertbrand)
router.post('/update-brand', upload.single("image"), BrandController.updatebrand)
router.post('/brand-delete', BrandController.branddelete)
router.post('/brand-list', BrandController.brandlist)

/* admin product CRUD  api */
router.post('/insert-product', upload.single("image"), ProductController.insertproduct)
router.post('/update-product', upload.single("image"), ProductController.updateproduct)
router.post('/product-delete', ProductController.productdelete)
router.post('/product-list', ProductController.productlist)

/* admin order list  api */
router.post('/order-list', OrderController.orderlist)
/* admin order detail  api */
router.post('/order-detail', OrderController.orderdetail)

/* admin coupon CRUD  api */
router.post('/add-coupan', CoupanController.addcoupan)
router.post('/update-coupan', CoupanController.updatecoupan)
router.post('/delete-coupan', CoupanController.coupandelete)
router.post('/coupan-list', CoupanController.coupanlist)

/* admin coupon insert setting   api */
router.post('/insert', SettingController.insertsetting)
/* admin coupon update setting   api */
router.post('/update', SettingController.updatesetting)

/* Home management slider section */
router.post('/add-slider', upload.single("image"), HomeController.addslider)
router.post('/delete-slider-product', HomeController.sliderdeleteproduct)
router.post('/slider-list', HomeController.sliderlist)

/* Home management product section */
router.post('/add-product-slider', HomeController.productslider)
router.post('/delete-slider-product-section', HomeController.deletesliderproductsection)
router.post('/product-section-list', HomeController.productsectionlist)

/* Home management brand section */
router.post('/add-brand-slider', HomeController.addbrandslider)
router.post('/delete-slider-brand-section', HomeController.deletesliderbrandsection)
router.post('/brand-section-list', HomeController.brandsectionlist)

/* Home management category section */
router.post('/add-category-slider', HomeController.addcategoryslider)
router.post('/delete-slider-category-section', HomeController.deleteslidercategorysection)
router.post('/category-section-list', HomeController.categorysectionlist)

/* stock management slider section */
router.post('/stock-management',StockController.stockmanagement)









module.exports = router