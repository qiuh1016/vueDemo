<template>
  <div>
    <nav-bread>
      <li class="breadcrumb-item" aria-current="page"><a href="#/address">Address</a></li>
    </nav-bread>
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="8" v-for="item in addressList" :key="item._id">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{item.name}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">确定</el-button>
            </div>
            <div class="text item">
              {{'电话: ' + item.phone }}
            </div>
            <div class="text item">
              {{'地址: ' + item.address }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import NavBread from '@/components/NavBread';
import axios from 'axios';

export default {
  data() {
    return {
      addressList: [],
      address: '中电科',
    };
  },
  components: {
    NavBread,
  },
  mounted() {
    this.getAddress();
  },
  methods: {
    getAddress() {
      const vue = this;
      axios.get('/api/address').then((result) => {
        this.addressList = result.data.data;
        if (this.addressList.length === 0) {
          this.$alert('还未添加地址，前往添加', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              vue.$router.push({
                path: '/address/add',
              });
            },
          });
        }
      });
    },
  },
};
</script>

