<!-- 登录页面 -->
<template>
  <div class="page">
    <!-- 登录内容区域 -->
    <!-- 1、登录框 -->
    <div class="login_box">
      <!-- 2、用户头像 -->
      <div class="avatar_box">
        <img src="../../assets/img/头像.jpeg">
      </div>
      <!-- 3、登录表单 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login_form">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login_btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <!-- 4、注册和密码重置链接 -->
      <div class="register_reset">
        <el-link type="primary" @click="goRegister">注册用户</el-link>
        <el-link type="danger" @click="goReset">忘记密码</el-link>
      </div>
    </div>
  </div>
</template>

<script>
  /* 引入登录接口 */
  import user from "../../api/login/user";

  export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用登录方法
          // this.handelLogin(this.loginForm)
          this.$router.push({ path: '/sesame'});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /* 注册用户点击跳转方法 */
    goRegister() {
      this.$router.push({ path: '/register'});
    },
    /* 忘记密码点击跳转方法 */
    goReset() {
      this.$router.push({ path: '/reset'});
    },
    /* 登录接口调用 */
    async handelLogin(vo) {
      const { data } = await user.login(vo)
    }
  }
}
</script>

<style lang="less" scoped>
  /* 当前页面样式 */
  .page{
    height: 100%;
    width: 100%;
  }

  /* 登录框样式 */
  .login_box{
    width: 375px;
    height: 578px;
    border: aqua solid 3px;
    /* 居中样式写法 */
    position: absolute;
    left: 50%;
    top: 50%;
    /*translatex在x轴方向上进行移动，反之translatey实在y轴方向，而translate括号里的两个参数是先x后y的*/
    transform: translate(-50%,-50%);

    /* 设置其内的所有元素居中显示 */
    /*display:flex;*/
    /*align-item:center;*/
    /*justify-content:center;*/

    /* 头像样式 */
    .avatar_box{
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: #eeeeee solid 1px;
      padding: 10px;
      margin: 5px auto;
      /* 阴影效果 */
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

      /* 头像样式 */
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    /* 登录表单样式 */
    .login_form{
      margin-top: 50px;
      width: 100%;
      padding: 0px 20px;
      box-sizing: border-box;

      /* 按钮样式*/
      .login_btn{
        width: 100%;
        margin-top: 50px;
      }
    }

    /* 注册和重置样式 */
    .register_reset{
      display: flex;
      justify-content: space-around;
      margin-top: 70px;
    }
  }
</style>
