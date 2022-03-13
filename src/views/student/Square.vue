<template>
  <div id="square_app">
    <el-card class="box-card">
      <el-table
          :data="lists.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
        <el-table-column
            label="队伍名称"
            prop="teamName">
        </el-table-column>
        <el-table-column
            label="创建时间"
            prop="createTime">
        </el-table-column>
        <el-table-column
            label="人数"
            prop="member">
          <template #default="scope">
            <span v-if="scope.row.member === null">0</span>
            /5
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
          </template>
          <template #default="scope">
            <el-button type="primary" size="mini" icon="el-icon-s-promotion" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {ListAll} from "@/api/myrace";

export default {
  name: "Square",
  data() {
    return {
      lists: [],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    async getLists() {
      const {data:res} = await ListAll()
      this.lists = res.data.data
      console.log(res)
    }
  },
  created() {
    this.getLists()
  }
}
</script>

<style lang="less" scoped>
#square_app {
  padding: 20px;
  .box-card {
    width: 100%;
    height: 100%;
  }
}
</style>
