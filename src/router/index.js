import Vue from 'vue';
import Router from 'vue-router';
import GoodsList from '@/views/GoodsList';
import Cart from '@/views/Cart';
import Address from '@/views/address/Address';
import AddAddress from '@/views/address/AddAddress';

Vue.use(Router);

export default new Router({
  mode: 'hash', // history
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
    },
    {
      path: '/address/add',
      name: 'AddAddress',
      component: AddAddress,
    },
  ],
});
