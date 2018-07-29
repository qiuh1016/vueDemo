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
  }],
  addressList: [{
    name: String,
    phone: String,
    address: String,
    tag: String,
    isDefault: Boolean,
    description: String
  }]
})

mongoose.model('User', UserShema);