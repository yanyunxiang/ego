<template>
  <div id="layout">
    <LeftMenu id="leftMenu"
              :isCollapse="isCollapse" />
    <Header id="header"
            @handleClicklay="handleClick" />
    <Content :class="!isCollapse ?'rightContent1':'rightContent2'" />
  </div>
</template>

<script>
import LeftMenu from './LeftMenu'
import Header from './RightTopAndContent/Header'
import Content from './RightTopAndContent/Content'
export default {
  components: {
    Content,
    Header,
    LeftMenu
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleClick (value) {
      this.isCollapse = value
    },
  },
}
</script>

<style lang="less" scoped>
#layout {
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  #leftMenu {
    // width: 200px;
    float: left;
    height: 100%;
    background-color: #5f6367;
    color: #ff77ff;
  }
  #header {
    height: 50px;
    width: 100%;
    background-color: #1e78bf;
  }
  .rightContent1 {
    margin-left: 200px;
  }
  .rightContent2 {
    margin-left: 64px;
  }
}
</style>