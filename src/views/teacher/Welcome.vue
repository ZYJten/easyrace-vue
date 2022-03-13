<template>
  <div id="welcome_app">
    <div class="hello_admin">
      <el-avatar shape="square" :size="100" :src="UserInfo.avatar"></el-avatar>
      <ul>
        <li class="li1">你好</li>
        <li><span style="font-size: 18px;color: #ffd04b">{{ UserInfo.name }}</span>教师</li>
        <li>现在的时间是 <span style="font-size: 18px;color: #ffd04b">{{ updateTime }}</span></li>
      </ul>
    </div>
    <div class="hello_main">
      <el-row>
        <el-col :span="16">
          <el-row>
            <el-space wrap :size="20">
              <div class="todolist">
                <el-table
                    :data="tableData"
                    size="mini"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                  <el-table-column label="待办事项">
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="竞赛"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="内容">
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </div>
              <div class="unread">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                  <el-table-column
                      prop="date"
                      label="未读消息">
                  </el-table-column>
                </el-table>
              </div>
            </el-space>
          </el-row>
          <el-row>
            <div class="echarts_data">
              <MyEcharts></MyEcharts>
            </div>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-calendar v-model="value"
                       style="width: 100%;height: 500px">
          </el-calendar>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import MyEcharts from "@/components/MyEcharts";
import {getUserInfo} from "@/api/login";

export default {
  name: "Welcome",
  components: {MyEcharts},
  props: ["UserInfo"],
  data() {
    return {
      squareUrl: require('@/assets/Images/teacherAvatar.jpg'),
      sizeList: ["large", "medium", "small"],
      updateTime: "",
      teacherName: "熊松泉",
      value: new Date(),
      tableData: []
    }
  },
  mounted() {
    this.currentTime()
    // this.initCharts()
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    getTime() {
      const nowDate = new Date();
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      const newmonth = date.month > 10 ? date.month : '0' + date.month
      const day = date.date > 10 ? date.date : '0' + date.date
      const hh = new Date().getHours();
      const mf =
          new Date().getMinutes() < 10
              ? "0" + new Date().getMinutes()
              : new Date().getMinutes();
      const ss =
          new Date().getSeconds() < 10
              ? "0" + new Date().getSeconds()
              : new Date().getSeconds();
      this.updateTime = date.year + '年' + newmonth + '月' + day + '日' + '-' +
          +hh + ':' + mf + ':' + ss + ''
    },
    currentTime() {
      setInterval(this.getTime, 500);
    }
  }
}
</script>

<style lang="less" scoped>
#welcome_app {
  padding: 20px;

  .hello_admin {
    height: 120px;
    background-color: white;

    .el-avatar {
      float: left;
      margin: 10px
    }

    ul {
      margin: 10px;
      float: left;

      li {
        margin-top: 5px
      }

      .li1 {
        font-size: 25px;
      }
    }
  }

  .hello_main {
    margin-top: 20px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 5px;
    }

    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .todolist {
      width: 500px;
      height: 300px;

      /deep/ .el-table__empty-block {
        min-height: 200px;
      }
    }

    .unread {
      width: 316px;
      height: 300px;

      /deep/ .el-table__empty-block {
        min-height: 220px;
      }
    }

    .echarts_data {
      width: 100%-2.5em;
      height: 210px;
      background-color: white;
      margin-top: -10px;
    }

    .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
  }

  /deep/ .el-calendar-table .el-calendar-day {
    height: auto;
  }
}
</style>
