<template>
  <div>
    <nav-bread>
      <li class="breadcrumb-item" aria-current="page"><a href="#/address">Address</a></li>
    </nav-bread>
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

