const router = require('koa-router')()

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
module.exports = router
