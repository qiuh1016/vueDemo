<template>
  <div class="container">
    <nav-bread>
      <li class="breadcrumb-item" aria-current="page"><a href="#/cart">Cart</a></li>
    </nav-bread>
    <table class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>ITEMS</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
          <th>TOTAL</th>
          <th>EDIT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartList" :key="index">
          <td><input type="checkbox"/></td>
          <td style="width: 110px;"><img class="cart" v-lazy="'/static/'+item.productImg"/></td>
          <td>{{item.productName}}</td>
          <td>{{item.productPrice}}元</td>
          <td>
            <a href="javascript:void(0)" @click="minus(index)">
              <span class="glyphicon glyphicon-minus" aria-hidden="true"/>
            </a>
            {{item.count}}
            <a href="javascript:void(0)" @click="plus(index)">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"/>
            </a>
          </td>
          <td>{{item.productPrice * item.count}}元</td>
          <td>
            <a href="javascript:void(0)" @click="deleteCart(index)">
              <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios';
import NavBread from '../components/NavBread';

export default {
  data() {
    return {
      result: '',
      cartList: [],
    };
  },
  components: {
    NavBread,
  },
  mounted() {
    this.getCart();
  },
  methods: {
    getCart() {
      axios.get('/api/cart').then((result) => {
        const res = result.data;
        if (res.code === 1) {
          this.cartList = res.cart;
        } else {
          // eslint-disable-next-line
          alert('未登陆');
        }
      });
    },
    plus(index) {
      this.cartList[index].count += 1;
      axios.post('/api/updateCartCount', { i: index, count: this.cartList[index].count });
    },
    minus(index) {
      if (this.cartList[index].count > 1) {
        this.cartList[index].count -= 1;
        axios.post('/api/updateCartCount', { i: index, count: this.cartList[index].count });
      }
    },
    deleteCart(index) {
      this.cartList.splice(index, 1);
      axios.post('/api/deleteCart', { i: index });
    },
  },
};
</script>
<style>
img.cart {
  width: 100px;
  height: 100px;
}
</style>
