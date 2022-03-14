<template>
  <div>

    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <div id="detail_app">
      <!--      浏览图-->
      <div class="detail_img">
        <el-image :src="raceInfo.imageURL"
                  fit="contain"
        >
          <template #placeholder>
            <div class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </template>
        </el-image>
      </div>
      <div class="sign">
        <ul>
          <li v-if="dateTime.day>0">报名时间 距离报名截止还有{{ dateTime.day }}天</li>
          <li v-else>报名已经截止</li>
          <li>{{ dateTime.createTime }}-{{ dateTime.endTime }}</li>
        </ul>
        <!--        <el-button v-if="dateTime.day>0" type="primary">主要按钮</el-button>-->
        <el-button v-if="dateTime.day>0" @click="open()" type="success" style="width: 130px;z-index: 100">我要报名
        </el-button>
        <el-button v-else type="info" disabled style="width: 130px">报名截止</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="竞赛信息" name="first">
          <!-- <DetailsInfo :raceInfo="raceList" :dateTime="dateTime"/> -->
        </el-tab-pane>
        <el-tab-pane label="通知公告" name="second">通知公告</el-tab-pane>
      </el-tabs>
<!--      dialog-->
      <el-dialog title="选择队伍" v-model="isShow">
        <el-form :model="team">
          <el-form-item label="队伍" :label-width="formLabelWidth">
            <el-select v-model="tid" placeholder="请选择活动区域">
              <el-option  v-for="item in team"  :label="item.teamName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="queding">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DetailsInfo from "@/views/student/DetailsInfo";
import {formatDate} from "@/utils/DateFormat";
import {getInfoById} from "@/api/race";
import {getDate} from "@/utils/toDate";
import {signUp} from "@/api/myrace";
import {myTeam} from "@/api/team";

export default {
  name: "detailsS",
  components: {DetailsInfo},
  data() {
    return {
      src: require('@/assets/Images/轮播图2.png'),
      activeName: 'first',
      raceInfo: [],
      dateTime: {
        createTime: '5月25日',
        endTime: '8月20日',
        day: '100天'
      },
      tid:'',
      raceList: [],
      isShow: false,
      formLabelWidth:"120px",
      team: [],
      value:'',
    }
  },
  methods: {
    queding() {
      this.signUp(this.raceList.id, this.raceList.raceClass, this.tid)
    },
    open() {
      console.log(this.raceList)
      this.$confirm('该竞赛为' + this.raceList.raceClass + ', 是否报名?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.raceList.raceClass === "个人赛") {
          console.log("class", this.raceList.raceClass)
          this.signUp(this.raceList.id, this.raceList.raceClass,null)
        } else if (this.raceList.raceClass === "团队赛") {
          this.myTeam()
          this.isShow = true
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消报名'
        });
      });
    },
    async myTeam() {
      const {data:res} = await myTeam(this.raceList.id)
      // this.team = res.data.data
    },
    async signUp(id,raceClass,tid) {
      const {data: res} = await signUp(id,raceClass,tid)
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
    },
    goBack() {
      this.$router.push('/homeS')
    },
    getDatePoor(endDate, nowDate) {
      let nd = 1000 * 24 * 60 * 60;
      let diff = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime() - nowDate.getTime();
      let day = diff / nd;
      return parseInt(day)
    },
    toDate(Date) {
      let Time = Date.substring(0, 11)
      let date = Time.replace("-", "年").replace("-", "月").replace(" ", "日")
      return date
    },
    toDay(startDate, endDate) {
      // var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();
      var startTime = startDate.getTime()
      var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
      var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
      return dates;
    },
    async getInfo(id) {
      const {data: res} = await getInfoById(id)
      console.log(res)
      this.raceInfo = res.data.data
      // this.dateTime.day = this.getDatePoor(this.raceInfo.endTime, new Date())
      // this.dateTime.createTime = this.toDate(this.raceInfo.createTime)
      // this.dateTime.endTime = this.toDate(this.raceInfo.endTime)
    }
  },
  mounted() {
  },
  created() {
    // let id = this.$route.query.id
    let routeParams = this.$route.query.info
    // this.raceList = JSON.parse(routeParams);
    // let info = routeParams.info
    // this.getInfo(this.raceList.infoId)

  }
}
</script>

<style lang="less" scoped>
.el-page-header {
  padding: 20px;
  background-color: white;
}

#detail_app {
  width: 80%;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  position: relative;

  .el-image {
    width: 100%;
    //padding: 20px 20px 20px 20px;
  }

  .el-tabs {
    /deep/ .el-tabs__item.is-top {
      font-size: 20px;
      margin: 10px 0;
    }
  }

  .sign {
    width: 400px;
    height: 60px;
    //position: relative;
    position: absolute;
    right: 20px;
    padding: 0;
    margin: 0;
    //float: right;
    .el-button {
      position: absolute;
      right: 0;
      top: 10px
    }

    ul {
      list-style: none;
      margin-top: 10px;
      line-height: 20px;
    }
  }
}
</style>
