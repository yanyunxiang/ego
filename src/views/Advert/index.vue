<template>
  <div id="ad">
    <ContentLeft class="left"
                 @getTreeVal="getTreeVal" />
    <ContentRight class="right"
                  :adItem="adItem" />
  </div>
</template>

<script>
import ContentLeft from './ContentLeft'
import ContentRight from './ContentRight'
export default {
  components: {
    ContentLeft,
    ContentRight,
  },
  data () {
    return {
      adItem: {}
    }
  },
  methods: {
    getTreeVal (val) {
      this.adItem = val
    },
  },
}
</script>

<style lang="less" scoped>
#ad {
  margin-top: 30px;
  display: flex;
  .left {
    min-width: 200px;
  }
  .right {
    margin: 0 auto;
  }
}
</style>