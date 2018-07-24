const mongoose = require('mongoose');

let UserShema = new mongoose.Schema({
  username: String,
  psw: String,
  cart: [{
    productId: String,
    productName: String,
    productPrice: Number,
    count: Number,
    productImg: String
  }]
})

mongoose.model('User', UserShema);