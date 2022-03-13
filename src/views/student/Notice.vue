<template>
  <div id="notice_app">
    <el-card class="box-card">
      <el-table
          :data="notice.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="公告标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="公告内容">
                <span>{{ props.row.content }}</span>
              </el-form-item>
              <el-form-item label="文件预览">
                <span @click="download(props.row.file)" readonly="true">{{ props.row.file }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="公告"
            prop="title">
        </el-table-column>
        <el-table-column
            label="竞赛"
            prop="raceName">
        </el-table-column>
        <el-table-column
            label="发布时间"
            prop="createTime">
        </el-table-column>
        <el-table-column
            label="发布人"
            prop="name">
        </el-table-column>
        <el-table-column
            align="right">
          <template #header>
            <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
          </template>
<!--          <template #default="scope">-->
<!--            <el-button-->
<!--                size="mini"-->
<!--                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>-->
<!--            <el-button-->
<!--                size="mini"-->
<!--                type="danger"-->
<!--                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>-->
<!--          </template>-->
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {list} from "@/api/notice";

export default {
  name: "Notice",
  data() {
    return {
      notice: [],
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
    download(url) {
      window.open(url)
    },
    async list() {
      const {data:res} = await list()
      this.notice = res.data.data
      console.log(res)
    }
  },
  created() {
    this.list()
  }
}
</script>

<style lang="less" scoped>
#notice_app {
  padding: 20px;
  .box-card {
    width: 100%;
    height: 100%;
  }
}
</style>
