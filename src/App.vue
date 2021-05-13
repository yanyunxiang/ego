<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang='less'>
html,
body,
#app {
  height: 100%;
}
.el-dropdown-menu {
  margin-top: 0 !important;
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #fff;
  }
}
</style>
