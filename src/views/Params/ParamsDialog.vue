<template>
  <el-dialog :title="title1"
             width="60%"
             :visible.sync="outerVisible">
    <ProductTree @getTreedata="getTreedata" />
    <el-dialog width="50%"
               :title="title2"
               :visible.sync="innerVisible"
               append-to-body>
      <p><span>当前商品类目为: </span><span>{{treeData.name}}</span></p>
      <el-button @click="addListItem">新增参数列表</el-button>
      <hr>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="innerVisibleAdd">确定添加</el-button>
      </div>
    </el-dialog>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="innerVisibleAdd">确定添加分组</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ProductTree from '../Product/ProductDialog/ProductTree'
export default {
  components: {
    ProductTree,
  },
  data () {
    return {
      outerVisible: false,
      innerVisible: false,
      title2: '',
      treeData: {}
    }
  },
  props: ['title1'],
  methods: {
    // 点击树结构触发
    getTreedata (val) {
      // console.log(val)
      this.treeData = val
    },

    // 确定添加分组按钮
    innerVisibleAdd () {
      this.title2 = '商品参数添加列表'
      this.innerVisible = true
    },
    // 增加参数列表
    addListItem () {
      console.log('点击了添加参数列表按钮')
    },
  },

}
</script>

<style lang="less" scoped>
</style>