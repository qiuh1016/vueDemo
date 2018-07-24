<template>
  <nav class="navbar navbar-default navbar-inverse">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#/">Brand</a>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
          <li><a href="#">Link</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
            aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
        </ul>
        <!-- <form class="navbar-form navbar-left">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form> -->
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#" @click="showLogin" id="loginBtn">Login</a></li>
          <li>
            <a href="#/cart">
              <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- START 登录 -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Login</h4>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-bind:class="{'hidden': loginTip == ''}"
            role="alert">{{loginTip}}</div>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input type="text" class="form-control" placeholder="Username" v-model="username">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="psw"
                @keyup.enter="login">
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox"> Check me out
                </label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END 登录 -->
  </nav>
</template>
<script>
import axois from 'axios';

export default {
  name: 'NavHeader',
  data() {
    return {
      tag: '',
      username: '',
      psw: '',
      logined: false,
      loginTip: '',
    };
  },
  mounted() {
  },
  methods: {
    showLogin() {
      if (this.logined) {
        // todo： 退出
        this.logined = false;
        $('#loginBtn').html('Login');
      } else {
        $('#myModal').modal('show');
      }
    },
    login() {
      if (!this.username || !this.psw) {
        // 提示
        this.loginTip = '输入信息不全';
        return;
      }
      axois.post('/api/login', {
        username: this.username,
        psw: this.psw,
      }).then((result) => {
        const res = result.data;
        if (res.code === 1) {
          $('#myModal').modal('hide');
          this.logined = true;
          $('#loginBtn').html(this.username);
          this.loginTip = '';
        } else {
          this.loginTip = res.msg;
        }
      });
    },
  },
};
</script>
