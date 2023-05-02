const { User, Category, Subcategory, Brand, Product,Review, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
const promise = require('bluebird')
const ejs = require('ejs')
const path = require('path')
const moment = require('moment-timezone');
var mongoose = require('mongoose')
//const BaseService = require('./BaseService');
const {
  resolve
} = require('path')
const { reject } = require('bluebird')
const { deleteModel } = require('mongoose')

class UserService {
  async sendotp(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { mobilenumber } = body
        var otp = Math.floor(1000 + Math.random() * 9000);
        var user = await User.find({ mobilenumber: mobilenumber })
        if (user.length > 0) {
          await User.updateOne({ mobilenumber: mobilenumber }, { $set: { otp: otp } })
        } else {
          var user = await User.create({ mobilenumber: mobilenumber })
          var otp = Math.floor(1000 + Math.random() * 9000);
          if (user) {
            await User.updateOne({ mobilenumber: mobilenumber }, { $set: { otp: otp, is_registered: '1' } })
          }
        }
        resolve(otp)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async login(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { mobilenumber, otp } = body
        var mn = await User.find({ mobilenumber: mobilenumber })
        // console.log("mn======>", mn)
        if (mn.length > 0) {
          var otpdetail = await User.find({ mobilenumber: mobilenumber, otp: otp })
          if (otpdetail.length > 0) {
            console.log("otpdetail======>", otpdetail)
            return resolve(otpdetail)
          } else {
            var err = Error("invalid otp")
            reject(err)
          }
        } else {
          var err = Error("invalid mobile number")
          reject(err)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async update(body, mobilenumber) {
    try {
      let { firstname, lastname, email } = body
      return new Promise(async (resolve, reject) => {
        var emailcheck = await User.find({ email: email })
        for (let i = 0; i < emailcheck.length; i++) {
          if (emailcheck[i].email == email && emailcheck[i].mobilenumber == mobilenumber) {
            var update = await User.updateOne({ mobilenumber: mobilenumber }, { $set: { firstname: firstname, lastname: lastname, email: email } })
            if (update) {
              resolve(update);
            }
          } else {
            var error = Error("email already exit");
            reject(error);
          }
        }
        if (!emailcheck.length > 0) {
          var update = await User.updateOne({ mobilenumber: mobilenumber }, { $set: { firstname: firstname, lastname: lastname, email: email } })
          console.log("update2================>", update)
          if (update) {
            var uquery = await User.findOne({ mobilenumber: mobilenumber, is_registered: '1' })
            resolve(body);
          } else {
            var error = Error("not updated your data");
            reject(error);
          }
        }
      })
    } catch (error) {
      var err = { message: error.message }
      return reject(err)
    }
  }
  async category(res) {
    try {
      return new Promise(async (resolve, reject) => {
        const category = await Category.aggregate([
          {
            $lookup:
            {
              from: "subcategory",
              localField: "category_id",
              foreignField: "category_id",
              as: "subcategory"
            }
          }
        ])
        console.log("category===========>", category)
        resolve(category);
      })
    } catch (error) {
      return reject(error)
    }
  }
  async resendotp(body) {
    let { mobilenumber } = body
    try {
      return new Promise(async (resolve, reject) => {
        var data = await User.find({ mobilenumber: mobilenumber, is_registered: '1' })
        console.log("data============>", data)
        if (data.length > 0) {
          var otp = Math.floor(1000 + Math.random() * 9000);
          var update = await User.updateOne({ mobilenumber: mobilenumber }, { $set: { otp: otp } })
          console.log("data2============>", update)
          return resolve(otp)
        } else {
          var err = Error("please register mobile number")
          return reject(err);
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async product(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { subcategory_id } = body
        var subcategory = await Subcategory.find({ subcategory_id: subcategory_id })
        if (subcategory.length > 0) {
          var products = await Product.find({ subcategory_id: subcategory_id })
          var brands = await Brand.find({ subcategory_id: subcategory_id })
          return resolve({ product_list: products, brand_list: brands });
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async search(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { search } = body
        var searching = search.trim()
        // if ('filter' in body) {
        //   let filterCondition = await this.filterBy(filter);
        // }
        var data1 = await Product.aggregate([{ $match: { productname: new RegExp(searching) } }])
        resolve(data1)
        console.log("data1=========>", data1)
        //    filterCondition = await this.filterBy(filter);
        //  resolve(data1.concat(filterCondition))
      })
    } catch (error) {
      return reject(error)
    }
  }
  async filterBy(filter, brand_id) {

    if ('brands' in filter) {
      let brandIds = filter.brands.toString();

    }
    if ('price' in filter && filter.price.length > 0) {
      let minPrice = filter.price.min;
      let maxPrice = filter.price.max;
      whereCondition = whereCondition + ` AND p.price >= (${minPrice}) AND p.price <= (${maxPrice})`;
    }
    if ('discount' in filter && filter.discount != null && filter.discount != '') {
      let minDiscount, maxDiscount;
      switch (filter.discount) {
        case 1:
          minDiscount = 0;
          maxDiscount = 5;
          break;
        case 2:
          minDiscount = 20;
          maxDiscount = 30;
          break;
        case 3:
          minDiscount = 30;
          maxDiscount = 50;
          break;
      }
      whereCondition = whereCondition + ` AND p.discount_price >= (${minDiscount}) AND p.discount_price < (${maxDiscount})`;
    }
    if ('sortBy' in filter) {
      let orderBy;
      switch (filter.sortBy) {
        case 1:
          orderBy = ` p.price ASC`;
          break;
        case 2:
          orderBy = ` p.price DESC`;
          break;
      }
    }

    var data = await Product.aggregate([
      { $match: { brand_id: mongoose.Types.ObjectId(brand_id) } },
      { $match: { $gt: "minPrice", $lt: "maxPrice" } },
      // { $match: { mindiscount: filter.discount } },
      // { $match: { orderBy: filter.sortBy } }


    ])
    return (data)
    //return { whereCondition: whereCondition, orderBy: orderBy }
  }
  async addtocart(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { product_id, quantity } = body
        var data = await Addcart.find({ product_id: product_id, user_id: user_id })
        if (data.length > 0) {
          var data1 = await Addcart.updateOne({ product_id: product_id, user_id: user_id }, { $set: { quantity: quantity } })
          resolve(data1[0])
        } else {
          var check = await Product.find({ product_id: product_id })
          if (check.length > 0) {
            if (check[0].stock == 1) {
              var ins = await Addcart.create({ user_id: user_id, product_id: product_id, quantity: quantity })
              console.log("ins======================>", ins)
              resolve(ins[0])
            } else {
              resolve("stock is not available")
            }
          } else {
            var err = { message: "id not found please enter a valid product_id" }
            reject(err)
          }
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async deletecartproduct(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { product_id } = body
        var data = await Addcart.find({ product_id: product_id })
        if (data.length > 0) {
          var remove = await Addcart.deleteOne({ product_id: product_id, user_id: user_id })
          if (remove) {
            resolve(remove[0])
          }
        } else {
          var err = { message: "product id not found please enter valid product id" }
          reject(err)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async wishlist(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { product_id } = body
        var product = await Product.find({ product_id: product_id })
        if (product.length > 0) {
          var data = await Wishlist.find({ product_id: product_id, user_id: user_id })
          if (data.length > 0) {
            var del = await Wishlist.deleteOne({ product_id: product_id, user_id: user_id })
            var alldel = { message: "product deleted from wishlist successfully" }
            console.log("alldel=================>", alldel)
            resolve(alldel)
            if (del) {
              var flag = await Product.updateOne({ product_id: product_id }, { $set: { flag: '0' } })
            }
          } else {
            var insert = await Wishlist.create({ product_id: product_id, user_id: user_id })
            var allinsert = { message: "product inserted to wishlist successfully" }
            resolve(allinsert)
            console.log("allinsert=================>", allinsert)
            if (insert) {
              var flag = await Product.updateOne({ product_id: product_id }, { $set: { flag: '1' } });
              console.log("----->>flaginsert", flag)
            }
          }
        } else {
          var err = { message: "product id not found please enter valid product id" }
          reject(err)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async getwishlist(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        const fetch = await Wishlist.aggregate([
          { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
          {
            $lookup:
            {
              from: "product",
              localField: "product_id",
              foreignField: "product_id",
              as: "wishlist"
            }
          },
          {
            $project: {
              "_id": 0,
              wishlist: { _id: 1, image: 1, productname: 1, variation: 1, price: 1, discount: 1 }
            }
          }
        ])
        let result = fetch.map(({ wishlist }) => wishlist[0])

        if (result) {
          return resolve(result)
        }
      })
    } catch (error) {
      return promise.reject(error)
    }
  }
  async brandsfilter(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Brand.find({})
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async brandsearch(body) {
    try {
      return new Promise(async (resolve, reject) => {
        let { search } = body
        var searching = search.trim()
        var data = await Brand.find({ name: { $regex: searching } })
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async discount() {
    try {
      return new Promise(async (resolve, reject) => {
        var discount = {
          1: "upto 5%",
          2: "5% - 10%",
          3: "10%-15%",
          4: "15%-25%",
          5: "morthan 25%"
        }
        return resolve(discount);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async sortby() {
    try {
      return new Promise(async (resolve, reject) => {
        var sortby = {
          1: "popularity",
          2: "Price-Low to High",
          3: "Price-High to Low",
          4: "Alphabetical",
          5: "Rupee saving-High to Low",
          6: "Rupee saving-Low to High",
          7: "%off-High to Low"
        }
        return resolve(sortby);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async pricerange(body) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Product.aggregate([
          {
            "$group": {
              "_id": null,
              "maxprice": { "$max": "$price" },
              "minprice": { "$min": "$price" }
            }
          }
        ])
        return resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async addaddress(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { type, home_details, landmark, recipient_name } = body
        var data = await Address.find({ user_id: user_id, type: type })
        if (!data.length > 0) {
          var detail = await Address.create({ user_id: user_id, type: type, home_details: home_details, landmark: landmark, recipient_name: recipient_name })
          if (detail) {
            return resolve(detail)
          }
        } else {
          var err = { message: "user alredy insert address" }
          return reject(err)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async deleteaddress(body, user_id) {
    try {
      return new Promise(async (resolve, rejeect) => {
        let { address_id } = body
        var data = await Address.find({ user_id: user_id, address_id: address_id })
        console.log("data========>", data)
        if (data.length > 0) {
          var del = await Address.deleteOne({ user_id: user_id, address_id: address_id })
          if (del) {
            return resolve(del[0])
          }
        } else {
          var err = { message: "id not found please enter a valid id" }
          return resolve(err)
        }
      })
    } catch (error) {
      return reject(error)
    }
  }
  async addresslist(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Address.find({ user_id: user_id })
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async homepage() {
    return new Promise(async (resolve, reject) => {
      try {
        var final = []
        var sum = 0
        const section = await Section.find()
        for (let i = 0; i < section.length; i++) {
          var imageslider = await Section.aggregate([
            { $match: { section_id: section[i].section_id } },
            {
              // slider images
              $lookup:
              {
                from: "section_slider",
                localField: "section_id",
                foreignField: "section_id",
                as: "section_slider",
                pipeline: [
                  {
                    $lookup: {
                      from: "category",
                      localField: "category_id",
                      foreignField: "category_id",
                      as: "sectioncategorys"
                    }
                  },
                  {
                    $unwind: '$sectioncategorys',
                  },
                  {
                    $group: {
                      _id: '$_id',
                      category_id: {
                        $first: '$sectioncategorys.category_id',
                      },
                      category_name: {
                        $first: '$sectioncategorys.name',
                      },
                      image: {
                        $first: '$sectioncategorys.image',
                      },
                      section_id: {
                        $first: '$section_id',
                      },
                      status: {
                        $first: '$sectioncategorys.status',
                      }
                    }
                  }
                ]
              }

            },
            //  category section
            {
              $lookup:
              {
                from: "section_category",
                localField: "section_id",
                foreignField: "section_id",
                as: "section_category",
                pipeline: [
                  {
                    $lookup: {
                      from: "category",
                      localField: "category_id",
                      foreignField: "category_id",
                      as: "sectioncategorys"
                    }
                  },
                  {
                    $unwind: '$sectioncategorys',
                  },
                  {
                    $group: {
                      _id: '$_id',
                      category_id: {
                        $first: '$sectioncategorys.category_id',
                      },
                      category_name: {
                        $first: '$sectioncategorys.name',
                      },
                      image: {
                        $first: '$sectioncategorys.image',
                      },
                      offer: {
                        $first: '$offer',
                      },
                      section_id: {
                        $first: '$section_id',
                      },
                      status: {
                        $first: '$sectioncategorys.status',
                      }
                    }
                  }
                ]
              }
            },
            // - product  section
            {
              $lookup:
              {
                from: "section_product",
                localField: "section_id",
                foreignField: "section_id",
                as: "section_product",
                pipeline: [
                  {
                    $lookup: {
                      from: "product",
                      localField: "product_id",
                      foreignField: "product_id",
                      as: "sectionproduct"
                    }
                  },
                  {
                    $unwind: '$sectionproduct',
                  },
                  {
                    $group: {
                      _id: '$_id',
                      product_id: {
                        $first: '$sectionproduct.product_id',
                      },
                      category_id: {
                        $first: '$sectionproduct.category_id',
                      },
                      subcategory_id: {
                        $first: '$sectionproduct.subcategory_id',
                      },
                      brand_id: {
                        $first: '$sectionproduct.brand_id',
                      },
                      section_id: {
                        $first: '$section_id',
                      },
                      description: {
                        $first: '$sectionproduct.description',
                      },
                      variation: {
                        $first: '$sectionproduct.variation',
                      },
                      price: {
                        $first: '$sectionproduct.price',
                      },
                      discount_price: {
                        $first: '$sectionproduct.discount_price',
                      },
                      stock: {
                        $first: '$sectionproduct.stock',
                      },
                      image: {
                        $first: '$sectionproduct.image',
                      }
                    }
                  }
                ]
              },
            },
            //- brand section
            {
              $lookup:
              {
                from: "section_brand",
                localField: "section_id",
                foreignField: "section_id",
                as: "sectionbrand",
                pipeline: [{
                  $lookup: {
                    from: "brand",
                    localField: "brand_id",
                    foreignField: "brand_id",
                    as: "sectionbrand"
                  }
                },
                {
                  $unwind: '$sectionbrand',
                },
                {
                  $group: {
                    _id: '$_id',
                    image: {
                      $first: '$sectionbrand.image',
                    },
                    name: {
                      $first: '$sectionbrand.name',
                    },
                    status: {
                      $first: '$sectionbrand.status',
                    },
                    category_id: {
                      $first: '$sectionbrand.category_id',
                    },
                    subcategory_id: {
                      $first: '$sectionbrand.subcategory_id',
                    },
                    brand_id: {
                      $first: '$sectionbrand.brand_id',
                    },
                    section_id: {
                      $first: '$section_id',
                    }
                  }
                }
                ]
              }
            }
          ])
          console.log("imageslider===============>", imageslider)
          var object = Object.assign({}, ...imageslider);
          final.push(object)
        }
        return resolve(final)
      } catch (error) {
        return reject(error)
      }
    })
  }
  async cartlist(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { product_id, quantity } = body
        if ('quantity' && 'product_id' in body) {
          var data = await Addcart.updateOne({ user_id: user_id, product_id: product_id }, { $inc: { quantity: quantity, "metrics.orders": 1 } })
        }
        var del = await Addcart.deleteOne({ quantity: '0' })
        const fetch = await Addcart.aggregate([
          { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
          {
            $lookup:
            {
              from: "product",
              localField: "product_id",
              foreignField: "product_id",
              as: "add_to_cart"
            }
          },
          {
            $project: {
              "_id": 0,
              add_to_cart: { _id: 1, image: 1, productname: 1, variation: 1, price: 1, discount: 1 }
            }
          }
        ])
        let result = fetch.map(({ add_to_cart }) => add_to_cart[0])
        let finalcart = await this.finalcart(user_id, body)
        resolve(result.concat(finalcart))
      })
    } catch (error) {
      return reject(error)
    }
  }
  async finalcart(user_id, body) {
    let { coupan_id } = body
    var final = [];
    var mainprice = 0
    var subtotal = 0

    /*mainprice object*/
    var total = await Addcart.aggregate([
      { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
      {
        $lookup:
        {
          from: "product",
          localField: "product_id",
          foreignField: "product_id",
          as: "productlist"
        },
      },
      {
        $unwind: '$productlist'
      },
      {
        $group: {
          _id: '$_id',
          quantity: {
            $first: '$quantity',
          },
          price: {
            $first: '$productlist.price',
          },
          discount_price: {
            $first: '$productlist.discount_price',
          },
          discount: {
            $first: '$productlist.discount'
          },
          finalprice: {
            $sum: { $multiply: ["$quantity", "$productlist.price"] }
          }
        }
      },
    ])
    for (let i = 0; i < total.length; i++) {
      mainprice = mainprice + total[i].finalprice
    }
    for (let k = 0; k < total.length; k++) {
      total[k].price = total[k].price * total[k].quantity
      total[k].discount = total[k].discount * total[k].quantity
      total[k].discount_price = total[k].discount_price * total[k].quantity
      var discount = total[k].price * total[k].discount / 100
      if (discount < total[k].discount_price) {
        var text = total[k].price - discount
      } else {
        var text = total[k].price - total[k].discount_price
        console.log("text===========>", text)
      }
      final.push(text)
      console.log("final===========>", final)
    }
    for (let j = 0; j < final.length; j++) {
      subtotal = subtotal + final[j]
    }
    console.log("sum2==========>", subtotal)
    /*tax calculation for the total price */
    let tax = await Setting.find({
    }, {
      "tax": 1
    });
    var tax2 = tax[0].tax
    var tax3 = subtotal * tax2 / 100

    /* delivery charge object */
    let charge = await Setting.find({}, {
      "free_delivery_upto": 1
    });
    var delivery = charge[0].free_delivery_upto
    console.log("delivery============>", delivery)

    if (mainprice > delivery) {
      var result = "free"
    } else {
      var data3 = await Setting.find({}, {
        "delivery_charge": 1
      });
      var result2 = data3[0].delivery_charge
    }
    /* grand total object */
    if (result) {
      var data = subtotal + tax3
    } else {
      var grandtotal2 = subtotal + tax3 + result2
    }
    /* total saving object*/
    var saving = mainprice - subtotal

    /* coupen management */
    const coupan = await Coupan_management.find({ coupan_id: coupan_id })
    if (coupan.length > 0) {
      const d = new Date()
      var currentdate = moment(coupan[0].start_date)
      var lastdate = moment(coupan[0].end_date)
      if (currentdate.isSameOrBefore(lastdate)) {
        if (mainprice > coupan[0].min_price) {
          data = data - coupan[0].discount_price
          grandtotal2 = grandtotal2 - coupan[0].discount_price
          saving = saving + coupan[0].discount_price
          console.log("result2============>", saving)
        }
        else {
          return (`total is not greter than '${coupan[0].min_price}' than coupan is not used`)
        }
      }
      else {
        return ("coupen is expired")
      }
    }
    let cart = {
      main_price: mainprice,
      sub_total: subtotal,
      tax: tax3,
      delivery_charge: result || result2,
      grand_total: data || grandtotal2,
      totalsaving: saving
    }
    return cart;
  }
  async checkout(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { address_id, coupan_id } = body
        var address = await Address.find({ user_id: user_id, address_id: address_id })
        var cod = "CASH ON DELIEVERY"
        var cart = await this.finalcart(user_id, body)
        const d = new Date()
        var currentdate = moment(d)
        var check = await Addcart.find({ user_id: user_id })

        if (check.length > 0) {
          let insert = await Orders.create({
            user_id: user_id,
            address_id: address[0].address_id,
            date: currentdate,
            sub_total: cart.sub_total,
            delivery_charge: cart.delivery_charge,
            grand_total: cart.grand_total,
            paymenttype: cod,
            status: 1,
            coupan_id: coupan_id
          })
          if (insert) {
            var index = await Orders.aggregate([
              { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
              {
                $lookup: {
                  from: "add_to_cart",
                  localField: "user_id",
                  foreignField: "user_id",
                  as: "cartlist",
                  pipeline: [
                    { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
                    {
                      $lookup: {
                        from: "product",
                        localField: "product_id",
                        foreignField: "product_id",
                        as: "products"
                      }
                    }, {
                      $unwind: '$products',
                    }, {
                      $group: {
                        _id: '$product_id',
                        product_id: {
                          $first: '$products.product_id',
                        },
                        quantity: {
                          $first: '$quantity',
                        },
                        price: {
                          $first: '$products.price',
                        },
                        discount_price: {
                          $first: '$products.discount_price',
                        },
                      }
                    }]
                }
              },
              {
                $project: {
                  cartlist: {
                    _id: 1,
                    product_id: 1,
                    quantity: 1,
                    price: 1,
                    discount_price: 1

                  }
                }
              },
            ])
            for (let i = 0; i < index.length; i++) {
              var dataset = index[i].cartlist
              var order_id = index[i]._id
              for (let j = 0; j < dataset.length; j++) {
                var orderitem = await Order_item.create({
                  product_id: dataset[j].product_id,
                  order_id: order_id,
                  price: dataset[j].price,
                  discount_price: dataset[j].discount_price,
                  quantity: dataset[j].quantity
                })
              }

            }
          }
        }
        var cartlist = {
          item_total: cart,
          delieverytype: cod
        }
        return resolve(cartlist)
      })
    } catch (error) {
      return reject(error)
    }
  }
  async orderlist(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Address.aggregate([
          { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
          {
            $lookup:
            {
              from: "orders",
              localField: "address_id",
              foreignField: "address_id",
              as: "orders",
            }
          },
          {
            $unwind: '$orders',
          },
          {
            $group: {
              _id: '$_id',
              date: {
                $first: '$orders.date',
              },
              order_id: {
                $first: '$orders.order_id',
              },
              status: {
                $first: '$orders.status'
              },
              Total_payment: {
                $first: '$orders.grand_total'
              },
              delivered_to: {
                $first: '$type'
              },
            }
          }
        ])
        console.log("data==============>", data)
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }

  async orderdetail(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { order_id } = body
        var data = await Address.aggregate([
          { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
          {
            $lookup:
            {
              from: "orders",
              localField: "address_id",
              foreignField: "address_id",
              as: "orders",
            }
          },
          {
            $unwind: '$orders',
          },
          {
            $group: {
              _id: '$_id',
              order_id: {
                $first: '$orders.order_id',
              },
              Total_payment: {
                $first: '$orders.grand_total'
              },
              date: {
                $first: '$orders.date',
              },
              home_details: {
                $first: '$home_details'
              },
              landmark: {
                $first: '$landmark'
              },
            }
          }
        ])
        var items = await Order_item.aggregate([
          // { $match: { order_id: mongoose.Types.ObjectId(order_id) } },
          {
            $lookup:
            {
              from: "product",
              localField: "product_id",
              foreignField: "product_id",
              as: "products",
            }
          },
          {
            $unwind: '$products',
          },
          {
            $group: {
              _id: '$_id',
              image: {
                $first: '$products.image',
              },
              productname: {
                $first: '$products.productname'
              },
              price: {
                $first: '$products.price',
              },
              quantity: {
                $first: '$quantity'
              },
            }
          }
        ])
        data[0].item = items
        console.log("items=================>", items)
        var bill = await Orders.find({ order_id: order_id },
          {
            "grand_total": 1,
            "sub_total": 1,
            "delivery_charge": 1
          })
        console.log("bill=================>", bill)
        data[0].bill_details = bill
        resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  }

  async addreview (body,user_id){
    try{
      return new Promise(async(resolve,reject)=>{
        let {product_id,review_star} = body
        var user= await User.find({user_id:user_id})
        if(user.length>0){
          var product= await Product.find({product_id:product_id})
          if (product.length>0){
            var review = await Review.create({user_id:user_id,product_id:product_id,review_star:review_star})
            resolve(review)
          }else{
            var error =  {message:"product id not found please enter a valid product_id"}
            resolve (error)
          }
        }
        

      })

    }catch(error){
      return reject(error)

    }
  }

}
module.exports = new UserService()





















