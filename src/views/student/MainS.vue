<template>
  <el-container class="mainS_container">
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="block"
        mode="horizontal"
        active-text-color="#ffd04b"
        @select="handleSelect"
        :router="true"
      >
        <el-row>
          <el-col :span="2">
            <!-- <h3>报名系统</h3> -->
            <div style="margin-left:20px">
              <el-button  size="mini" round @click="asideOff"
              >收起/打开工作台</el-button
              >
            </div>
            
          </el-col>
          <el-col :span="21">
            <div style="display: flex; justify-content: center">
              <el-menu-item index="/homeS" value="/homeS">首页</el-menu-item>
              <el-menu-item index="/hot">热门</el-menu-item>
            </div>
          </el-col>
          <el-col :span="1">
            <el-menu-item style="float: right">
              <el-dropdown>
                <el-avatar
                  :size="40"
                  :src="userInfo.avatar"
                  style="margin: 10px"
                ></el-avatar>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="logout"
                      icon="el-icon-switch-button"
                      >退出</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-menu-item>
          </el-col>
        </el-row>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside v-if="asideOn" width="350px">
        <div class="block" style="height: 280px">
          <!-- 工作台 -->
          <div class="title">我的工作台</div>
          <el-row style="margin: 0px 20px; text-align: center">
            <el-col :span="12">
              <router-link to="/myrace">
                <div
                  class="menucell"
                  style="
                    border-bottom: 1px solid #bfc1c2;
                    border-right: 1px solid #bfc1c2;
                  "
                >
                  <i
                    class="el-icon-medal"
                    style="margin: 0px; padding: 0px"
                  ></i>
                  我的竞赛
                </div>
              </router-link>
            </el-col>
            <el-col :span="12">
              <router-link to="/myTeam">
                <div class="menucell" style="border-bottom: 1px solid #bfc1c2">
                  <i
                    class="el-icon-s-check"
                    style="margin: 0px; padding: 0px"
                  ></i>
                  我的团队
                </div>
              </router-link>
            </el-col>
          </el-row>
          <el-row style="margin: 0px 20px; text-align: center">
            <el-col :span="12">
              <router-link to="/result">
                <div class="menucell" style="border-right: 1px solid #bfc1c2">
                  <i
                    class="el-icon-pie-chart"
                    style="margin: 0px; padding: 0px"
                  ></i>
                  我的进度
                </div>
              </router-link>
            </el-col>
            <el-col :span="12">
              <router-link to="/personal">
                <div class="menucell">
                  <i class="el-icon-user" style="margin: 0px; padding: 0px"></i>
                  个人信息
                </div>
              </router-link>
            </el-col>
          </el-row>
        </div>
        <div class="block" style="height: 380px">
          <span class="asideleft2">浏览</span>
          <el-table
            :data="tableData"
            size="mini"
            style="width: 100%"
            height="300px"
            align="center"
          >
            <el-table-column prop="name" label="名称" width="220px">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="80px">
            </el-table-column>
          </el-table>
        </div>
        <!-- <el-scrollber style="width: 100%">
          <div
            style="
              height: 60px;
              background-color: white;
              line-height: 60px;
              text-align: center;
            "
          >
            <span>EasyRace</span>
          </div>
          <el-menu
            class="el-menuS"
            @open="handleOpen"
            :default-active="activePath"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-menu-item index="/homeS">
              <template #title>首页</template>
            </el-menu-item>
            <el-menu-item index="/hot">
              <template #title>热门</template>
            </el-menu-item>
          </el-menu>
          <el-menu
            :uniqueOpened="true"
            :default-active="activePath"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="white"
            text-color="#000"
            active-text-color="lightskyblue"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
          >
            <MenuTree :menuList="menuList" />
          </el-menu>
        </el-scrollber> -->
      </el-aside>
      <el-main class="block">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuTree from "@/components/MenuTree";
import { createMenuS } from "@/api/menu";
import { mapMutations } from "vuex";
import { USERLOGOUT } from "@/store/types";
import { doLogout, getUserInfo } from "@/api/login";
export default {
  name: "MainS",
  components: { MenuTree },
  data() {
    return {
      tableData: [
        {
          date: "05-02",
          name: "2022年天津市科技杨帆竞赛",
        },
        {
          date: "05-04",
          name: "2022年天津市科技杨帆竞赛",
        },
        {
          date: "05-01",
          name: "2022年天津市科技杨帆竞赛",
        },
        {
          date: "05-03",
          name: "2022年天津市科技杨帆竞赛",
        },
      ],
      asideOn: true,
      url: require("@/assets/Images/homebc.png"),
      header_input: "",
      isCollapse: false,
      activePath: "/homeS",
      menuList: [],
      userInfo: [
        {
          avatar:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        },
      ],
    };
  },
  methods: {
    ...mapMutations([USERLOGOUT]),
    async logout() {
      var res = await this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消退出登入",
        });
      });
      if (res === "confirm") {
        const res = await doLogout();
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success({
            showClose: true,
            message: res.data.message,
            center: true,
            duration: 1000,
          });
          this[USERLOGOUT]();
          this.$router.push("/login");
        }
      }
    },
    async getMenuInfo() {
      const { data } = await createMenuS();
      console.log("ssss", this.menuList);
      if (data.code !== 200) {
        this.$router.push("/401error");
        return this.$message.error({
          showClose: true,
          message: res.message,
          center: true,
          duration: 1000,
        });
      }
      this.menuList = data.data.menu;
    },
    async getUserInfo() {
      const { data: info } = await getUserInfo();
      console.log("info", info);
      this.userInfo = info.data.data;
    },
    getRole() {
      const a = this.$route.params.key;
      console.log("a", a);
      if (a !== "student") {
        this.$router.push("/401error");
        this.$message.error("请登录后操作");
      }
      this.getMenuInfo();
    },
    asideOff() {
      this.asideOn = this.asideOn ? false : true;
      // this.$refs.aside.width ="0px"
      this.$nextTick(() => {
        console.log(this.asideOn);
      });
    },
  },
  mounted() {
    this.getUserInfo();
  },
  created() {
    this.getMenuInfo();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>
<style>
.el-submenu__title {
  height: 50px;
  line-height: 50px;
}
</style>
<style lang="less" scoped>
.mainS_container {
  width: 100%;
  height: 100%;
}
.el-header {
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.list {
  margin: 18px;
  font-size: 13px;
}
.el-main {
  padding: 0px;
  box-sizing: content-box;
}
.menucell {
  padding: 30px 30px;
}
</style>
