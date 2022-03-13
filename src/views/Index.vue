<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="2">
          <span style="font-size: 30px;color: white">DataCastle</span></el-col>
        <el-col :span="21">
          <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              style="border-bottom: none;display:flex;justify-content:center"
              mode="horizontal"
              background-color="#37567f"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="handleSelect"
              :router="true">
            <el-menu-item index="/home" value="/home">首页</el-menu-item>
            <el-menu-item index="2">导师团队</el-menu-item>
            <el-submenu index="3">
              <template #title>帮助</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="1">
          <el-image
              @click="$router.push('/login')"
              style="width: 40px; height: 40px;border-radius: 50%;margin:10px auto"
              :src="url"
              :fit="fit"></el-image>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view/>
      <div style="height: 300px;background-color: #3d3d3d">
        <el-row>
          <el-col :span="14">
            <i class="badge"></i>
            <el-row class="left_bottom">
              <el-col :span="4"></el-col >
              <el-col :span="4">
                <dl><dt>友情链接</dt>
                  <dd><a>学校首页</a></dd>
                  <dd><a>学校新闻网</a></dd>
                  <dd><a>图书馆</a></dd></dl>
              </el-col>
              <el-col :span="4">
                <dl><dt>服务支持</dt>
                  <dd><a>学校首页</a></dd>
                  <dd><a>学校新闻网</a></dd>
                  <dd><a>图书馆</a></dd></dl>
              </el-col>
              <el-col :span="4">
                <dl><dt>关于我们</dt>
                  <dd><a>学校首页</a></dd>
                  <dd><a>学校新闻网</a></dd>
                  <dd><a>图书馆</a></dd></dl>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10" class="right-bottom">
            <el-row>
              <el-col :span="12">
                <dl><dd>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-kefu"></use>
                  </svg>
                  在线客服</dd>
                  <dd>服务热线</dd>
                  <dd>学生热线</dd>
                  <dd>项目地址</dd>
                  <dd>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-gitee-fill-round"></use>
                    </svg>
                    <span style="margin-left: 10px"></span>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-github"></use>
                    </svg>
                  </dd></dl>
              </el-col>
              <el-col :span="12">
                <dl style="line-height: 10px">
                  <dd>添加微信</dd>
                  <dd>随时掌握最新动态</dd>
                  <dd>
                    <el-image
                        :src="require('@/assets/Images/erweima.png')"
                        fit="fit"></el-image></dd>
                </dl>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-footer>
      <span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhuzuoquan"></use>
      </svg>
      NaiGoo</span>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      activeIndex: '/home',
      fit: 'fill',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>
.icon{
  height: 30px;
  width: 30px;
}

.el-header {
  background-color: #37567f;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-footer{
  background-color: #5e5d5d;
  text-align: center;
  //line-height: 100px;
  height: 50px !important;
  color: white;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333333;
  text-align: center;
  line-height: 160px;
  .left_bottom {
    color: #EEEEEE;
    line-height: 20px;
    text-align: left;
    dl {
      //margin-left: 100px;
      dt {
        padding-left: 40px;
        padding-bottom: 20px;
      }
      dd {
        font-size: 14px;
        margin-top: 20px;
        color: #000000;
        a{
          color: #c9c9c7;
        }
      }
    }
  }
  .right-bottom{
    color: #EEEEEE;
    line-height: 20px;
    text-align: left;
    dl {
      padding-top: 20px;
      dd {
        font-size: 14px;
        margin-top: 20px;
      }
    }
  }

  .badge{
    display: block;
    height: 60px;
    width: 150px;
    margin-left: 180px;
    margin-top: 20px;
    background-image: url("../assets/Images/dhy.png");
    background-position: center center;
    background-size: 150px 60px;
    background-repeat: no-repeat;
  }
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
</style>
