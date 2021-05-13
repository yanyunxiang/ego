<template>
  <div class="pagingBox">
    <el-pagination layout="total, prev, pager, next, jumper"
                   background
                   :page-size='pageSize'
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
// hide-on-single-page  //当只有一页时隐藏分页
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 8
    },
    total: {
      type: Number,
      default: 50
    }
  },
  methods: {
    // 当前页发生改变时触发
    handleCurrentChange (currentPage) {
      this.$emit('currentChange', currentPage);
    }
  },
}
</script>

<style lang="less" scoped>
.pagingBox {
  // 方式1
  // margin-left: 50%;
  // margin-top: 50px;
  // transform: translateX(-50%);
  // 方式2
  position: relative;

  .el-pagination {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>