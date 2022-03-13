<template>
  <div style="width: 99%; height: 200px;">
    <el-image class="img" :src="excInfo.imgURL" :fit="fit"></el-image>
    <div>
      <div class="name">
        {{ excInfo.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
      excInfo:Object
  },
};
</script>
<style lang="less">
.brief {
  width: 200px;
  height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.img {
  width: 100%;
  height: 150px;
  border: 1px solid #ffffff;
  border-radius: 35px;
}
.name {
  width: 100%;
  height: 50px;
  font-size: 13px;
  text-align: center;
}
</style>