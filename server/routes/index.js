const router = require('koa-router')()
const User = require('../db/mongo/model').User;

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/api/goods', async (ctx, next) => {
  console.log('请求商品列表');
  ctx.body = require('../../mocker/goods.json');
})

router.post('/api/login', (ctx, next) => {
  let username = ctx.request.body.username;
  let psw = ctx.request.body.psw;

  if (username == 'admin' && psw == 'admin') {
    console.log(`${username}登陆成功`)
    ctx.body = {
      code: 1,
      msg: '登录成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误'
    }
  }
})

router.get('/api/cart', async (ctx, next) => {
  ctx.body = require('../../mocker/cart.json');
})

router.get('/api/adduser', async (ctx, next) => {
  let username = ctx.query.username;
  let psw = ctx.query.psw;
  let user = new User({
    username,
    psw
  });
  let data = await user.save();
  ctx.body = data;
})

router.get('/user/:username', async (ctx, next) => {
  let username = ctx.params.username;
  try {
    let user = await User.findOne({ username }).exec();
    ctx.body = user;
  } catch (error) {
    ctx.body = error;
    console.log(error);
  }
})

module.exports = router
