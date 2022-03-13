<template>
  <div id="contestant_app">
    <!--    面包屑-->

    <!--    卡片内容-->
    <el-card class="box-card-top">
      <el-form :inline="true" :model="userVo" class="demo-form-inline">
        <el-form-item label="学院" label-width="70px">
          <el-select clearable v-model="userVo.collegeId" placeholder="请选择">
            <el-option
                v-for="item in colleges"
                :key="item.id"
                :label="item.collegeName"
                :value="item.id">
              <span style="float: left">{{ item.collegeName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">{{ item.collegeCount }}</span>
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" label-width="70px">
          <el-input clearable v-model="userVo.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-from-item label-width="70px">
          <el-radio v-model="userVo.sex" label="0">女</el-radio>
          <el-radio v-model="userVo.sex" label="1">男</el-radio>
          <el-radio v-model="userVo.sex" label=null>全部</el-radio>
        </el-from-item>
        <el-form-item style="margin-left:50px;">
          <el-button type="primary" icon="el-icon-refresh" @click="resetUserVo">重置</el-button>
          <el-button type="success" icon="el-icon-search" @click="getUsersList">查询</el-button>
          <el-button type="info" icon="el-icon-plus"   @click="showDialog">添加</el-button>
          <el-button type="warning" icon="el-icon-download">导出</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--      表格内容-->
    <el-card class="box-card-next">
      <el-table
          :header-cell-style="{background:'#e6e9ea'}"
          :data="tableData"
          height="430"
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
            prop="id"
            label="学号"
            width="110">
        </el-table-column>
        <el-table-column
            prop="username"
            label="姓名"
            width="110">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="110">
          <template #default="scope">
            <el-tag
              :type="scope.row.sex == 0?'primary':(scope.row.sex == 1?'success':'info')"
              size="small"
              disable-transitions>
              {{scope.row.sex==0?"女":(scope.row.sex==1?"男":"保密")}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="部门"
            width="150">
        </el-table-column>
        <el-table-column
            prop="phoneNumber"
            label="联系方式"
            width="200">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="200">
        </el-table-column>
        <el-table-column
            sortable
            prop="birth"
            label="生日"
            width="200">
        </el-table-column>
        <el-table-column
            fixed="right"
            prop="status"
            label="是否禁用"
            width="78">
          <template #default="scope">
            <el-switch
                v-model="scope.row.status"
                active-color="#ff4949"
                inactive-color="#13ce66">
            </el-switch>
          </template>
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
      <el-pagination
          style="padding-top: 15px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { findUsetList } from '@/api/users'
import { findColAndCount } from '@/api/depat'
import Personal from '@/components/Personal'
export default {
  name: "Contestant",
  data() {
    return {
      userVo: {
        collegeId: '',
        username: '',
        sex: ''
      },
      isShow: false,
      value: true,
      size: 10,
      total: 100,
      loading: true,
      tableData: [],
      colleges: [],
      currentPage: 1,
    }
  },
  components: {
    Personal
  },
  methods: {
    onSubmit() {
      console.log('submit!');
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
    showAddOrUpdate(date) {
      this.isShow = date !== false;
    },
    indexMethod(index) {
      return index + 1;
    },
    iRowStyle({row, rowIndex}) {
      return 'height:20px';
    },
    resetUserVo(){
      this.userVo={}
    },
    async getUsersList(){
      const {data} = await findUsetList(this.currentPage,this.size,this.userVo)
      this.tableData = data.data.records
      this.total = data.data.total
      console.log(data)
      this.loading=false
    },
    async getDeptAndCount(){
      const {data:res} = await findColAndCount()
      this.colleges = res.data.data
    }
  },
  created() {
    this.getUsersList()
    this.getDeptAndCount()
  }
}
</script>

<style lang="less" scoped>
#contestant_app{
  padding: 20px;
}
.box-card-top{
}
.box-card-next{
  margin-top: 10px;
  .tableClass .cell{
    padding: 0 !important;
    width: 100%;height: 450px;line-height: 20px;
  }
}
</style>
