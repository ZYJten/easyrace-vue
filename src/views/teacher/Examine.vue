<template>
  <div>
    <div class="address">
      <span class="span">作品评审</span>
      <el-breadcrumb separator="/" style="float: right;margin: 10px;padding-right: 10px">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">作品评审</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="examine_app">
      <el-card class="box-card">
        <el-table
            :data="racingList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            :header-cell-style="{background:'#e6e9ea'}"
            :row-style="{height: '35px'}"
            :cell-style="{padding: '0'}"
            style="width: 100%">
          <el-table-column label="竞赛">
            <template #header>
              <el-select v-model="value" @change="forList" placeholder="请选择">
                <el-option
                    v-for="item in racingName"
                    :key="item.id"
                    :label="item.raceName"
                    :value="item.id">
                </el-option>
              </el-select>
            </template>
            <el-table-column
                label="学生账号"
                prop="username">
            </el-table-column>
            <el-table-column
                label="学生姓名"
                prop="name">
            </el-table-column>
            <el-table-column
                label="提交时间"
                prop="uploadTime">
            </el-table-column>
            <el-table-column
                label="最后提交时间"
                prop="updataTime">
            </el-table-column>
            <el-table-column
                label="是否提交"
                prop="workUrl">
              <template #default="scope">
                <span v-if="scope.row.workUrl==null">未提交</span>
                <span v-else>已提交</span>
              </template>
            </el-table-column>
            <el-table-column
                label="是否组队"
                prop="TeamId">
              <template #default="scope">
                <span v-if="scope.row.TeamId==null">未组队</span>
                <span v-else>组队</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column>
            <template #header>
              <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
            </template>
            <el-table-column
                label="操作">
              <template #default="scope" >
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button
                    size="mini"
                    type="primary"
                    @click="handlePs(scope.$index, scope.row)">评审</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-card>
      <!--        查看弹出框-->
      <el-dialog title="作品信息" v-model="dialogFormVisible">
        <el-form :model="raceInfo">
          <el-form-item label="标题">
            <el-input v-model="raceInfo.workTitle" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="最后提交时间" :label-width="formLabelWidth" disabled>
            <el-input v-model="raceInfo.updataTime" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="作品下载" :label-width="formLabelWidth">
            <el-input @click="download(raceInfo.workUrl)" v-model="raceInfo.workUrl" readonly="true"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--        评审弹出框-->
      <el-dialog title="评审内容" v-model="psShow">
        <el-form :model="review">
          <el-form-item label="作品标题" :label-width="formLabelWidth">
            <el-input v-model="raceInfo.workTitle" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="学生" :label-width="formLabelWidth">
            <el-input v-model="raceInfo.name" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="美观度" :label-width="formLabelWidth">
            <el-rate
                v-model="review.beauty"
                :icon-classes="iconClasses"
                void-icon-class="icon-rate-face-off"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </el-form-item>
          <el-form-item label="适用性" :label-width="formLabelWidth">
            <el-rate
                v-model="review.applicability"
                :icon-classes="iconClasses"
                void-icon-class="icon-rate-face-off"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </el-form-item>
          <el-form-item label="内容思想" :label-width="formLabelWidth">
            <el-rate
                v-model="review.expression"
                :icon-classes="iconClasses"
                void-icon-class="icon-rate-face-off"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </el-form-item>
          <el-form-item label="评语" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入点评内容"
                v-model="review.comment">
            </el-input>
          </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="psShow = false">取 消</el-button>
              <el-button @click="toReview('review')" type="primary">确 定</el-button>
            </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getByInfoId, racing, racingList} from "@/api/race";
import {toReview} from "@/api/result";

export default {
  name: "Examine",
  data() {
    return {
      value: '',
      formLabelWidth: '120px',
      racingName: [],
      racingList:[],
      search: '',
      dialogFormVisible: false,
      psShow: false,
      raceInfo: [],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      value1: null,
      review:{
        beauty:'',
        applicability:'',
        expression: '',
        comment:''
      }
    }
  },
  methods: {
    async toReview(Form) {
      console.log(this.review)
      const {data:res} = await toReview(this.review,this.raceInfo.student)
      if(res.code !== 200){
        return this.$message.error({
          showClose: true,
          message: res.message,
          center: true,
          duration: 1000
        })
      }
      this.$message.success({
        showClose: true,
        message: res.message,
        center: true,
        duration: 1000
      })
      this.psShow = false
    },
    async handleEdit(index, row) {
      this.dialogFormVisible = true
      this.raceInfo = row
    },
    handlePs(index, row) {
      this.psShow = true
      this.raceInfo = row
    },
    async racing() {
      const {data:res} = await racing()
      this.racingName = res.data.data
    },
    async forList(id) {
      alert(id)
      const {data:res} = await racingList(id)
      this.racingList = res.data.data
    },
    download(url) {
      window.open(url)
    }
  },
  mounted() {
  },
  created() {
    this.racing()
  }
}
</script>

<style lang="less" scoped>
.address {
  height: 40px;
  background-color: white;
  line-height: 40px;
  padding-left: 20px;
  .span {
    padding-left: 5px;
    border-left: #ffd04b 5px solid;
  }
}
#examine_app {
  padding: 20px;
  .box-card {
    .text {
      font-size: 14px;
    }

    .item {
      padding: 18px 0;
    }
  }
  /deep/ .el-input__inner {
    width: 300px;
    background-color: rgba(255, 255, 255, 0.247);
    border: none;
  }
  .el-rate{
    line-height: 3;
  }
}
</style>
