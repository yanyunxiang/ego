<template>
  <div class="home">
    <div id="demo1">
      <p>{{value}}</p>
    </div>
  </div>
</template>

<script>
import wangEditor from 'wangeditor'
export default {
  data () {
    return {
      editor: null,
      editorData: ''//获取的内容
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    const editor = new wangEditor(`#demo1`)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      // console.log(newHtml, editor.txt.text())
      //newHtml:带标签的文本格式的内容,
      // editor.txt.text():纯文本格式的内容
      this.editorData = editor.txt.text()
    }
    // 创建编辑器
    editor.create()
    this.editor = editor
  },
}
</script>

<style lang="less">
.home {
  width: 1200px;
}
</style>