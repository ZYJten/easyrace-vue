<template>
  <div>
    <div class="title">全部竞赛</div>
    <div class="infinite-list" style="overflow: visible">
      <div style="width:20%" v-for="(item, index) in infos" :key="index">
        <router-link to="/detailsS">
          <Cell :excInfo="item"></Cell>
        </router-link>
      </div>
    </div>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="0"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>
import Cell from "../../components/cell.vue";
export default {
  components: { Cell },
  name: "Hot",
  data() {
    return {
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        borderRadius: "4px",
        lineHeight: "45px", // 请保持与高度一致以垂直居中
        background: "#e7eaf1", // 按钮的背景颜色
      },
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
    };
  },
  methods: {
    load() {
      this.count += 2;
    },
  },
};
</script>

<style scoped>
.infinite-list {
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
}
</style>
