<template>
  <div>
    Cart: id:
    <span>{{$route.query.goodid}}</span>
    <button @click="jsonp">jsonp</button>
    <br>
    <p>{{result}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: '',
    };
  },
  methods: {
    get() {
      this.$http.get('/1', {
        params: {
          userid: 1,
        },
        headers: {
          token: '123',
        },
      }).then(
        (res) => {
          this.result = res.data;
        },
        (error) => {
          this.result = error;
        },
      );
    },
    jsonp() {
      this.$http.jsonp('www.baidu.com', {
        params: {
          userid: 1,
        },
        headers: {
          token: '123',
        },
      }).then(
        (res) => {
          this.result = res.data;
        },
        (error) => {
          this.result = error;
        },
      );
    },
  },
};
</script>
