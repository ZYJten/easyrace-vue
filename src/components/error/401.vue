<template>
  <div id="401_app">
    <div class="add">
      <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="8">
          <ul>
            <li class="li1">无权访问该页面</li>
            <li class="li2">错误代码:3001</li>
            <li><el-button type="primary" round @click="toLogin">返回登录界面</el-button></li>
          </ul>
        </el-col>
        <el-col :span="8">
          <el-image :src="src">
            <template #placeholder>
              <div class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </template>
          </el-image>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "401",
  data(){
    return {
      src: require('@/assets/error/401.gif')
    }
  },
  methods: {
    toLogin(){
      this.$router.push("/login")
    }
  }
}
</script>

<style lang="less" scoped>
  .add{
    width: 80%;
    height: 80%;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    ul{
      .li1{font-size: 40px;
            margin-top: 100px}
      .li2{font-size: 14px;
            margin-top: 20px}
      .el-button{
        margin-top: 100px;
      }
    }
  }
</style>
