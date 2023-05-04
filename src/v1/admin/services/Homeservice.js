const { User, Category, Subcategory, Brand, Product, Section_Brand, Section_Category, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')

class Homeservice {
  async addslider(req) {
    try {
      return new Promise(async (resolve, reject) => {

        var data = await Section_Slider.create({
          image: req.file.filename,
          category_id: req.body.category_id,
          section_id: req.body.section_id

        })
        console.log("data==========>", data)
        resolve(data)

      })
    } catch (error) {
      return reject(error)
    }
  }
  async sliderdeleteproduct(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { slider_id } = body
        var data = await Section_Slider.deleteOne({ slider_id: slider_id })
        if (data) {
          resolve()
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async sliderlist(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var slider = await Section_Slider.aggregate([

          {
            $lookup:
            {
              from: "category",
              localField: "category_id",
              foreignField: "category_id",
              as: "categories"
            },
          },
          {
            $unwind: '$categories'
          },
          {
            $group: {
              _id: '$_id',
              category_id: {
                $first: '$categories.category_id'
              },
              category_name: {
                $first: '$categories.category_name',
              },
              image: {
                $first: { $concat: ['http://localhost:4444/uploads/', "$categories.image"] },
              },
            }
          },
        ])
        resolve(slider)

      })
    } catch (error) {
      return reject(error)
    }
  }
  async productslider(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { section_id, product_id } = body
        var data = await Section_Product.create({
          section_id: section_id,
          product_id: product_id
        })
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async deletesliderproductsection(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { section_product_id } = body
        var data = await Section_Product.deleteOne({ section_product_id: section_product_id })
        if (data) {
          resolve()
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async productsectionlist(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var user = await Section_Product.aggregate([

          {
            $lookup:
            {
              from: "product",
              localField: "product_id",
              foreignField: "product_id",
              as: "products"
            },
          },
          {
            $unwind: '$products'
          },
          {
            $group: {
              _id: '$_id',

              productname: {
                $first: '$products.productname',
              },
              category_id: {
                $first: '$products.category_id'
              },
              subcategory_id: {
                $first: '$products.subcategory_id'
              },
              image: {
                $first: { $concat: ['http://localhost:4444/uploads/', "$products.image"] },
              },
            }
          },
        ])
        resolve(user)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async addbrandslider(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { section_id, brand_id } = body
        var data = await Section_Brand.create({
          section_id: section_id,
          brand_id: brand_id
        })
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async deletesliderbrandsection(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { section_brand_id } = body
        var data = await Section_Brand.deleteOne({ section_brand_id: section_brand_id })
        if (data) {
          resolve()
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async brandsectionlist(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var brand = await Section_Brand.aggregate([

          {
            $lookup:
            {
              from: "brand",
              localField: "brand_id",
              foreignField: "brand_id",
              as: "brands"
            },
          },
          {
            $unwind: '$brands'
          },
          {
            $group: {
              _id: '$_id',
              brand_id: {
                $first: '$brands.brand_id'
              },
              name: {
                $first: '$brands.name',
              },
              category_id: {
                $first: '$brands.category_id'
              },
              subcategory_id: {
                $first: '$brands.subcategory_id'
              },
              image: {
                $first: { $concat: ['http://localhost:4444/uploads/', "$brands.image"] },
              },
            }
          },
        ])
        resolve(brand)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async addcategoryslider(req) {
    try {
      return new Promise(async (resolve, reject) => {

        var data = await Section_Category.create({
          category_id: req.body.category_id,
          section_id: req.body.section_id,
          offer: req.body.offer
        })
        console.log("data==========>", data)
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async deleteslidercategorysection(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { section_category_id } = body
        var data = await Section_Category.deleteOne({ section_category_id: section_category_id })
        if (data) {
          resolve()
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async categorysectionlist(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var category = await Section_Category.aggregate([

          {
            $lookup:
            {
              from: "category",
              localField: "category_id",
              foreignField: "category_id",
              as: "categories"
            },
          },
          {
            $unwind: '$categories'
          },
          {
            $group: {
              _id: '$_id',
              category_id: {
                $first: '$categories.category_id'
              },
              category_name: {
                $first: '$categories.category_name',
              },
              image: {
                $first: { $concat: ['http://localhost:4444/uploads/', "$categories.image"] },
              },
            }
          },
        ])
        resolve(category)

      })
    } catch (error) {
      return reject(error)
    }
  }


}
module.exports = new Homeservice()

