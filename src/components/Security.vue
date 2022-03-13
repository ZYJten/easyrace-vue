<template>
  <div id="security_app">
<!--    <div class="address">-->
<!--      <span class="span">安全中心</span>-->
<!--      <el-breadcrumb separator="/" style="float: right;margin: 10px;padding-right: 10px">-->
<!--        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item><a href="/">安全中心</a></el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
<!--    </div>-->
    <div class="mail">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>安全邮箱</span>
          </div>
        </template>
        <ul>
          <li>安全邮箱是账号归属的唯一凭证。当忘记密码时，你可以通过安全邮箱找回密码。可设置该邮箱是否接收系统待办</li>
          <li>消息提醒，如果需要开启邮箱消息提醒功能请在“个人设置-安全中心”中开启。</li>
        </ul>
        <el-button class="button" @click="openEmail" type="text">绑定</el-button>
      </el-card>
    </div>
    <div class="change">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>密码修改</span>
          </div>
        </template>
        <ul>
          <li>定期修改登录密码有助于账号的安全。</li>
        </ul>
        <el-button class="button"  @click="openPwd" type="text">修改密码</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Security",
  methods: {
    openEmail() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    openPwd() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的密码是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  }
}
</script>

<style lang="less" scoped>
#security_app{ padding: 0}
  .address {
    height: 40px;
    background-color: white;
    line-height: 40px;
    padding-left: 20px;
    .span {
      padding-left: 5px;
      border-left: #ffd04b 5px solid;
    }
  }
.card-header {
  font-size: 20px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
  .mail{
    margin: 20px;
  }
  .change{
    margin: 20px;
  }
</style>
