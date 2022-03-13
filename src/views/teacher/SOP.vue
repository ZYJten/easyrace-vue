<template>
  <div>
    <div class="address">
      <span class="span">指导书</span>
      <el-breadcrumb separator="/" style="float: right;line-height: 40px;margin-right: 10px">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">指导书</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="report_app">
      <el-card class="box-card">
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
                label="发起时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="sop"
                label="状态"
                width="150">
              <template #default="scope">
                <span v-if="scope.row.sop!=null">已提交</span>
                <span v-else>待提交</span>
              </template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                min-width="175px">
              <template #default="scope">
                <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-upload"
                    @click="isShow = true">提交指导书</el-button>
                <el-button
                    v-if="scope.row.sop!=null"
                    size="mini"
                    type="info"
                    plain
                    icon="el-icon-view"
                    @click="openWin(scope.row)">查看指导书</el-button>
              </template>
<!--              handleEdit(scope.$index, scope.row)-->
            </el-table-column>
          </el-table>
        </el-table-bar>
      </el-card>
      <!--        弹出框-->
      <el-dialog title="指导书" v-model="isShow">
        <el-form :model="raceInfo">
          <el-form-item label="指导书文件上传" :label-width="formLabelWidth">
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
                  请上传指导书
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer #default="scope">
            <span class="dialog-footer">
              <el-button @click="isShow = false">取 消</el-button>
              <el-button type="primary" @click="saveSOP;isShow=false">确 定</el-button>
            </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getList,saveSOP,getInfoById} from "@/api/race";

export default {
  name: "SOP",
  data() {
    return {
      isShow: false,
      loading: true,
      raceReport: [],
      formLabelWidth: '120px',
      SOP:'',
      id: '',
    }
  },
  methods: {
    success(response, file, fileList){
      this.SOP = response.message
    },
    openWin(row) {
      let basepath = "https://view.officeapps.live.com/op/view.aspx?src="
      // let routeData = this.$router.resolve({ path: basepath+this.raceReport.sop });
      window.open(basepath+row.sop, '_blank')
    },
    async saveSOP() {
      const {data:res} = await saveSOP(this.SOP,this.id)
      console.log(this.SOP)
    },
    // async openValue(row) {
    //   this.id = row.infoId
    //   const {data:res} = await getInfoById(row.infoId)
    //   console.log("aaaa", row)
    //   this.raceReport.sop = res.data.data.sop
    // },
    async getReportList() {
      const {data: res} = await getList()
      this.raceReport = res.data.data
      this.loading = false
    },
  },
  mounted() {
    this.getReportList()
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
