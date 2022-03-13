<template>
  <div>
    <div class="address">
      <span class="span">申请报告</span>
      <el-breadcrumb separator="/" style="float: right;line-height: 40px;margin-right: 10px">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">申请报告</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="report_app">
      <!--    卡片内容-->
      <el-card class="box-card">
        <el-form :inline="true" :model="userVo" size="mini" class="demo-form-inline">
<!--          <el-form-item label="学院" label-width="70px">-->
<!--            <el-select clearable v-model="userVo.departmentId" placeholder="请选择">-->
<!--              <el-option-->
<!--                  v-for="item in colleges"-->
<!--                  :key="item.id"-->
<!--                  :label="item.collegeName"-->
<!--                  :value="item.id">-->
<!--                <span style="float: left">{{ item.collegeName }}</span>-->
<!--                <span style="float: right; color: #8492a6; font-size: 13px">-->
<!--                  <span class="el-tag el-tag&#45;&#45;success el-tag&#45;&#45;mini el-tag&#45;&#45;plain">{{ item.collegeCount }}</span>-->
<!--                </span>-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="竞赛名称" label-width="70px">
            <el-input clearable v-model="collegeVO.collegeName" placeholder="请输入竞赛名称"></el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" icon="el-icon-refresh" @click="resetFrom">重置</el-button>
            <el-button type="success" icon="el-icon-search" @click="getList">查询</el-button>
            <el-button type="info" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
            <el-button type="warning" icon="el-icon-download">导出</el-button>
          </el-form-item>
        </el-form>
<!--        弹出框-->
        <el-dialog title="申请报告" v-model="dialogFormVisible">
          <el-form :model="raceform">
            <el-form-item label="竞赛名称" :label-width="formLabelWidth">
              <el-input v-model="raceform.raceName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="竞赛类别" :label-width="formLabelWidth">
              <el-select v-model="raceform.type" placeholder="请选择竞赛类别">
                <el-option
                    v-for="item in types"
                    :label="item.typeName"
                    :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="竞赛形式" :label-width="formLabelWidth">
              <el-radio-group v-model="raceform.raceClass">
                <el-radio label="个人赛">个人赛</el-radio>
                <el-radio label="团队赛">团队赛</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="学院" :label-width="formLabelWidth">
              <el-select v-model="raceform.collegeId" placeholder="请选择学院">
                <el-option
                    v-for="item in colleges"
                    :label="item.collegeName"
                    :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评审教师" :label-width="formLabelWidth">
              <el-select v-model="raceform.assessor" placeholder="请指定评审教师">
                <el-option
                    v-for="item in assessors"
                    :label="item.assessor"
                    :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addList('raceform')">确 定</el-button>
            </span>
          </template>
        </el-dialog>
        <!--      表格装饰物-->
        <div class="table_tool">
          <div style="float: left;margin-left: 15px">
            <el-button size="mini" icon="el-icon-refresh-right"></el-button>
          </div>
          <div style="float: right;margin-right: 15px">
            <el-button size="mini" icon="el-icon-s-operation"></el-button>
            <el-button size="mini" icon="el-icon-upload2"></el-button>
            <el-button size="mini" icon="el-icon-printer"></el-button>
          </div>
        </div>
        <el-table-bar>
          <el-table
              :header-cell-style="{background:'#eeeeee'}"
              :data="raceReport"
              v-loading="loading"
              class="tableClass"
              :row-style="{height: '35px'}"
              :cell-style="{padding: '0'}"
              border
          >
            <el-table-column
                fixed
                type="index"
                label="序号"
                width="110"
                :index="indexMethod">
            </el-table-column>
            <el-table-column
                prop="raceName"
                label="竞赛名称"
                width="300">
            </el-table-column>
            <el-table-column
                prop="creator"
                label="发起人"
                width="110">
            </el-table-column>
            <el-table-column
                sortable
                prop="submitTime"
                label="提交时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="150">
              已通过
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                min-width="175px">
              <template #default="scope">
                <el-button
                    size="mini"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-setting"
                    @click="handleInfo(scope.$index, scope.row)"></el-button>
                <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-table-bar>
<!--        <el-pagination-->
<!--            style="padding-top: 15px"-->
<!--            @size-change="handleSizeChange"-->
<!--            @current-change="handleCurrentChange"-->
<!--            :current-page="currentPage"-->
<!--            :page-sizes="[5, 10, 15, 20]"-->
<!--            :page-size="pageSize"-->
<!--            layout="total, sizes, prev, pager, next, jumper"-->
<!--            :total="total">-->
<!--        </el-pagination>-->
      </el-card>
      <!--    表格内容-->
      <!--      <el-card class="box-card-next">-->
      <!--        -->
      <!--      </el-card>-->
    </div>

  </div>
</template>

<script>
import {findType, addRaceReport, selectAll, getAssessors} from "@/api/race";
import {findColAndCount} from "@/api/depat";


export default {
  name: "Report",
  data() {
    return {
      collegeVO: {},
      colleges: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px',
      types: [],
      raceform: {
        raceName: '',
        type: '',
        raceClass: '',
        collegeId: '',
      },
      loading: true,
      raceReport: [],
      assessors: [],
    }
  },
  methods: {
    resetFrom() {
      this.collegeVO={}
    },
    indexMethod(index) {
      return index + 1;
    },
    async getType(){
      const {data:res} = await findType()
      console.log("getType", res)
      this.types = res.data.raceType
    },
    async getColleges(){
      const {data:res} = await findColAndCount()
      console.log("getColleges", res)
      this.colleges = res.data.data
    },
    async getAssessors(){
      const {data:res} = await getAssessors()
      console.log(res)
      this.assessors = res.data.data
    },
    async addList(Form) {
      const {data:res} = await addRaceReport(this.raceform)
      console.log("addList", res)
      console.log("raceform", this.raceform)
      if(res.code !== 200){
        this.$message.error({
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
      this.dialogFormVisible = false
      this.getReportList()
    },
    async getReportList() {
      const {data:res} = await selectAll()
      console.log("getReportList", res)
      this.raceReport = res.data.raceList
      this.loading = false
    }
  },
  mounted() {
    this.getType()
    this.getAssessors()
    this.getColleges()
    this.getReportList()
  },
  created() {

  }
}
</script>

<style lang="less" scoped>
#report_app {
  padding: 20px;
}

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

.box-card {
  margin-top: 10px;
  //.tableClass .cell{
  //  padding: 0 !important;
  //  width: 100%;height: 450px;line-height: 20px;
  //}
  .table_tool {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #eeeeee;

    .el-button {
      padding: 7px;
    }
  }

  .top {
    text-align: center;
  }
}
</style>
