<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <ProductCategoriesListing />
  <SalesOrderListing />
  <FilterModal />
</template>

<script>
// import ProductCategoriesListing from './components/ProductCategoriesListing.vue';
// import HelloWorld from './components/HelloWorld.vue';
import FilterModal from './components/FilterModal.vue';
import SalesOrderListing from './components/SalesOrderListing.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // ProductCategoriesListing,
    SalesOrderListing,
    FilterModal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
