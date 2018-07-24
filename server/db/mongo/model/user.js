const mongoose = require('mongoose');

let UserShema = new mongoose.Schema({
  username: String,
  psw: String
})

mongoose.model('User', UserShema);