const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://127.0.0.1:27017/koa2',
  {
    poolSize: 20,
    useNewUrlParser: true
  },
  (err) => {
    if (err) {
      console.log(err);
      process.exit(0);
    }
  }
);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongodb connected successfully');
});

require('./user');

module.exports = {
  User: mongoose.model('User')
}