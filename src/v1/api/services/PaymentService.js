const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY)
const { User, Category, Subcategory, Payment, Brand, Product, Review, Addcart, Orders, Order_item, Wishlist, Address, Setting, Coupan_management, Section, Section_Slider, Section_Product, conn, UserDeviceToken } = require('../../../data/models/index')
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
        var insert = await Payment.create({
          user_stripe_id: customer.id,
          user_id: user_id
        })
        resolve(customer)
      } catch (error) {
        console.log("error=============>", error)
        return reject(error)
      }
    })
  }

  async addcard(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { user_stripe_id, card_Name, card_ExpYear, card_ExpMonth, card_Number, card_CVC, card_id } = body
        var card_details = await stripe.tokens.create({
          card: {
            name: card_Name,
            number: card_Number,
            exp_year: card_ExpYear,
            exp_month: card_ExpMonth,
            cvc: card_CVC,

          }
        })
        var card = await stripe.customers.createSource(user_stripe_id, {
          source: `${card_details.id}`
        })
        console.log("card=========>", card_details.id)
        await Payment.updateOne({ user_stripe_id: user_stripe_id },
          {
            $set: {
              card_Name: card_Name,
              card_ExpYear: card_ExpYear,
              card_ExpMonth: card_ExpMonth,
              card_Number: card_Number,
              card_CVC: card_CVC,
              card_id: card.id,
              source: card_details.id
            }
          })
        resolve({ card: card.id })


      } catch (error) {
        return reject(error)
      }
    })
  }

  async createcharge(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { user_stripe_id, card_id, amount } = body
       
          var data2 = await stripe.charges.create({
            customer: user_stripe_id,
            card: card_id,
            amount: amount,
            currency: "INR"
          })
          await Payment.updateOne({ user_stripe_id: user_stripe_id }, { $set: { amount: amount } })
        return resolve(data2)

      } catch (error) {
        return reject(error)
      }
    })
  }
}
module.exports = new PaymentService()