<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">校外人员注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请设置用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password1">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password1"
          v-model="loginForm.password1"
          :type="passwordType"
          placeholder="请设置密码"
          name="password1"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item prop="password2">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password2"
          v-model="loginForm.password2"
          :type="passwordType"
          placeholder="请再次输入密码"
          name="password2"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="请输入邮箱地址"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-row :gutter="24">
        <el-col :span="14">
          <el-form-item prop="code">
            <span class="svg-container">
              <svg-icon icon-class="message" />
            </span>
            <el-input
              ref="code"
              v-model="loginForm.code"
              placeholder="请输入验证码"
              name="code"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <div class="button">
            <el-button
              type="success"
              plain
              @click.native.prevent="handleSendMailCode"
              >获取验证码</el-button
            >
          </div>
        </el-col>
      </el-row>
      <div>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 48%; margin-bottom: 30px"
          @click.native.prevent="handleRegister"
          >注册</el-button
        >
        <el-button
          type="info"
          style="width: 48%; float: right"
          @click="handleLogin"
          >返回登录</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { register, sendMailCode } from "@/api/user";
import { validUser } from "@/utils/validate";
export default {
  name: "Register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUser(value)) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword1 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于六位数"));
      } else {
        callback();
      }
    };
    const validatePassword2 = (rule, value, callback) => {
      if (this.loginForm.password1 !== value) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password1: "",
        password2: "",
        email: "",
        code: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password1: [
          { required: true, trigger: "blur", validator: validatePassword1 },
        ],
        password2: [
          { required: true, trigger: "blur", validator: validatePassword2 },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleRegister() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const res = await register(
            {
              user: {
                username: this.loginForm.username,
                password: this.loginForm.password1,
              },
              formCode: this.loginForm.code,
            },
            sessionStorage
          );
          if (res.message === "success") {
            this.$message({
              message: "注册成功！",
              type: "success",
            });
            this.$router.push({ path: this.redirect || "/" });
          } else {
            this.$message({
              message: res.message,
              type: "error",
            });
          }
        }
      });
    },
    handleLogin() {
      this.$router.push("/login");
    },
    async handleSendMailCode() {
      let res = await sendMailCode(this.loginForm.email);
      if (res.message === "success") {
        this.$message({
          message: "发送成功！",
          type: "success",
        });
      } else {
        this.$message({
          message: res.message,
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 80px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .button {
    height: 50px;
    line-height: 50px;
    width: 100%;
  }
}
</style>
