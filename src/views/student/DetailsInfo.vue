<template>
  <el-row>
    <el-col :span="15">
      <ul>
        <li class="header">{{raceList.raceName}}</li>
        <li class="title1">竞赛信息</li>
        <li class="text1">{{raceInfo.detail}}</li>
        <li class="title1">参赛对象</li>
        <li class="text1">{{raceInfo.object}}</li>
        <li class="title1">竞赛规则</li>
        <li class="text1">{{raceInfo.rule}}</li>
        <li class="title1">奖项设置</li>
        <li class="text1">{{raceInfo.award}}</li>
      </ul>
    </el-col>
    <el-col :span="2"></el-col>
    <el-col :span="7">
      <ul>
        <li class="title2">发布者</li>
        <li class="creator">
          <div style="position: relative">
            <el-avatar class="creator" :size="size" :src="avatarURL"></el-avatar>
            <ul style="position: absolute;left: 25%;top: 0%">
              <li class="creatort">{{raceInfo.creatorT}}</li>
              <li class="position">职位</li>
            </ul>
          </div>
        </li>
        <li class="title2">竞赛形式<span>{{raceInfo.typeName}}</span></li>
        <li class="title2">评审教师<span>{{raceInfo.assessor}}</span></li>
        <li class="title2">主办方<span>{{raceInfo.collegeName}}</span></li>
        <li class="title2">报名时间</li>
        <li><span>{{dateTime.createTime}} 至 {{dateTime.endTime}}</span></li>
        <li class="title2">竞赛类别<span>{{raceInfo.raceClass}}</span></li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
import {getByInfoId} from "@/api/race";

export default {
  name: "detailsInfo",
  props: ["raceInfo","dateTime"],
  data() {
    return {
      raceList: [],
      avatarURL: this.raceInfo.avatar
    }
  },
  methods: {
    async getRaceListById(){
      const {data:res} = await getByInfoId(this.raceInfo.infoId)
      this.raceList = res.data.data[0]
      console.log("sssssaaaaa", this.raceList.raceName)
    },
  },
  mounted() {
  },
  created() {
    console.log("dwdawd",this.raceInfo)
    this.getRaceListById()
  }
}
</script>

<style lang="less" scoped>
  ul{
    .header{
      font-size: 26px;
      padding-bottom: 20px;
      font-weight: bolder;
      color: #5c5b5b;
      border-bottom: 3px solid #e3e4e5;
    }
    .title1{
      font-size: 18px;
      margin: 10px 0 10px 0;
      font-weight: bolder;
      color: #5c5b5b;
      padding-left: 10px;
      border-left: lightskyblue 5px solid;
    }
    .text1{
      padding-left: 10px;
      color: #6a6969;
      text-indent: 20px;
      letter-spacing: 1px;
      line-height: 20px;
      font-family: '微软雅黑';
    }
    .title2{
      font-size: 14px;
      color: #5b5c5c;
      font-weight: bolder;
      margin: 10px 0 10px 0;
      padding-left: 10px;
      border-left: lightskyblue 5px solid;

    }
    li{
      span{
        font-size: 13px;
        font-weight: normal;
        margin-left: 20px;
        color: #a8a8a8;
      }
    }
    .creator{
      margin-left: 10px;
    }
    .creatort{
      font-weight: bolder;
      color: #414242;
    }
    .position{
      font-size: 13px;
      color: #a8a8a8;
    }
  }
</style>
