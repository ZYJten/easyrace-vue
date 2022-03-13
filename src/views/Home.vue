<template>
  <div>
    <!--    走马灯-->
    <div id="recommend">
      <el-carousel :interval="2000"
                   type="card"
                   height="380px"
                   arrow="hover"
                   indicator-position="none">
        <el-carousel-item v-for="item in imgUrl" :key="item">
          <el-image
              :src="item"
              :fit="{fill}"></el-image>
         <img :src="item" />
        </el-carousel-item>
      </el-carousel>
    </div>
<!--    大赛赛程-->
    <div id="schedule">
      <span>大赛赛程</span>
      <div class="sc_main">
        <el-steps
            align-center="true"
            :active="3">
          <el-step title="报名参赛"
                   status="process"
                   description="在指定界面点击参赛"
                   icon="el-icon-s-custom"></el-step>
          <el-step title="提交作品"
                   status="process"
                   description="规定时间内按时提交参赛作品"
                   icon="el-icon-upload"></el-step>
          <el-step title="教师评审"
                   status="process"
                   description="提交时间结束后，进入教师评审环节"
                   icon="el-icon-s-check"></el-step>
          <el-step title="结果出炉"
                   status="process"
                   description="竞赛结束后，参赛者可查询竞赛结果"
                   icon="el-icon-s-opportunity"></el-step>
        </el-steps>
      </div>
    </div>

<!--    关于我们-->
    <!-- <div id="about">
      <el-row>
        <el-col :span="8">
          <div style="height: 500px;width: 80%;background-color: #EEEEEE;float: right"></div>
        </el-col>
        <el-col :span="16">
          <dl style="margin: 0 auto;width: 80%;text-align: left;margin-top: 50px">
            <dt style="font-size: 24px;line-height: 100px">关于我们</dt>
            <dt style="font-size: 14px;line-height: 20px"> 截至2019年1月，该校共有百名教授、百名博士，硕士生导师40余名；拥有甬江学者，省千人计划人选“151人才工程”人选、宁波市领军拔尖人才等一批名师 ；省级教学团队2个。 </dt>
            <dt style="float: right"><el-button type="primary" plain>主要按钮</el-button></dt>
          </dl>
        </el-col>
      </el-row>
    </div> -->
<!--    合作单位-->
    <!-- <div id="cooperation">
      <el-row>
        <el-col :span="8">
          <dl style="width: 300px;float: right;text-align: left;margin-top: 100px">
            <dt style="font-size: 24px;line-height: 100px">合作机构</dt>
            <dt style="font-size: 14px;line-height: 20px"> 截至2019年1月，该校共有百名教授、百名博士，硕士生导师40余名；拥有甬江学者，省千人计划人选“151人才工程”人选、宁波市领军拔尖人才等一批名师 ；省级教学团队2个。 </dt>
            <dt> <el-button type="primary" plain>主要按钮</el-button></dt>
          </dl>
        </el-col>
        <el-col :span="16">
          <div style="height:70%;width: 90%;background-color: #dedbdb;margin-left: 40px;margin-top: 100px"></div>
        </el-col>
      </el-row>
    </div> -->
<!--    师资力量-->
    <!-- <div id="faculty">
      <el-row>
        <el-col :span="8">
          <dl style="width: 300px;float: right;text-align: left">
            <dt style="font-size: 24px;line-height: 100px">师资力量</dt>
            <dt style="font-size: 14px;line-height: 20px"> 截至2019年1月，该校共有百名教授、百名博士，硕士生导师40余名；拥有甬江学者，省千人计划人选“151人才工程”人选、宁波市领军拔尖人才等一批名师 ；省级教学团队2个。 </dt>
            <dt> <el-button type="primary" plain>主要按钮</el-button></dt>
          </dl>
        </el-col>
        <el-col :span="16">
          <div style="height:100%;width: 90%;background-color: #EEEEEE;margin-top: -50px;margin-left: 40px"></div>
        </el-col>
      </el-row>
    </div> -->
  </div>
</template>

<script>
import imgUrl1 from "@/assets/Images/轮播图1.png"
import imgUrl2 from "@/assets/Images/轮播图2.png"
import imgUrl3 from "@/assets/Images/轮播图3.png"
export default {
  name: "home",
  data() {
    return {
      activeName: 'first',
      url: require('@/assets/Images/homebc.png'),
      imgUrl: [imgUrl1, imgUrl2, imgUrl3],
    };
  },
  methods: {
  }
}
</script>
<style>
.el-card__body{
  padding: 5px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
  border: none;
}
.el-tabs--card>.el-tabs__header .el-tabs__nav{
  border: none;
}
.el-card__body, .el-main{
  padding: 0;
}
</style>
<style lang="less" scoped>
  #homes_top{
    //background: url(~@/assets/Images/homebc.png);
    background-image: url("../assets/Images/index/indexImg.jpg");
    //background-color: #87cefa;
    height: 700px;
    .el-row{
      .el-col{
        .text {
          font-size: 14px;
        }
        .item {
          padding: 18px 0;
        }
        .box-card {
          border: white 5px solid;
          width: 600px;
          line-height: 30px;
          background-color: transparent;
          color: #EEEEEE;
          .dt1 {
            font-size: 25px
          }
          .dt2{
            margin-top: 20px;
            border-left: #ffffff 5px solid;
            padding-left: 10px
          }
          .dt3{
            color: #409EFF;
            margin-top: 40px
          }
          span{
            width: 120px;
            height: 290px;
            margin: 5px;
            float: left;
            background-color: #ffffff
          }
        }
      }
    }
    .stats{
      height: 200px;
      width: 1100px;
      margin-left: auto;
      margin-right: auto;
      .el-row{
        background-color: #B3C0D1;
      }
    }
  }
  //推荐竞赛
  #recommend{
    text-align: center;
    height: 400px;
    background-color: #EEEEEE;
    position: relative;
    .el-carousel{
      padding-top: 5px;
    }
    .el-carousel__item{
      margin-left: -170px;
      width: 1000px;
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      //line-height: 200px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #282424;
    }
  }
  #schedule{
    background-color: #eee;
    //text-align: left;
    .sc_main{
      height: 200px;
      width: 1100px;
      line-height: 1px;
      background-color: white;
      position: relative;
      left: 50%;
      top:50%;
      transform: translate(-50%, -20%);
      .el-steps{
        position: relative;
        left: 50%;
        top:50%;
        transform: translate(-50%, -50%);
      }
    }

    span{
      font-size: 30px;
    }
  }
  //关于我们 about
  #about{
    height: 400px;
    background-color: #E9EEF3;
  }
  //合作单位 cooperation
  #cooperation{
    height: 500px;
    background-color: #babdbf;
  }
  //师资力量 faculty
  #faculty{
    height: 400px;
    background-color: #D3DCE6;
    dl{
      //line-height: 30px;
    }
  }
</style>
