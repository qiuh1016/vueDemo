<template>
  <div>
    <!-- <nav-header></nav-header> -->
    <nav-bread>
    </nav-bread>
    <div class="container">
      <div class="row">
        <!-- START 侧边栏 -->
        <div class="col-md-3">
          <ul class="list-group">
            <li class="list-group-item">价格过滤</li>
            <li class="list-group-item" v-bind:class="{'active': priceChecked == 'all'}"
            @click="priceChecked = 'all'">
              ALL
            </li>
            <li class="list-group-item" v-for="(price, index) in priceFilter" :key="price.id"
            v-bind:class="{'active': priceChecked == index}"
            @click="priceChecked = index">
              {{price.start}} - {{price.end}}
            </li>
          </ul>
        </div>
        <!-- END 侧边栏 -->
        <!-- START 商品展示 -->
        <div class="col-md-9">
          <div class="row">
            <div class="thumbnail col-md-4" v-for="(item) in goodsList" :key="item.productId">
              <img class="card-img-top" v-lazy="'/static/'+item.productImg"
                  alt="Card image cap" style="width:220px; height:220px;">
              <div class="caption">
                <h3>{{item.productName}}</h3>
                <p>{{item.productPrice}}元</p>
                <p>
                  <a href="#" class="btn btn-warning" role="button"
                  @click="addCart(item.productId)">加入购物车</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- END 商品展示 -->
      </div>
    </div>
    <!-- <nav-footer></nav-footer> -->
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import NavBread from '@/components/NavBread';
import axios from 'axios';

export default {
  data() {
    return {
      goodsList: [],
      priceChecked: 'all',
      priceFilter: [
        {
          start: '0.00',
          end: '500.00',
        },
        {
          start: '500.00',
          end: '1000.00',
        },
        {
          start: '1000.00',
          end: '3000.00',
        },
      ],
    };
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      axios.get('/api/goods').then((res) => {
        this.goodsList = res.data.result;
      });
    },
    addCart(productId) {
      axios.post('/api/addCart', { productId }).then((result) => {
        const res = result.data;
        if (res.code === 1) {
          // eslint-disable-next-line
          alert('添加成功');
        } else {
          // eslint-disable-next-line
          alert('未登陆');
        }
      });
    },
  },
};
</script>
