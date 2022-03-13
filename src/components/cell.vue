<template>
  <div style="width: 25%; height: 200px;">
    <el-image class="img" :src="imgURL" :fit="fit"></el-image>
    <div>
      <div class="name">
        {{ name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgURl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      name: "2022年天津市科技杨帆竞赛xxxxxxxxxxxxxxxx",
      brief:
        "中国创新创业大赛港澳台赛作为中国创新创业大赛向外延伸的重要专业赛事和重要组成部分，于2014年设立并落地广东。大赛举办以来汇聚了近3100项港澳台项目参与赛事，组织近1500家企业考察广东40多个产业园区、孵化器、企业等，积极整合90多家专业服务机构，200多家金融机构和投资机构服务赛事项目，拉动银行及社会投资近30亿元。据不完全统计，港澳台赛已经促进270余家港澳台企业在广东落地发展，其中近30家企业已经获得社会融资，取得科技型中小企业、国家高新技术企业等资质。",
    };
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