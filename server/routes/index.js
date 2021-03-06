const router = require('koa-router')()
const User = require('../db/mongo/model').User;

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/test', async (ctx, next) => {
  await ctx.render('../server/views/index.pug', {
    title: '123'
  })
})

router.get('/api/checkLogin', async (ctx, next) => {
  if (ctx.session.username) {
    ctx.body = {
      code: 1,
      msg: '已登陆',
      username: ctx.session.username
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '未登陆'
    }
  }
})

router.post('/api/login', async (ctx, next) => {
  let username = ctx.request.body.username;
  let psw = ctx.request.body.psw;
  let params = { username, psw };
  let user = await User.findOne(params).exec();
  if (user) {
    ctx.session.username = username;
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

router.post('/api/logout', async (ctx, next) => {
  // ctx.session.username = null;
  delete ctx.session.username;
  ctx.body = {
    code: 1,
    msg: '退出成功'
  }
})

router.get('/api/goods', async (ctx, next) => {
  ctx.body = require('../../mocker/goods.json');
})

router.get('/api/cart', async (ctx, next) => {
  if (ctx.session.username) {
    let user = await User.findOne({ username: ctx.session.username }).exec();
    ctx.body = {
      code: 1,
      msg: '获取成功',
      cart: user.cart
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '未登陆'
    }
  }
})

router.post('/api/addCart', async (ctx, next) => {
  let productId = ctx.request.body.productId;
  if (ctx.session.username) {
    let user = await User.findOne({ username: ctx.session.username }).exec();
    let toAddProduct;
    let carts = user.cart;
    let products = require('../../mocker/goods.json').result;
    products.forEach(product => {
      if (product.productId == productId) {
        toAddProduct = product;
      }
    });

    if (carts) {
      let hasInCart = false;
      carts.forEach(cart => {
        if (cart.productId == productId) {
          cart.count++;
          hasInCart = true;
        }
      });

      if (!hasInCart) {
        toAddProduct.count = 1;
        carts.push(toAddProduct);
      }
    } else {
      carts = [];
      toAddProduct.count = 1;
      carts.push(toAddProduct);
    }

    await user.save();

    ctx.body = {
      code: 1,
      msg: '添加成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '未登陆'
    }
  }
})

router.post('/api/deleteCart', async (ctx, next) => {
  let index = ctx.request.body.i;

  let username = ctx.session.username;
  let user = await User.findOne({ username }).exec();

  if (index instanceof Array) {
    for (let i = index.length - 1; i >= 0; i--) {
      user.cart.splice(i, 1);
    }
  } else {
    user.cart.splice(index, 1);
  }
  await user.save();
  ctx.body = {
    code: 1,
    msg: '更新成功'
  }
})

router.post('/api/updateCartCount', async (ctx, next) => {
  let i = ctx.request.body.i;
  let count = ctx.request.body.count;
  let username = ctx.session.username;

  let user = await User.findOne({ username }).exec();

  user.cart[i].count = count;
  await user.save();

  ctx.body = {
    code: 1,
    msg: '更新成功'
  }
})

router.get('/api/address', async (ctx, next) => {
  let username = ctx.session.username;
  if (username) {
    let user = await User.findOne({ username }).exec();
    let addressList = user.addressList;
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: addressList || []
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '未登陆'
    }
  }
})

router.post('/api/address/add', async (ctx, next) => {
  let username = ctx.session.username;
  if (username) {
    let name = ctx.request.body.name;
    let phone = ctx.request.body.phone;
    let address = ctx.request.body.address;
    let tag = ctx.request.body.tag;
    let isDefault = ctx.request.body.isDefault;
    let description = ctx.request.body.description;
    console.log(name);

    let user = await User.findOne({ username }).exec();
    if (!user.addressList) user.addressList = [];
    user.addressList.push({
      name, phone, address, tag, isDefault, description
    })
    await user.save();
    // todo default 操作
    ctx.body = {
      code: 1,
      msg: '地址添加成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '未登陆'
    }
  }
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