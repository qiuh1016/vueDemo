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
          <td style="width: 110px;"><img class="cart" v-lazy="'/static/'+item.productImage"/></td>
          <td>{{item.productName}}</td>
          <td>{{item.price}}</td>
          <td>
            <button class="btn btn-primary">
              <span class="glyphicon glyphicon-minus" aria-hidden="true"/>
            </button>
            {{item.count}}
            <button class="btn btn-primary">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"/>
            </button>
          </td>
          <td>{{item.price * item.count}}</td>
          <td>
            <a href="#/cart"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>
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
        this.cartList = result.data;
      });
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
