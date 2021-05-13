<template>
  <el-tree :props="defaultProps"
           :load='loadTreeNode'
           lazy
           @node-click="handleNodeClick"></el-tree>
</template>

<script>
export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      this.$emit("getTreedata", data)
    },
    loadTreeNode (node, resolve) {
      // console.log(node)
      if (node.level === 0) {
        this.$api.selectItemCategory().then(res => {
          if (res.status === 200) {
            return resolve(res.result)
          }
        }).catch(error => {
          console.log(error)
        })
      }
      if (node.level >= 1) {
        this.$api.selectItemCategory({ id: node.data.cid }).then(res => {
          if (res.status === 200) {
            return resolve(res.result)
          } else {
            return resolve([])
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  },
}
</script>

<style lang="less" scoped>
</style>