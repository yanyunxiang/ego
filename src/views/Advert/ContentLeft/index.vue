<template>
  <div>
    <el-tree :props="props"
             :load="loadNode"
             @node-click="handleNodeClick"
             lazy>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'left',
  data () {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      item: {}
    };
  },
  methods: {
    handleNodeClick (val) {
      this.item = val
      this.$emit("getTreeVal", val)
    },
    loadNode (node, resolve) {
      // console.log(node)
      if (node.level === 0) {
        this.$api.getAdvertList().then(res => {
          if (res.status === 200) {
            return resolve(res.result);
          } else {
            return resolve([])
          }
        }).catch(error => {
          console.log(error)
        })
      }
      if (node.level >= 1) {
        this.$api.getAdvertList({ id: node.data.pid }).then(res => {
          if (res.status === 200) {
            return resolve(res.result);
          } else {
            return resolve([])
          }
        }).catch(error => {
          console.log(error)
        })
      };
    },
  }
}
</script>

<style lang="less" scoped>
</style>