<template>
  <!--登录表单的容器-->
  <div class="login_container">
    <!--登录区域-->
    <div class="register_box">
      <el-row>
        <el-col class="register_img" :span="16">
          <el-image
              style="width: 100%;height: 100%;margin-top: -10px"
              :fit="fit"
              :src="imgUrl"></el-image>
        </el-col>
        <el-col class="register_img" :span="8">
          <span>注册</span>
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" class="login_form">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名称" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入登录密码" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>

            <el-form-item class="login_btn">
              <el-button type="primary" @click="submitForm('loginForm')">注 册</el-button>
              <el-button @click="resetForm('loginForm')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {UsernamePasswordToLogin} from "@/api/login";

export default {
  name: "Register",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        verifyCode: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 1, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      imgUrl: require('@/assets/Images/register_img.png'),
      fit: 'cover'
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if(valid){
          const {data:res} = await UsernamePasswordToLogin(this.loginForm)
          console.log("res", res)
          let role = res.data.data
          switch (role){
            case 'student': this.$router.push({name:'MainS',params:{key:role}});break;
            case 'teacher': this.$router.push({name:'MainT',params:{key:role}});break;
          }
        }

        // this.tologin(formName.username,formName.password)
        // if (valid && this.loginForm.username == "t") {
        //   this.$router.push('/mainT')
        // } else if(valid && this.loginForm.username == "s"){
        //   this.$router.push('/mainS')
        // }else{
        //   return false;
        // }
        // switch (this.loginForm.username){
        //   case "teacher":this.$router.push('/main');break;
        //   case "student":this.$router.push('/home');break;
        // }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #686a68;
  text-align: center;
}

.register_box {
  width: 60%;
  height: 50%;
  background-color: #FFFFFF;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .register_form{
    width: 300px;
    box-sizing: border-box;

    .login_btn{
      display: flex;
      justify-content: flex-end;
    }

    .verifyCode_box{
      display: flex;
      .verifyCode{
        width: 70%;
        justify-content: left;
      }

      .verifyCode_img{
        width: 30%;
        height: 45px;
        justify-content: flex-end;
      }
    }
  }
}
</style>
