<template>
  <el-upload class="upload-demo"
             ref="upload"
             :action="actionsUrl"
             :on-success="handleSuccess"
             :on-remove="handleRemove"
             :file-list="fileList"
             list-type='text'
             :auto-upload="false">
    <el-button slot="trigger"
               size="small"
               type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;"
               size="small"
               type="success"
               @click="submitUpload">上传到服务器</el-button>
  </el-upload>
</template>

<script>
import base from '../../../api/config'
export default {
  data () {
    return {
      fileList: [],
      actionsUrl: base.base + base.actionsUrl
    }
  },
  methods: {
    // 点击上传服务器
    submitUpload () {
      this.$refs.upload.submit()
    },
    // 点击上传成功后的钩子
    handleSuccess (response) {
      let imgUrl = base.base + "/" + response.url.slice(7)
      // console.log(imgUrl)
      this.$emit('upLoad', imgUrl)
      this.$message({
        type: 'success',
        message: '图片上传成功!'
      })
      this.fileList = []
    },
    // 点击移除文件的钩子
    handleRemove (e) {
      console.log('删除文件成功', e)
    }
  },
}
</script>

<style lang="less" scoped>
.upload-demo {
  ul {
    li {
      width: 100px;
      height: 100px;
    }
  }
}
</style>