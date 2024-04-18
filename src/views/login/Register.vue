<!-- 注册页面 -->
<template>
  <div class="page">
    <!-- 注册内容区域 -->
    <!-- 1、注册框 -->
    <div class="login_box">
      <!-- 2、用户头像上传 -->
      <div class="avatar_box">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!-- 3、注册表单 -->
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="0px" class="register_form">
        <el-form-item prop="account">
          <el-input prefix-icon="el-icon-user" v-model="registerForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="registerForm.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-mobile-phone" v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <div style="display: flex">
            <el-input style="width: 70%;justify-content: start" v-model="registerForm.verifyCode" placeholder="请输入验证码"></el-input>
            <el-button style="width: 30%;justify-content: end;border-radius: 0" type="primary">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="register_btn" type="primary" @click="submitForm('registerForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        imageUrl: '',
        registerForm: {
          account: '',
          password: '',
          phone: '',
          verifyCode: ''
        },
        registerRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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

  /* 注册框样式 */
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

    /* 头像上传框样式 */
    .avatar_box{
      margin: 5px auto;
    }

    /* 注册表单样式 */
    .register_form{
      margin-top: 50px;
      width: 100%;
      padding: 0px 20px;
      box-sizing: border-box;

      /* 按钮样式*/
      .register_btn{
        width: 100%;
        margin-top: 50px;
      }
    }
  }
</style>
