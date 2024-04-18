<!-- 忘记密码页面 -->
<template>
  <div class="page">
    <!-- 1、重置框 -->
    <div class="login_box">
      <!-- 2、页头 -->
      <el-steps :active="active" finish-status="success" simple style="margin-top: 160px">
        <el-step title="确认账号" ></el-step>
        <el-step title="重置密码" ></el-step>
      </el-steps>
      <!-- 3、文字+表单 -->
      <div>
        <h3 v-if="show==1" style="text-align: left">请输入需要找回的账号：</h3>
        <el-form :model="resetForm" :rules="resetRules" ref="resetForm" label-width="0px" class="reset_form">
          <el-form-item prop="phone" v-if="show==1">
            <el-input v-model="resetForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="verifyCode" v-if="show==1">
            <div style="display: flex">
              <el-input style="width: 70%;justify-content: start" v-model="resetForm.verifyCode" placeholder="请输入验证码"></el-input>
              <el-button style="width: 30%;justify-content: end;border-radius: 0" type="primary">获取验证码</el-button>
            </div>
          </el-form-item>
          <el-form-item prop="password" v-if="show==2">
            <el-input v-model="resetForm.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="confirm" v-if="show==2">
            <el-input v-model="resetForm.confirm" show-password placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 按钮 -->
            <el-button v-if="this.show == 1" class="reset_btn" type="primary" @click="submitForm('resetForm')">下一步</el-button>
            <el-button v-if="this.show == 2" class="reset_btn" type="primary" @click="submitForm('resetForm')">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Reset',
    data() {
      return {
        /* 显示哪一个页面 */
        show: 1,
        active: 0,
        resetForm: {
          phone: '',
          verifyCode: '',
          password: '',
          confirm: ''
        },
        resetRules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          confirm: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ]
        }
      };
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.show == 1) {
              this.active++>2?this.active:2;
              this.show = 2
            } else {
              if (this.show == 2) {
                /* 重置密码完成，跳转页面到登录页面*/
                this.$router.push("/login")
              }
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
  .login_box {
    width: 375px;
    height: 578px;
    border: aqua solid 3px;
    /* 居中样式写法 */
    position: absolute;
    left: 50%;
    top: 50%;
    /*translatex在x轴方向上进行移动，反之translatey实在y轴方向，而translate括号里的两个参数是先x后y的*/
    transform: translate(-50%, -50%);
  }

  /* 忘记密码表单样式 */
  .reset_form{
    margin-top: 50px;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;

    /* 按钮样式*/
    .reset_btn{
      width: 100%;
      margin-top: 50px;
    }
  }
</style>
