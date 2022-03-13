<template>
  <div>
    <el-row style="height: 500px">
      <el-col :span="12" style="background-color: #bfc2c4">aw</el-col>
      <el-col :span="12" style="background-color: #D3DCE6">wa</el-col>
    </el-row>
    <div style="height: 350px;width: 900px;background-color: #B3C0D1
              ;position: absolute;top: 87%;left: 20%">
      <el-row style="height: 350px">
        <el-col :span="14" style="background-color: #D3DCE6">
          <div class="ds_left">
            <div class="ds_jj_title">
              <span>Introduction to the competition</span>
            </div>
            <div class="ds_jj_center">
              <dl>
                <dd class="jj_dd1">大赛简介</dd>
                <dd class="jj_dd2">第二国“智慧中国杯大赛承第一届“中国杯”的精神旨在通过新一代大数据科学技术及应用构建数据创新，
                  开放创新大众创新为特征的可持续发展的国家数据智雄生态，以促进过会运营体系以更加精细和动态的方式运作，
                  从而实现城市及国家的数据智慧式管理和发展</dd>
                <dd class="jj_dd3">->查看简介</dd>
              </dl>
            </div>
          </div>
        </el-col>
        <el-col :span="10" style="background-color: #bfc2c4">
          <div class="ds_right">
            <dl>
              <dt style="line-height: 30px">
                <i class="el-icon-document-copy" style="font-size: 30px;"></i>大赛名称</dt>
                <dd>"第二届智慧中国杯暨四川省大数据双创大赛"</dd>
              <dt><i class="el-icon-document-copy"></i>大赛口号</dt>
                <dd>"智慧中国数据先行"</dd>
              <dt><i class="el-icon-document-copy"></i>大赛奖金</dt>
                <dd>100,000,000人民币</dd>
            </dl>
          </div>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "dsjs"
}
</script>

<style lang="less" scoped>
.ds_left{
  height: 350px;
  width: 500px;
  line-height: 30px;
  background-color: transparent;
  span{
    font-size: 20px;
    color: #ffffff;
    position: relative;
    top: 10%;
  }
  .ds_jj_title{
    width: 400px;
    height: 250px;
    background-color: #cdcbcb;
  }
  .ds_jj_center{
    width: 450px;
    height: 300px;
    background-color: #c7c1c1;
    position: absolute;
    top: 20%;
    left: 5%;
    text-align: left;
    dl{
      margin-top: 50px;
      dd{
        margin-top: 30px;
      }
      .jj_dd1{
        color: #ffd04b;
        font-size: 30px;
      }
      .jj_dd2{
        font-size: 13px;
        line-height: 20px;
      }
      .jj_dd3{
        font-size: 13px;
        color: #ffffff;
      }
    }
  }
}
.ds_right{
  text-align: left;
  line-height: 30px;
  dl{

    dd{
      font-size: 12px;
    }
  }
}
</style>
