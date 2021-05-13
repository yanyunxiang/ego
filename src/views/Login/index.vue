<template>
  <div class="login-box">
    <div class="login-content">
      <el-tabs type="border-card"
               v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="登录"
                     name="login">
          <el-form :model="ruleForm"
                   status-icon
                   :rules="rules"
                   ref="ruleForm"
                   label-width="60px">
            <el-form-item label="账号"
                          prop="username">
              <el-input type="text"
                        v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
              <el-input type="password"
                        v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册"
                     name="zhuce">
          <el-form :model="ruleForm"
                   status-icon
                   :rules="rules"
                   ref="ruleForm"
                   label-width="60px">
            <el-form-item label="账号"
                          prop="username">
              <el-input type="text"
                        v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
              <el-input type="password"
                        v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      activeName: "login",
      ruleForm: {
        //表单数据
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    }
  },
  methods: {
    ...mapActions('loginModule', ['setUserInfoActions', 'setRegister']),
    handleClick (tab) {
      this.activeName = tab.name;
      //清空表单数据
      this.ruleForm = {
        username: "",
        password: "",
      };
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.activeName === "login") {
            this.setUserInfoActions(this.ruleForm)
          } else {
            this.setRegister(this.ruleForm)
            this.activeName = 'login'
          }
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.login-box {
  background: #999;
  height: 100%;
  overflow: hidden;
  .login-content {
    width: 400px;
    height: 200px;
    margin: 200px auto;
  }
}
</style>