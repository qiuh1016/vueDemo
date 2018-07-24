<template>
  <nav aria-label="breadcrumb" class="container">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" aria-current="page"><a href="#/">Home</a></li>
      <slot></slot>
    </ol>
  </nav>
</template>
<script>
export default {
  name: 'NavBread',
};
</script>
