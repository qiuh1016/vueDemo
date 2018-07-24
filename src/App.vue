<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view/>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import NavBread from '@/components/NavBread';

export default {
  name: 'App',
  components: {
    NavHeader,
    NavFooter,
    NavBread,
  },
};
</script>
