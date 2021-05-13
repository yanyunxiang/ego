<template>
  <div class="paramsContent">
    <div class="search">
      <el-input v-model="input"
                @change="changeInput"
                placeholder="请输入内容"></el-input>
      <el-button type="primary">{{$t("ego.chaxun")}}</el-button>
      <el-button type="primary"
                 @click="showParamsDialog">{{$t("ego.add")}}</el-button>
    </div>
    <el-table :data="tableData"
              ref="multipleTable"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="id"
                       label="参数规格ID"
                       width="180">
      </el-table-column>
      <el-table-column prop="itemCatId"
                       label="类目ID"
                       width="180">
      </el-table-column>
      <el-table-column prop="specsName"
                       label="规格名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="paramData"
                       label="规格参数">
      </el-table-column>
      <el-table-column label="商品操作"
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

    <!-- 添加编辑弹框 -->
    <ParamsDialog :title1='title1'
                  ref="pDialog" />
    <!-- 分页 -->
    <div>
      <Pagtation :total='total'
                 :pageSize='pageSize'
                 @currentChange='currentChange' />
    </div>
  </div>
</template>

<script>
import Pagtation from '../../components/Paging'
import ParamsDialog from './ParamsDialog'
export default {
  components: {
    Pagtation,
    ParamsDialog
  },
  data () {
    return {
      input: '',
      tableData: [],//当前页规格参数的总数居
      currentPage: 1,//当前页码
      title1: '',
      total: 1,//总条数
      pageSize: 1,//总页码数
      multipleSelection: [],//当前选中的数据
      outerVisible: false,//外层弹框
      innerVisible: false,//内层弹框
    }
  },
  created () {
    this.httpData(this.currentPage)
  },
  methods: {
    //请求当前页数据
    currentChange (currentPage) {
      this.currentPage = currentPage
      this.httpData(currentPage)
    },
    // 查询输入框
    changeInput (search) {
      if (search == '') {
        this.httpData(this.currentPage)
      }
    },
    // 添加按钮
    showParamsDialog () {
      this.title1 = '商品类目选择规格参数'
      this.$refs.pDialog.outerVisible = true
    },
    // 点击单选框触发
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit () {

    },
    // 删除按钮
    handleDelete (id, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '温馨提示', {
        confirmButtonText: '坚持删除',
        cancelButtonText: '丢,点错了',
        type: 'warning'
      }).then(() => {
        this.$api.paramsDelete({ id: row.id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除数据成功'
          })
          this.httpData(this.currentPage)
        }).catch(error => {
          this.$message({
            type: 'warning',
            message: '操作数据失败,请稍后再试'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 请求规格参数页的数据数据
    httpData (page) {
      this.$api.selectItemParamAll({ page }).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.tableData = res.data
          this.pageSize = res.pageSize
          this.total = res.total
        }
      }).catch(error => {
        this.$message({
          type: 'warning',
          message: '请求数据错误,请稍后重试'
        })
      })
    },
  },
}
</script>

<style lang="less">
.paramsContent {
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