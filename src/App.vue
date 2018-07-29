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
import ElHeader from '@/components/ElHeader';

export default {
  name: 'App',
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    ElHeader,
  },
};
</script>
