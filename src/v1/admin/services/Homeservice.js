const { User, Category, Subcategory, Brand, Product, Section_Brand, Section_Category, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const path = require('path')

class Homeservice {
  async addslider(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_Slider.create({
          image: req.file.filename,
          category_id: req.body.category_id,
          section_id: req.body.section_id
        })
        console.log("data==========>", data)
        resolve(data)
      } catch (error) {
        return reject(error)
      }
    })

  }
  async sliderdeleteproduct(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { slider_id } = body
        var detail = await Section_Slider.findOne({
          slider_id: slider_id
        })
        if (detail) {
          var data = await Section_Slider.deleteOne({ slider_id: slider_id })
          resolve()
        } else {
          var error = { message: "slider id not found plz enter valid id" }
          reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async sliderlist(body) {
    return new Promise(async (resolve, reject) => {
      try {
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
      } catch (error) {
        return reject(error)
      }

    })

  }
  async productslider(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { section_id, product_id } = body
        var data = await Section_Product.create({
          section_id: section_id,
          product_id: product_id
        })
        resolve(data)
      } catch (error) {
        return reject(error)
      }
    })

  }
  async deletesliderproductsection(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { section_product_id } = body
        var detail = await Section_Product.findOne({
          section_product_id: section_product_id
        })
        if (detail) {
          var data = await Section_Product.deleteOne({ section_product_id: section_product_id })
          resolve()
        } else {
          var error = { message: "section_product_id not found plz enter valid id" }
          reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async productsectionlist(body) {
    return new Promise(async (resolve, reject) => {
      try {
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
      } catch (error) {
        return reject(error)
      }
    })

  }
  async addbrandslider(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { section_id, brand_id } = body
        var data = await Section_Brand.create({
          section_id: section_id,
          brand_id: brand_id
        })
        resolve(data)
      } catch (error) {
        return reject(error)
      }
    })

  }
  async deletesliderbrandsection(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { section_product_id } = body
        var detail = await Section_Product.findOne({
          section_product_id: section_product_id
        })
        if (detail) {
          var data = await Section_Brand.deleteOne({ section_brand_id: section_brand_id })
          resolve()
        } else {
          var error = { message: "section_brand_id not found plz enter valid id" }
          reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async brandsectionlist(body) {
    return new Promise(async (resolve, reject) => {
      try {
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
      } catch (error) {
        return reject(error)
      }
    })

  }
  async addcategoryslider(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_Category.create({
          category_id: req.body.category_id,
          section_id: req.body.section_id,
          offer: req.body.offer
        })
        console.log("data==========>", data)
        resolve(data)
      } catch (error) {
        return reject(error)
      }
    })

  }
  async deleteslidercategorysection(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { section_category_id } = body
        var detail = await Section_Category.findOne({
          section_category_id: section_category_id
        })
        if (detail) {
          var data = await Section_Category.deleteOne({ section_category_id: section_category_id })
          resolve()
        } else {
          var error = { message: "section_category_id not found plz enter valid id" }
          reject(error)
        }
      } catch (error) {
        return reject(error)
      }
    })

  }
  async categorysectionlist(body) {
    return new Promise(async (resolve, reject) => {
      try {
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
      } catch (error) {
        return reject(error)
      }
    })
  }


}
module.exports = new Homeservice()

