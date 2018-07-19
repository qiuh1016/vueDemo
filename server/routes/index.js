const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/api/goods', async (ctx, next) => {
  ctx.body = require('../../mocker/goods.json');
})

module.exports = router
