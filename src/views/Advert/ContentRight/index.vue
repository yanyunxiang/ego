<template>
  <div>
    <el-button type="primary">{{adItem.name?adItem.name:'广告内容'}}广告广告内容</el-button>
  </div>
</template>

<script>
export default {
  props: {
    adItem: Object,
    default: function () {
      return {
        name: "广告类型"
      }
    }
  },
}
</script>

<style lang="less" scoped>
</style>