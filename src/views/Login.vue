<template>
  <div id="login_app">
    <div class="dowebok" id="dowebok">
      <div class="form-container sign-up-container">
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="0px" class="login_form">
          <h1 style="margin-bottom:40px">注册</h1>
          <!-- <div class="social-container">
            <a href="#" class="social">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bilibili3 "></use>
              </svg>
            </a>
            <a href="#" class="social">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhihu"></use>
              </svg>
            </a>
            <a href="#" class="social">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-github"></use>
              </svg>
            </a>
          </div>
          <span>或使用邮箱注册</span> -->
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名称" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="registerForm.email" placeholder="请输入邮箱" prefix-icon="el-icon-message"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <!--        <input type="text" placeholder="姓名">-->
          <!--        <input type="email" placeholder="电子邮箱">-->
          <!--        <input type="password" placeholder="密码">-->
          <button type="button" @click="doRegister('registerForm')">注册</button>
        </el-form>
      </div>
      <div class="form-container sign-in-container">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" class="login_form">
          <h1 style="margin-bottom:40px">登录</h1>
          <!-- <div class="social-container">
            <a href="#" class="social">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qq"></use>
              </svg>
            </a>
            <a href="#" class="social">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-we-chat"></use>
              </svg>
            </a>
            <a href="#" class="social">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weibo"></use>
              </svg>
            </a>
          </div>
          <span>或使用您的帐号</span> -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名称" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入登录密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <!--        <input type="email" placeholder="电子邮箱">-->
          <!--        <input type="password" placeholder="密码">-->
          <a href="#">忘记密码？</a>
          <button type="button" @click="doLogin('loginForm')">登录</button>
        </el-form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有帐号？</h1>
            <p>请使用您的帐号进行登录</p>
            <button class="ghost" id="signIn">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有帐号？</h1>
            <p>立即注册加入我们，和我们一起开始旅程吧</p>
            <button class="ghost" id="signUp">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {UsernamePasswordToLogin} from "@/api/login";
import {saveUser} from "@/api/users";
import { mapMutations } from 'vuex'
import { USERLOGIN, USERLOGOUT } from '@/store/types'

export default {
  name: 'Login',
  data() {
    var checkEmail = (rule, value, callback) => {
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if(value === ''){
        callback(new Error('请输入邮箱'));
      } else if(!verify.test(value)){
        callback(new Error('请输入正确的邮箱格式'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
        verifyCode: ''
      },
      registerForm:{
        username: '',
        password: '',
        email: ''
      },
      loginRules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 1, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
        ],
        verifyCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      },
      registerRules: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      imgUrl: require('@/assets/Images/register_img.png'),
      fit: 'cover'
    };
  },
  mounted() {
    var signUpButton = document.getElementById('signUp')
    var signInButton = document.getElementById('signIn')
    var container = document.getElementById('dowebok')
    signUpButton.addEventListener('click', function () {
      container.classList.add('right-panel-active')
    })

    signInButton.addEventListener('click', function () {
      container.classList.remove('right-panel-active')
    })
  },
  methods: {
    ...mapMutations([USERLOGIN, USERLOGOUT]),
    doRegister(formName){
      this.$refs[formName].validate(async (valid) => {
        if(valid){
          const {data:res} = await saveUser(this.registerForm)
          console.log("res", res)
        }
      })
    },
    doLogin(formName){
      this.$refs[formName].validate(async (valid) => {
        if(valid){
          const {data:res} = await UsernamePasswordToLogin(this.loginForm)
          let role = res.data.authority
          // 登录失败
          if (res.code !== 200) {
            return this.$message.error({
              showClose: true,
              message: res.message,
              center: true,
              duration: 1000
            })
          }
          // 登录成功
          this.$message.success({
            showClose: true,
            message: res.message,
            center: true,
            duration: 1000
          })
          // 保存token 用于权限验证
          this[USERLOGIN](res.data.token)
          console.log(role)
          switch (role){
            case 'student': this.$router.push({name:'MainS',params:{key:role}});break;
            case 'teacher': this.$router.push({path: '/mainT',query:{key:role}});break;
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/style.css";

.sign-in-container {
  .el-form-item {
    margin: 8px;
  }
}
.icon{
  height: 40px;
  width: 40px;
}
.sign-up-container {
  .el-form-item {
    margin: 8px;
  }
}
#login_app{
  width: 100%;
  height: 100%;
  background-image: url("../assets/Images/bc.jpg");
  background-size:cover;
}
#dowebok {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
