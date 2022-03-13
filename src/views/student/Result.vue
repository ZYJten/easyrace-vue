<template>
  <div id="result_app">
    <div class="box-card">
      <el-table
          :data="result.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="美观">
                <el-rate
                    v-model="props.row.beauty "
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                </el-rate>
              </el-form-item>
              <el-form-item label="适用">
                <el-rate
                    v-model="props.row.applicability "
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                </el-rate>
              </el-form-item>
              <el-form-item label="内容">
                <el-rate
                    v-model="props.row.expression "
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                </el-rate>
              </el-form-item>
              <el-form-item label="评审教师">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="教师评语">
                <span>{{ props.row.comment }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="竞赛名称"
            prop="raceName">
        </el-table-column>
        <el-table-column
            label="作品标题"
            prop="workTitle">
        </el-table-column>
        <el-table-column
            label="评审结果"
            prop="score">
          <template #default="scope">
            <el-rate
                v-model="scope.row.score"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
          </template>
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
    </div>
  </div>
</template>

<script>
import {gainResult} from "@/api/result";

export default {
  name: "Result",
  data() {
    return {
      result: [],
      search: '',
      value: 3.67,
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    async gainResult() {
      const {data:res} = await gainResult()
      console.log(res)
      this.result = res.data.data
    }
  },
  created() {
    this.gainResult()
  }
}
</script>

<style lang="less" scoped>
#result_app {
  padding: 20px;
  .box-card {
    width: 100%;
    height: 100%;
  }
}
/deep/ .demo-table-expand {
  font-size: 0;
}
/deep/ .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
/deep/ .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
  //.el-rate{
  //  line-height: 3;
  //}


</style>
