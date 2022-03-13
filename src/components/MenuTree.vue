<template>
  <div v-for="item in menuList">
      <el-submenu  :disabled="item.disabled" :index="item.id+''" v-if="item.children.length>0" :key="item.id+''">
        <template #title style="padding-left:30px">
          <i :class="item.icon"></i>
          <span>{{ item.menuName}}</span>
        </template>
        <MenuTree :menu-list="item.children"/>
      </el-submenu>
<!--    :disabled="item.disabled"-->
      <el-menu-item
          v-else
          :index="item.url+''"
          :route="item.url"
          @click="savePath(item.url)"
          :key="item.id+''"
          style="padding-left: 50px;"
      >
        <i :class="item.icon"></i>
        <span>{{item.menuName}}</span>
      </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "MenuTree",
  props: ["menuList"],
  data() {
    return {
    };
  },
  methods:{
    //保存激活路径
    savePath(path) {
      window.sessionStorage.setItem("activePath", path);
      this.activePath = path;
    },

  },
  beforeMount() {},
  created() {
  }
}
</script>

<style scoped>
/*溢出处理*/
.el-menu--collapse span,
.el-menu--collapse i.el-submenu__icon-arrow {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
