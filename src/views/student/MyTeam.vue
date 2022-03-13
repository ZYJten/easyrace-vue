<template>
  <div id="myteam_app">
    <div class="box-card">
      <el-row>
        <el-col :span="22"></el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-plus" circle @click="handleAdd"></el-button>
        </el-col>
      </el-row>
      <el-table
          :data="teams"
          style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="队长">
                <span>{{ props.row.captain }}</span>
              </el-form-item>
              <el-form-item label="副队长">
                <span>{{ props.row.viceCaptain }}</span>
              </el-form-item>
              <el-form-item v-for="item in props.row.name" label="成员">
                <span>{{ item }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="队伍名称"
            prop="teamName">
        </el-table-column>
        <el-table-column
            label="目标竞赛"
            prop="raceName">
        </el-table-column>
        <el-table-column
            label="宣言"
            prop="teamSlogan">
        </el-table-column>
        <el-table-column
            label="人数"
            prop="member"
            width="80">
          <template #default="scope">
            <span>
              {{ member + 1 }}/5
            </span>
          </template>
        </el-table-column>
        <el-table-column
            label="操作">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-thumb" size="mini" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    Digloh-->
    <el-dialog title="创建队伍" v-model="isShow">
      <el-form :model="teamForm">
        <el-form-item label="队伍名称" :label-width="formLabelWidth">
          <el-input v-model="teamForm.teamName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="目标竞赛" :label-width="formLabelWidth">
          <el-select v-model="teamForm.raceId" filterable placeholder="请选择" style="width: 60%">
            <el-option
                v-for="item in races"
                :key="item.id"
                :label="item.raceName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宣言" :label-width="formLabelWidth">
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="teamForm.teamSlogan">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取 消</el-button>
          <el-button type="primary" @click="toCreate('teamForm')">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {racing} from "@/api/race";
import {all, create} from "@/api/myrace";

export default {
  name: "MyTeam",
  data() {
    return {
      isShow: false,
      formLabelWidth: '120px',
      teamForm: {
        teamName: '',
        raceId: '',
        teamSlogan: ''
      },
      teams: [],
      races: [],
      member: ''
    }
  },
  methods: {
    handleAdd() {
      this.isShow = true
      this.racingName()
    },
    async racingName() {
      const {data: res} = await racing()
      this.races = res.data.data
    },
    async toCreate(From) {
      const {data: res} = await create(this.teamForm)
      console.log(res)
      if (res.code !== 200) {
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
      this.teamList()
    },
    async teamList() {
      const {data: res} = await all()
      this.teams = res.data.data
      if (res.data.data.member == null) {
        this.member = 0
      }
      console.log(res)
    }
  },
  created() {
    this.teamList()
  }
}
</script>

<style lang="less" scoped>
#myteam_app {
  width: 90%;
  margin: 50px 50px;

  .box-card {
    width: 100%;
    height: 100%;

    .text {
      font-size: 14px;
    }

    .item {
      padding: 18px 0;
    }

    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
