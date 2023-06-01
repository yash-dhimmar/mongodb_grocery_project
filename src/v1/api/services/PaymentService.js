const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY)
const { User, Category, Subcategory, Add_card, Charges, Brand, Product, Review, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
class PaymentService {
  async createcustomer(body, firstname, lastname, email, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await User.findOne({
          user_id: user_id
        })
        if (data) {
          var customer = await stripe.customers.create({
            name: firstname.concat(lastname),
            email: email
          })
        }
        resolve(customer)
      } catch (error) {
        console.log("error=============>", error)
        return reject(error)
      }
    })
  }
  async addcard(body, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { user_stripe_id, card_Name, card_ExpYear, card_ExpMonth, card_Number, card_CVC, card_id } = body
        var data = await User.findOne({
          user_id: user_id
        })
        if (data) {
          var card_details = await stripe.tokens.create({
            card: {
              name: card_Name,
              number: card_Number,
              exp_year: card_ExpYear,
              exp_month: card_ExpMonth,
              cvc: card_CVC
            }
          })
        }
        var card = await stripe.customers.createSource(user_stripe_id, {
          source: `${card_details.id}`
        })
        console.log("card=========>", card_details.id)
        var data = await Add_card.create({
          card_Name: card_Name,
          card_ExpYear: card_ExpYear,
          card_ExpMonth: card_ExpMonth,
          card_Number: card_Number,
          card_CVC: card_CVC,
          user_id: user_id,
          user_stripe_id: user_stripe_id,
          source: card_details.id,
          card_id: card.id
        })
        console.log("data===========>", data)
        resolve({ card: card.id })
      } catch (error) {
        return reject(error)
      }
    })
  }
  async createcharge(body, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { user_stripe_id, card_id, amount } = body
        var data = await User.findOne({
          user_id: user_id
        })
        if (data) {
          var data2 = await stripe.charges.create({
            customer: user_stripe_id,
            card: card_id,
            amount: amount,
            currency: "INR"
          })
        }
        console.log("data2===========>", data2)
        var charge = await Charges.create({
          user_id: user_id,
          amount: amount,
          currency: "INR",
          date: new Date(),
          charge_id: data2.id
        })
        return resolve(data2)
      } catch (error) {
        return reject(error)
      }
    })
  }
}
module.exports = new PaymentService()