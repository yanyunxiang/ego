<template>
  <el-menu :default-active="$route.path"
           class="el-menu-vertical-demo"
           background-color="#304156"
           text-color="#fff"
           active-text-color="#409EFF"
           router
           :collapse="isCollapse">
    <el-menu-item>
      <i class="el-icon-s-operation"
         v-show="isCollapse"></i>
      <span v-show="!isCollapse">{{$t("ego.name")}}</span>
    </el-menu-item>
    <el-menu-item index="/product">
      <i class="el-icon-goods"></i>
      <span>{{$t("ego.product")}}</span>
    </el-menu-item>
    <el-menu-item index="/params">
      <i class="el-icon-setting"></i>
      <span>{{$t("ego.params")}}</span>
    </el-menu-item>
    <el-menu-item index="/advert">
      <i class="el-icon-s-platform"></i>
      <span>{{$t("ego.advert")}}</span>
    </el-menu-item>
    <el-menu-item index="/center">
      <i class="el-icon-user"></i>
      <span>{{$t("ego.about")}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  border: 0;
  .is-active {
    background-color: #1f2d3d !important;
  }
}
</style>