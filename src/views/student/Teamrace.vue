<template>
  <div id="myrace_app">
    <el-card class="box-card">
      <el-row>
        <el-col :span="22"></el-col>
        <el-col :span="2">
        </el-col>
      </el-row>
      <el-table
          :data="MyRace"
          style="width: 100%">
        <el-table-column
            label="竞赛名称"
            prop="raceName">
        </el-table-column>
        <el-table-column
            label="开始时间"
            prop="createTime">
        </el-table-column>
        <el-table-column
            label="结束时间"
            prop="endTime">
        </el-table-column>
        <el-table-column
            label="我的作品"
            prop="workUrl">
          <template #default="scope">
            <span v-if="scope.row.work!=null">已提交</span>
            <span v-else>待提交</span>
          </template>
        </el-table-column>
        <el-table-column
            label="操作">
          <template #default="scope">
            <el-button
                v-if="scope.row.work===null"
                size="mini"
                icon="el-icon-upload2"
                circle
                @click="dialogFormVisible=true;handleEdit(scope.$index, scope.row)"></el-button>
            <el-button
                v-else
                size="mini"
                icon="el-icon-check"
                disabled
                type="success"
                circle
                @click="dialogFormVisible=true;handleEdit(scope.$index, scope.row)"></el-button>
            <el-button
                v-if="scope.row.work!==null"
                size="mini"
                icon="el-icon-download"
                type="primary"
                circle
                @click="handleDownload(scope.$index, scope.row)"></el-button>
            <el-button
                v-if="scope.row.work!==null"
                size="mini"
                icon="el-icon-delete"
                circle
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--        弹出框-->
    <el-dialog title="上传作品" v-model="dialogFormVisible">
      <el-form :model="FileWork">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入标题"
              v-model="FileWork.workTitle">
          </el-input>
        </el-form-item>
        <el-form-item label="作品" :label-width="formLabelWidth">
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
                请将作品说明书电子稿与作品一起压缩后上传
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="uploadFile('FileWork')">确 定</el-button>
            </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {MyRace, MyTeamRace, uploadFile} from "@/api/myrace";

export default {
  name: "Teamrace",
  data() {
    return {
      MyRace:[],
      dialogFormVisible: false,
      FileWork:[{
          workTitle:'',
          workUrl:'',
        }],
      formLabelWidth: '120px'
    }
  },
  methods: {
    success(response, file, fileList){
      console.log("狗子", response)
      this.FileWork.workUrl = response.message
    },
    handleDownload(index, row){
      alert(row.workUrl)
      window.open(row.workUrl)
    },
    // async getMyRaceList() {
    //   const {data:res} = await MyTeamRace()
    //   this.MyRace = res.data.data
    //   console.log("MyRace", res)
    // },
    async uploadFile(from) {
      const {data:res} = await uploadFile(this.FileWork, this.MyRace[0].id)
      if(res.code===200){
        this.$message.success({
          showClose: true,
          message: res.message,
          center: true,
          duration: 1000
        })
      }else{
        return this.$message.error({
          showClose: true,
          message: res.message,
          center: true,
          duration: 1000
        })
      }
      // console.log(this.MyRace[0].id)
      this.dialogFormVisible = false
      this.getMyRaceList()
    },
  },
  mounted() {
    this.getMyRaceList()
  },
}
</script>

<style lang="less" scoped>
#myrace_app {
  width: 90%;
  margin: 50px auto;
  .box_card {
    width: 100%;
    height: 100%;
  }
}
</style>
