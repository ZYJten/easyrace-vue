<template>
  <div id="homes_app">
    <div id="homes_header">
      <el-carousel trigger="click" height="200px">
        <el-carousel-item v-for="item in imgUrl" :key="item">
          <img :src="item" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div id="homes_main">
      <div>
        <span class="asideleft2">热门比赛</span>
        <router-link to="/hot">
          <div style="float: right; display: inline-block; line-height: 50px">
            更多比赛>>
          </div>
        </router-link>
      </div>

      <div style="display: flex; flex-wrap: wrap">
        <div style="width:25%" v-for="(item, index) in infos" :key="index" >
          <router-link to="/detailsS">
            <Cell :excInfo="item"></Cell>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgUrl1 from "@/assets/Images/轮播图1.png";
import imgUrl2 from "@/assets/Images/轮播图2.png";
import imgUrl3 from "@/assets/Images/轮播图3.png";
import { getInfoList } from "@/api/race";
import Cell from "@/components/cell";
export default {
  name: "HomeS",
  data() {
    return {
      infos: [
        {
          imgURl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "2022年天津市科技杨帆竞赛xxxxxxxxxxxxxxxx",
        },
        {
          imgURl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "2022年天津市科技杨帆竞赛xxxxxxxxxxxxxxxx",
        },
        {
          imgURl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "2022年天津市科技杨帆竞赛xxxxxxxxxxxxxxxx",
        },
        {
          imgURl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "2022年天津市科技杨帆竞赛xxxxxxxxxxxxxxxx",
        },
        {
          imgURl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "2022年天津市科技杨帆竞赛xxxxxxxxxxxxxxxx",
        },
        {
          imgURl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "2022年天津市科技杨帆竞赛xxxxxxxxxxxxxxxx",
        },
        {
          imgURl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "2022年天津市科技杨帆竞赛xxxxxxxxxxxxxxxx",
        },
        {
          imgURl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "2022年天津市科技杨帆竞赛xxxxxxxxxxxxxxxx",
        },
      ],
      count: 10,
      loading: false,
      imgUrl: [imgUrl1, imgUrl2, imgUrl3],
      raceList: [],
    };
  },
  components: {
    Cell,
  },
  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    async getRaceInfo() {
      const { data: res } = await getInfoList();
      console.log("getRaceInfo", res);
      this.raceList = res.data.data;
      console.log("raceInfo", this.raceList);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    // query:{id:row}
    buttonClick(row) {
      this.$router.push({
        path: "/detailsS",
        query: { info: JSON.stringify(row) },
        // query:{
        //       routeParams: JSON.stringify({info:this.raceList})
        //     }
      });
    },
  },
  mounted() {
    this.getRaceInfo();
  },
};
</script>

<style lang="less" scoped>
#homes_app {
  padding: 1%;
  margin: auto;
  width: 100%;
  border-radius: 20px;
  border: 1px solid transparent;
  //text-align: center;
  .icon {
    width: 2em;
    height: 2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  #homes_header {
    text-align: center;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
</style>
