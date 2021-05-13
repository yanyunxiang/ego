<template>
  <div class="header">
    <i :class="handleIcon"
       @click="handleClick"
       class="foldIcon">
    </i>
    <div class="rightBox">
      <div class="user">
        <el-dropdown trigger="click"
                     @command="commandClick">
          <span class="el-dropdown-link">
            <span>{{$t("ego.language")}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="user">
        <span>{{$t("ego.holle")}} {{userInfo.username}}</span>
      </div>
      <div class="user"
           @click="exitHandle">
        <span>
          <i class="el-icon-switch-button"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      handleIcon: 'el-icon-s-fold',
      flag: false
    }
  },
  computed: {
    ...mapState('loginModule', ['userInfo'])
  },
  methods: {
    /**
     *选择语言
     */
    commandClick (val) {
      this.$i18n.locale = val
    },
    /**
     * 点击展开收缩导航栏
     */
    handleClick () {
      this.flag = !this.flag
      this.handleIcon = !this.flag ? 'el-icon-s-fold' : 'el-icon-s-unfold'
      this.$emit('handleClicklay', this.flag);
    },
    /**
     * 退出登录按钮
     */
    exitHandle () {
      this.$router.push('/login')
      localStorage.removeItem('userInfo')
      window.location.reload()
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  color: #ffffff;
  .foldIcon {
    font-size: 40px;
  }
  .rightBox {
    float: right;
    .user {
      font-size: 18px;
      float: left;
      padding: 0 10px;
      line-height: 50px;
      color: #ffffff;
      i {
        font-size: 22px;
      }
      .el-dropdown {
        color: #ffffff;
      }
    }
  }
}
</style>