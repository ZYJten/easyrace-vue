<template>
  <el-page-header @back="goBack" content="详情页面">
  </el-page-header>
  <detailsS/>
</template>

<script>
import DetailsS from "@/views/student/DetailsS";

export default {
  name: "PageHeader",
  components: {DetailsS},
  methods: {
    goBack() {
      this.$router.push('/homeS')
    }
  }
}
</script>

<style scoped>
  .el-page-header{
    padding: 20px;
    background-color: white;
  }
  .el-main{
    padding: 0;
  }
</style>
