<template>
  <el-container>
    <el-header>
      <nav-bread>
        <li class="breadcrumb-item" aria-current="page"><a href="#/cart">Cart</a></li>
      </nav-bread>
    </el-header>
    <el-main class="container">
      <!-- START 购物车列表 -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>PIC</th>
            <th>ITEMS</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartList" :key="index">
            <td><input type="checkbox" @click="checkCart(index)" name="cart"></td>
            <td style="width: 110px;">
              <img class="cart" v-lazy="'/static/'+item.productImg"
                :key="'/static/'+item.productImg"/>
            </td>
            <td>{{item.productName}}</td>
            <td>{{item.productPrice}}元</td>
            <td>
              <el-input-number v-model="item.count"
                @change="((value) => handleCountChange(value, index))"
                :min="1" :max="99" label="描述文字"></el-input-number>
            </td>
            <td style="vertical-align: center!important;">{{item.productPrice * item.count}}元</td>
            <td>
              <a href="javascript:void(0)" @click="deleteCart(index)">
                <i class="el-icon-delete"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- END 购物车列表 -->
    </el-main>
    <el-footer class="container">
      <!-- START 操作栏 -->
      <div class="input-group">
        <span class="input-group-addon">
          <input type="checkbox" @click="checkAll()" id="checkBoxAll">
        </span>
        <a class="input-group-addon" href="javascript:void(0);"
          @click="deleteSelected">Delete Selected</a>
        <input type="text" class="form-control text-right" readonly
          v-bind:value="`Total: ${totalPrice}元`">
        <span class="input-group-addon" id="basic-addon2">
          <a href="javascript:void(0);" @click="checkout">CHECKOUT</a>
        </span>
      </div>
      <!-- END 操作栏 -->
    </el-footer>
  </el-container>
</template>
<script>
import axios from 'axios';
import NavBread from '../components/NavBread';

export default {
  data() {
    return {
      result: '',
      cartList: [],
      totalPrice: 0,
      allChecked: false,
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
          this.cartList.forEach((cart, index) => {
            this.cartList[index].checked = false;
          });
        } else {
          // eslint-disable-next-line
          alert('未登陆');
        }
      });
    },
    deleteCart(index) {
      axios.post('/api/deleteCart', { i: index });
      if (index instanceof Array) {
        for (let i = index.length - 1; i >= 0; i -= 1) {
          this.cartList.splice(i, 1);
        }
      } else {
        this.cartList.splice(index, 1);
      }
      this.recheckCart();
      this.calTotal();
    },
    checkCart(index) {
      this.cartList[index].checked = !this.cartList[index].checked;
      this.calTotal();
      // all check 检测
      this.allChecked = true;
      this.cartList.forEach((cart) => {
        this.allChecked = cart.checked && this.allChecked;
      });
      $('#checkBoxAll').prop('checked', this.allChecked);
    },
    checkAll() {
      const that = this;
      this.allChecked = !this.allChecked;
      // eslint-disable-next-line
      $('input[name=cart]').each(function () {
        $(this).prop('checked', that.allChecked);
      });
      this.cartList.forEach((cart, index) => {
        this.cartList[index].checked = this.allChecked;
      });
      this.calTotal();
    },
    calTotal() {
      let price = 0;
      this.cartList.forEach((cart) => {
        if (cart.checked) price += cart.count * cart.productPrice;
      });
      this.totalPrice = price;
    },
    checkout() {
      let canCheck = false;
      this.cartList.forEach((cart) => {
        if (cart.checked) canCheck = true;
      });
      if (canCheck) {
        this.$router.push({
          path: '/address',
        });
      }
    },
    deleteSelected() {
      const deleteArr = [];
      $('input[name=cart]').each((i, obj) => {
        if ($(obj).is(':checked')) {
          deleteArr.push(i);
        }
      });
      this.deleteCart(deleteArr);
      this.recheckCart();
    },
    handleCountChange(value, index) {
      axios.post('/api/updateCartCount', { i: index, count: value });
      this.calTotal();
    },
    recheckCart() {
      const $input = $('input[name=cart]');
      this.cartList.forEach((cart, i) => {
        if ($input instanceof Array) {
          $input[i].prop(cart.checked);
        } else {
          $input.prop(cart.checked);
        }
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
td {
  vertical-align: center!important;
}
input.form-control.text-center{
  text-align: center;
}
input.form-control.text-right {
  text-align: right;
}
</style>
