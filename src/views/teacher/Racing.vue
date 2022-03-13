<template>
  <div>
    <div class="address">
      <span class="span">进行赛事</span>
      <el-breadcrumb separator="/" style="float: right;margin: 10px;padding-right: 10px">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">进行赛事</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="racing_app">
      <!--      表格内容-->
      <el-card class="box-card-next">
        <el-table
            :header-cell-style="{background:'#e6e9ea'}"
            :data="racingList"
            v-loading="loading"
            class="tableClass"
            :row-style="{height: '35px'}"
            :cell-style="{padding: '0'}"
            border>
          <template #empty>
            <el-empty description="author：NaiGoo"></el-empty>
          </template>
            <el-table-column
                fixed
                type="index"
                label="序号"
                width="50"
                :index="indexMethod">
            </el-table-column>
            <el-table-column
                sortable
                prop="raceName"
                label="竞赛"
                width="300">
            </el-table-column>
            <el-table-column
                prop="creatorT"
                label="评审教师"
                width="110">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束时间"
                width="200"
                :formatter="dateFormat">
            </el-table-column>
          <el-table-column
              prop="typeName"
              label="竞赛类型"
              width="100">
          </el-table-column>
          <el-table-column
              prop="raceClass"
              label="竞赛形式"
              width="100">
          </el-table-column>
          <el-table-column
              prop="count"
              label="报名人数"
              width="100">
          </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                min-width="200px">
              <template #default="scope">
<!--                <el-button-->
<!--                    size="mini"-->
<!--                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>-->
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleUp(scope.$index, scope.row)">发布公告</el-button>
              </template>
            </el-table-column>
        </el-table>
      </el-card>
      <!--        弹出框-->
      <el-dialog title="详细信息" v-model="isShow">
        <el-form :model="notice">
          <el-form-item label="公告标题" :label-width="formLabelWidth">
            <el-input v-model="notice.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公告内容" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="notice.content">
            </el-input>
          </el-form-item>
          <el-form-item label="附件" :label-width="formLabelWidth">
            <el-upload
                class="upload-demo"
                drag
                action="http://localhost:8081/system/AliOss/upload"
                :on-success="success"
                multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">
                  如果不需要可以不上传
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="isShow = false">取 消</el-button>
              <el-button type="primary" @click="toUp()">确 定</el-button>
            </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Personal from "@/components/Personal";
import {getInfoList} from "@/api/race";
import Moment from 'moment'
import {up} from "@/api/notice";

export default {
  name: "Racing",
  data() {
    return {
      isShow: false,
      value: true,
      size: 10,
      total: 100,
      loading: true,
      racingList: [],
      colleges: [],
      currentPage: 1,
      notice:{
        title:'',
        content:'',
        file: ''
      },
      formLabelWidth: "120px",
      id:''
    }
  },
  components: {
    Personal
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    success(response, file, fileList){
      this.notice.file = response.message
      console.log(this.notice.file)
    },
    //页内条数变化时
    handleSizeChange(val) {
      this.size = val;
      this.getUsersList();
    },
    //当前第几页的变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUsersList();
    },
    // 按钮点击事件 显示新增编辑弹窗组件
    showDialog() {
      this.isShow = true
    },
    dateFormat(row, colum, cellValue, index){
      var date = row[colum.property];
      return Moment(date).format("YYYY年MM月DD日")
    },
    showAddOrUpdate(date) {
      this.isShow = date !== false;
    },
    indexMethod(index) {
      return index + 1;
    },
    handleUp(index, row){
      this.id = row.id
      this.isShow = true
    },
    async toUp() {
      const {data:res} = await up(this.notice,this.id)
      if(res.code!==200){
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
      this.isShow = false
    },
    iRowStyle({row, rowIndex}) {
      return 'height:20px';
    },
    resetUserVo() {
      this.userVo = {}
    },
    async getRacingList() {
      const {data:res} = await getInfoList()
      this.racingList = res.data.data
      this.loading = false
    }
  },
  created() {
    this.getRacingList()
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

#racing_app {
  padding: 20px;
}

.box-card-next {
  margin-top: 10px;

  .tableClass .cell {
    padding: 0 !important;
    width: 100%;
    height: 450px;
    line-height: 20px;
  }
}
</style>
