<template>
<div class="login-container">
  <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="login-form">
    <el-form-item label="账号" prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="on"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="on"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
    </el-form-item>
  </el-form>
</div>  
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        usernaem: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "帐号不能为空" }
        ],
        password: [{ required: true, trigger: "blur", message: "密码不能为空" }]
      }
    };
  },
  methods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          this.$API.common.login(params).then(({ data  }) => {
            console.log(data );
            if (data && data.code === 0) {
              //保存token
              this.$cookie.set("token", data.token, {
                expires: `${data.expire || 0}s`
              });
              this.$router.push({ name: "home" });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
     ...mapMutations([
      "SET_CURRENTUSER"
    ])
  }
};
</script>

<style scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
}
.login-form {
  position: absolute;
  left: 0;
  right: 0;
  width: 400px;
  padding: 35px 35px 15px 35px;
  margin: 120px auto;
}
</style>
