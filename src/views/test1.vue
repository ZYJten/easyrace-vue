<template>
  <div>
    <div class="box">
      <el-scrollbar :native="false">
        <p>刚好项目里面一直在使用的都是element</p>
        <p>因为原生的滚动条太丑了</p>
        <p>发现elementui中有个隐藏的组件</p>
        <p>优化滚动条样式</p>

        <p>亲测可用</p>
        <p>亲测可用</p>
        <p>亲测可用</p>
        <p>亲测可用</p>
        <p>亲测可用</p>
        <p>亲测可用</p>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import Test from "@/components/test";
export default {
  name: "test1",
  components: {Test},
  data(){
    return{
      logo: [{
        children: 'awd'
      }]
    }
  }
}
</script>
<style>
.box {
  width: 200px;
  height: 100px;
  background: aliceblue;
  white-space: nowrap;
}

.el-scrollbar {
  height: 100%;
}
/*.el-scrollbar__wrap {*/
/*  overflow: scroll;*/
/*  width: 110%;*/
/*  height: 120%;*/
/*}*/
</style>
<style scoped>

</style>
