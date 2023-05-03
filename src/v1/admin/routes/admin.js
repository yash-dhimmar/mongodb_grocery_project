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
const AdminController = require('../Controllers/admincontroller')
const upload = require('../middleware/multer')

router.post('/login', AdminController.login);
router.post('/users-list', AdminController.userslist)
router.post('/users-details',AdminController.usersdetails)

router.post('/insert-category', upload.single("image"), CategoryController.insertcategory)
router.post('/update-category', upload.single("image"), CategoryController.updatecategory)
router.post('/delete-category', CategoryController.deletecategory)
router.post('/category-list', CategoryController.categorylist)

router.post('/insert-subcategory', upload.single("image"), SubcategoryController.insertsubcategory)
router.post('/update-subcategory', upload.single("image"), SubcategoryController.updatesubcategory)
router.post('/subcategory-delete', SubcategoryController.subcategorydelete)
router.post('/subcategory-list', SubcategoryController.subcategorylist)

router.post('/insert-brand', upload.single("image"), BrandController.insertbrand)
router.post('/update-brand', upload.single("image"), BrandController.updatebrand)
router.post('/brand-delete', BrandController.branddelete)
router.post('/brand-list', BrandController.brandlist)

router.post('/insert-product', upload.single("image"), ProductController.insertproduct)
router.post('/update-product', upload.single("image"), ProductController.updateproduct)
router.post('/product-delete', ProductController.productdelete)
router.post('/product-list', ProductController.productlist)

router.post('/order-list', OrderController.orderlist)
router.post('/order-detail', OrderController.orderdetail)

module.exports = router