<template>
  <el-dialog :title="title"
             :visible.sync="dialogVisible"
             width="70%"
             :before-close="closeForm">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="类目选择"
                    prop="category">
        <el-button type="primary"
                   @click="innerVisible = true">选择类目</el-button>
        {{ ruleForm.category }}
      </el-form-item>
      <el-form-item label="商品名称"
                    prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="商品价格"
                    prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量"
                    prop="num">
        <el-input v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点"
                    prop="sellPoint">
        <el-input v-model="ruleForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品图片"
                    prop="image">
        <el-button type="primary"
                   @click="innerImage = true">选择图片</el-button>
        <img :src="ruleForm.image"
             v-if="ruleForm.image"
             alt=""
             class="chooseImage">
      </el-form-item>
      <el-form-item label="商品描述"
                    prop="desc">
        <WangEditor ref='getEditorData'
                    :value='ruleForm.desc' />
      </el-form-item>
    </el-form>
    <!-- 类目选择--内弹框--- ---------------->
    <el-dialog width="50%"
               title="选择类目"
               :visible.sync="innerVisible"
               append-to-body>
      <ProductTree @getTreedata="getTreedata" />
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="showTreeData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传图片内弹框 -->
    <el-dialog width="50%"
               title="选择类目"
               :visible.sync="innerImage"
               append-to-body>
      <ProductUpLoadImage @upLoad='upLoad' />
      <span slot="footer"
            class="dialog-footer">
        <!-- <el-button @click="innerImage = false">取 消</el-button> -->
        <el-button type="primary"
                   @click="showImage">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 确定取消按钮 -->
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="closeForm">取 消</el-button>
      <el-button type="primary"
                 @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ProductTree from './ProductTree'
import ProductUpLoadImage from './ProductUpLoadImage'
import WangEditor from './WangEditor'
export default {
  name: 'ProductDialog',
  components: {
    ProductTree,
    ProductUpLoadImage,
    WangEditor
  },
  data () {
    return {
      dialogVisible: false,//外弹框
      innerVisible: false,//类目弹框
      treeData: {},//tree数据
      innerImage: false,//图片弹框
      imgUrl: '',//图片路径
      ruleForm: {
        cid: '',
        title: '',//标题
        price: '',//价格
        num: '',//数量
        sellPoint: '',//商品卖点
        image: '',//图片
        category: '',//商品类目
        desc: '',//商品描述的内容
      },
      rules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
        ],
        num: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
        ]
      }
    }
  },
  props: ["title", "rowData"],
  watch: {
    rowData (newValue, oldValue) {
      // console.log(newValue)
      this.ruleForm = newValue
      this.ruleForm.desc = newValue.descs
    },
  },
  methods: {
    // 编辑弹框的取消按钮
    closeForm () {
      this.dialogVisible = false;
    },
    // 编辑弹框的确定按钮
    submitForm (formName) {
      // 通过ref获取富文本编辑器的内容
      // console.log(this.$refs.getEditorData.editorData)
      this.ruleForm.desc = this.$refs.getEditorData.editorData
      this.$refs[formName].validate((valid) => {

        // console.log(this.ruleForm)
        // console.log(formName, valid)
        if (valid) {
          // 编辑商品
          this.dialogVisible = false;
          // console.log(this.ruleForm)
          if (this.title === '编辑商品') {
            this.$api.updateTbItem(this.ruleForm).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: "修改商品成功",
                  type: "success",
                });

                this.$emit('updateProduct')
              } else {
                this.$message({
                  message: "修改商品失败",
                  type: "error",
                });
              }
            }).catch(error => {
              this.$message({
                message: "修改商品失败",
                type: "error",
              });
            })
          } else {
            //  添加商品
            this.$api.insertProduct(this.ruleForm).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.$refs.getEditorData.editor.txt.clear()
                this.$emit('updateProduct')
              } else {
                this.$message({
                  message: "添加商品失败",
                  type: "error",
                });
              }
            }).catch(error => {
              this.$message({
                message: "添加商品失败",
                type: "error",
              });
            })
          }
        } else {
          this.$message({
            message: "操作错误",
            type: "error",
          });
        }
      })
    },
    // 选择类目
    getTreedata (val) {
      this.treeData = val
    },
    //显示类目树确定
    showTreeData () {
      // 关闭类目选择弹框
      this.innerVisible = false
      // 将选择的类目赋值给一级弹框
      this.ruleForm.cid = this.treeData.cid
      this.ruleForm.category = this.treeData.name
      // console.log('点击确定按钮')
    },
    // 显示图片的确定按钮
    showImage () {
      this.innerImage = false
      this.ruleForm.image = this.imgUrl
    },
    // 回显图片
    upLoad (img) {
      this.imgUrl = img
    },
  },
}
</script>

<style lang="less" scoped>
.chooseImage {
  width: 120px;
  height: 120px;
  vertical-align: top;
  margin-left: 20px;
}
</style>