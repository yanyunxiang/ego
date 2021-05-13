<template>
  <div class="productContent">
    <!-- 1.搜索框 -------------------->
    <div class="search">
      <el-input v-model="input"
                @change="changeInput"
                placeholder="请输入内容"></el-input>
      <el-button type="primary">{{$t("ego.chaxun")}}</el-button>
      <el-button type="primary"
                 @click="showProductDialog">{{$t("ego.add")}}</el-button>
    </div>
    <el-table :data="tableData"
              ref="multipleTable"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="id"
                       width='80px'
                       show-overflow-tooltip
                       label="商品ID"></el-table-column>
      <el-table-column prop="title"
                       width='150px'
                       show-overflow-tooltip
                       label="商品名称"></el-table-column>
      <el-table-column prop="price"
                       width='100px'
                       show-overflow-tooltip
                       label="商品价格"></el-table-column>
      <el-table-column prop="num"
                       show-overflow-tooltip
                       width='100px'
                       label="商品数量"></el-table-column>
      <el-table-column prop="category"
                       show-overflow-tooltip
                       width='150px'
                       label="规格类目"></el-table-column>
      <el-table-column prop="image"
                       width='180px'
                       show-overflow-tooltip
                       label="商品图片"></el-table-column>
      <el-table-column prop="sellPoint"
                       show-overflow-tooltip
                       width='180px'
                       label="商品卖点"></el-table-column>
      <el-table-column prop="descs"
                       show-overflow-tooltip
                       label="商品描述"></el-table-column>
      <el-table-column label="操作"
                       width='200px'>
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">{{$t("ego.editor")}}</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">{{$t("ego.delete")}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="batchDelect">
      <el-button plain
                 @click="batchDetele">{{$t("ego.batch")}}</el-button>
      <el-button plain
                 @click='cancleHandle'>{{$t("ego.deselect")}}</el-button>
    </div>
    <!-- 分页 -->
    <Paging :total='total'
            :pageSize='pageSize'
            @currentChange='currentChange' />
    <!-- 弹框 -->
    <ProductDialog :title="title"
                   :rowData="rowData"
                   ref="dialog"
                   @updateProduct="httpData(1)" />
  </div>
</template>

<script>
import Paging from '../../components/Paging'
import ProductDialog from './ProductDialog'
export default {
  components: {
    Paging,
    ProductDialog
  },
  data () {
    return {
      input: '',
      tableData: [],//当前页的总数据数组
      currentPage: 1,//当前页
      total: 50,//总条目数
      pageSize: 8,//当前页显示的条目数
      title: '编辑商品',
      multipleSelection: [],//当前选中的数据
      // dialogVisible: false,//是否显示弹框
      rowData: {},//一行数据
    }
  },
  created () {
    this.httpData(this.currentPage)
  },
  methods: {
    // 点击分页的页码
    currentChange (currentPage) {
      this.currentPage = currentPage
      this.httpData(currentPage)
    },
    //点击查询按钮,完成
    changeInput (search) {
      // console.log('点击了查询按钮' + search)
      if (search === '') {
        this.httpData(this.currentPage)
      } else {
        this.$api.searchUrl({ search }).then(res => {
          if (res.status === 200) {
            this.tableData = res.result
            // this.tableData = res.result.slice(0, 8).reverse()
            this.total = res.result.length
            this.pageSize = 8
          } else {
            this.tableData = []
            this.total = 1
            this.pageSize = 8
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    // 添加商品
    showProductDialog () {
      // console.log('点击了添加按钮')
      this.$refs.dialog.dialogVisible = true;
      // this.$refs.dialog.$refs.
      this.title = "添加商品";
      this.rowData = {}
    },
    // 编辑商品
    handleEdit (index, row) {
      this.$refs.dialog.dialogVisible = true;
      this.title = "编辑商品";
      //传递当前行的数据 row对象
      // this.rowData = Object.assign({}, row);
      this.rowData = row;
    },
    // 单个删除按钮
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '温馨提示', {
        confirmButtonText: '坚持删除',
        cancelButtonText: '丢,点错了',
        type: 'warning'
      }).then(() => {
        this.$api.deleteItemById({ id: row.id }).then(res => {
          if (res.status === 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            //更新视图
            this.httpData(this.currentPage)
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 取消选择按钮
    cancleHandle (rows) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'error',
          message: '无可取消的数据'
        });
        return
      }
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 批量删除按钮
    batchDetele () {
      let idArr = []
      this.multipleSelection.forEach(ele => {
        idArr.push(ele.id)
      })
      if (idArr.length === 0) {
        this.$message({
          type: 'error',
          message: '无可删除的数据'
        });
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$api.batchDelete({ idArr }).then(res => {
          if (res.status === 200) {
            this.$message({
              message: `删除${idArr.length}条数据成功`,
              type: "success",
            });
            this.httpData(this.currentPage)
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 请求当前页数据
    httpData (page) {
      this.$api.productList({ page: page }).then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          this.tableData = res.data
          this.total = res.total
          this.pageSize = res.pageSize
        }
      }).catch(error => {
        // console.log(error)
        this.$message.error(error)
      })
    },
    // 点击单选框
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
.productContent {
  padding: 20px;
  .search {
    display: flex;
    padding: 20px;
    button {
      margin-left: 20px;
    }
  }
  .batchDelect {
    margin-top: 20px;
  }
}
</style>