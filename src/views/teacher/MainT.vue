<template>
  <el-container class="home_container">
    <el-aside :width="isCollapse?'70px':'210px'">
      <el-scrollber style="height: 100%">
        <!--logo和项目名称-->
        <div class="logo_box">
          <span>EasyRace</span>
        </div>
        <el-menu
            :uniqueOpened="true"
            :default-active="activePath"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#464c52"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true">
          <MenuTree :menu-list="MenuList"/>
        </el-menu>
      </el-scrollber>

    </el-aside>
    <el-container>
      <el-header>
        <!--      展开/收起-->
        <div class="left_box"
             @click="toggle">
          <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"/>
        </div>
        <!--用户头像与操作-->
        <div class="right_box">
          <el-dropdown>
            <img :src="userInfo.avatar">
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout" icon="el-icon-switch-button">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <el-scrollbar>
          <router-view :UserInfo="userInfo"/>
        </el-scrollbar>
      </el-main>
<!--      <el-footer>Footer</el-footer>-->
    </el-container>
  </el-container>
</template>

<script>
import MenuTree from "@/components/MenuTree";
import {createMenuT,createMenuS} from '@/api/menu'
import {doLogout, getUserInfo} from "@/api/login";
import { mapMutations } from 'vuex'
import { USERLOGOUT } from '@/store/types'

export default {
  name: "Main",
  components: { MenuTree },
  data() {
    return{
      isCollapse: false,
      activePath: '/welcome',
      MenuList: [],
      userInfo:{},
    };
  },
  methods: {
    ...mapMutations([USERLOGOUT]),
    toggle(){
      this.isCollapse = !this.isCollapse
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async logout() {
      var res = await this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消退出登入"
        });
      });
      if (res == "confirm") {
        const res = await doLogout();
        console.log(res)
        if (res.data.code === 200){
          this.$message.success({
            showClose: true,
            message: res.data.message,
            center: true,
            duration: 1000
          })
          this[USERLOGOUT]()
          this.$router.push("/login");
        }
      }
    },
    async getMenuInfo(){
      const {data:res} = await createMenuT()
      //获取菜单失败
      if (res.code !== 200) {
        //展示权限不足的网页
        this.$router.push("/401error");
        return this.$message.error({
          showClose: true,
          message: res.message,
          center: true,
          duration: 1000
        })
      }
      this.MenuList = res.data.menu
    },
    async getUserInfo(){
      const {data:info} = await getUserInfo()
      console.log("info", info)
      this.userInfo = info.data.data;
      console.log("ad", this.userInfo.avatar)
    },
  },
  mounted(){
    this.getUserInfo();
  },
  created() {
    this.getMenuInfo()
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
</script>
<style>
.el-menu-vertical-demo{
  border-bottom: none;
}
.el-main {
  /*width: 100%;*/
  /*height: 100px;*/
  /*background: aliceblue;*/
  white-space: nowrap;
}
.el-scrollbar {
  height: 100%;
}
.box  .el-scrollbar__wrap {
  overflow: scroll;
  width: 110%;
  height: 120%;
}
</style>
<style lang="less" scoped>
  .home_container {
    width: 100%;
    height: 100%;
    //color: #555353;
  }
  /*头部样式*/
  .el-header {
    background-color: #bfc2c4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 19px;
    padding-left: 0;
    .left_box{
      display: flex;
      align-items: center;
      color: #E9EEF3;
      cursor: pointer;
      i{
        margin-left: 10px;
        font-size: 20px;
      }
      span{
        margin-left: 5px;
      }
    }
    .right_box{
      .el-dropdown>img{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: #FFF;
        background-size: contain;
      }
    }
  }
  /*页尾*/
  .el-footer {
    background-color: #eaeaea;
    color: #333333;
    text-align: center;
    max-height: 40px;
  }
  /*侧边栏*/
  .el-aside {
    background-color: #464c52;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      //width: 200px;
      //min-height: 400px;
    }
    .el-menu{
      border-right: none;
    }
    .logo_box{
      background-color: #79838d;
      height: 60px;
      font-size: 15px;
      font-weight: bold;
      line-height: 60px;
      color: #FFFFFF;
      //letter-spacing: 0.2em;
      text-align: center;
    }
  }
  /*主体*/
  .el-main {
    padding: 0;
    background-color: #E9EEF3;
    //color: #333;
    //text-align: center;
    //line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  /*下拉菜单样式*/
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
