<template>
	<div class="login-container pull-height">
    <div class="login-info text-white animated fadeInLeft">
      <h1>krt-admin 通用后台管理系统</h1>
      <ul>
        <li>前端基于Vue+Vuex+Vue-router+Element快速后台管理模板，采用token交互验证方式。</li>
        <li>后端基于SpringBoot2+Mybatis,实现前后端分离。</li>
      </ul>
    </div>
    <div class="login-border pull-height">
      <div class="login-main animated fadeIn">
        <h2>登录 krt-admin</h2>
        <p>欢迎使用本系统</p>
         <el-form class="loginForm" :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
          <el-form-item prop="username">
            <el-input  v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
              <i class="iconfont icon-username" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
              <i class="iconfont icon-password" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row :span="24">
              <el-col :span="14">
                <el-input v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码">
                  <i class="iconfont icon-yanzhengma" slot="prefix"></i>
                </el-input>
              </el-col>
              <el-col :span="10">
                <div class="login-code">
                  <img class="login-code-img" :src="captchaPath" @click="getCaptcha" alt="验证码">
                </div>
              </el-col>
            </el-row>
          </el-form-item> 
          <el-form-item>
            <el-button type="primary" @click="login" class="login-submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
	</div>
</template>



<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import { setToken } from "@/utils/auth";
export default {
  data() {
    return {
      loginForm: {
        usernaem: "",
        password: "",
        code: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "帐号不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [
          { min: 5, max: 5, message: "验证码长度为5位", trigger: "blur" },
          { required: true, trigger: "blur", message: "验证码不能为空" }
        ]
      },
      captchaPath: ""
    };
  },
  created() {
    this.getCaptcha();
  },
  computed: {
    ...mapGetters(["tagWel"])
  },
  methods: {
    // 获取验证码
    getCaptcha() {
      console.log('xxx');
      this.captchaPath = this.API.common.captcha();
      console.log(this.captchaPath);
    },
    //提交表单
    login() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          var params = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          this.API.common.login(params).then(({ data }) => {
            console.log(data);
            if (data && data.code === 0) {
              //保存登录token
              setToken(data.token);
              //跳转首页
              this.$router.push({ path: this.tagWel.value });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.pull-height {
  height: 100%;
}
.text-white {
  color: #ffffff;
}
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
}
.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/login.jpg");
  background-size: cover;
}
.login-info {
  padding-left: 60px;
}
.login-info > ul {
  padding: 20px 0;
}
.login-info > ul > li {
  font-size: 18px;
  padding-bottom: 10px;
}
.login-border {
  display: flex;
  align-items: center;
  background-color: #fff;
}
.login-main {
  padding: 140px 60px;
  width: 450px;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
}
.login-main > p {
  padding: 15px 0px;
  color: #7d7d7d;
}

.login-code-img {
  width: 120px;
  height: 38px;
  margin-left: 10px;
  border: 1px solid #ccc;
}
</style>
