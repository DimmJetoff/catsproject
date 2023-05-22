<template>
  <div id="app">
    <page-header></page-header>
    <router-view></router-view>
    <page-footer></page-footer>

  </div>
</template>

<script>
import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";

export default {
  name: "App",
  components: {
    PageHeader,
    PageFooter
  },
};
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
}


</style>
