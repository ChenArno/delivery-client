<template>
  <div class="shop">
    <div class="image-show" v-show="pageLists.length > 0">
      <el-carousel height="300px" type="card" :interval="4000">
        <el-carousel-item v-for="item in pageLists" :key="item.id">
          <el-tooltip class="item" effect="dark" :content="item.desc?item.desc:'暂无'" placement="top-start">
            <img class="page-show" :src="item.filename">
          </el-tooltip>
        </el-carousel-item>
      </el-carousel>
    </div>
    <yd-infinitescroll class="scroll" :callback="getSysMumuGoods" ref="infinitescrollDemo">
      <el-card slot="list" :body-style="{ padding: '0px' }" class="elCard" v-for="(o, index) in tableData" :key="o.id" :offset="index > 0 ? 2 : 0">
        <div class="elCard-cell">
          <img :src="o.filename" class="image" @click="toTwo(o)">
          <div class="foot">
            <div class="name">商品描述:{{o.goodsName}}</div>
            <div class="time">
              <span class="time-cell">商品描述:{{o.goodsDesc?o.goodsDesc:'暂无'}}</span>
            </div>
            <div class="button">
              <el-button type="primary" plain @click="openApp(o)">跳转</el-button>
            </div>
            <div class="other">
              <div class="">
                <span class="club">￥{{o.clubPrice}}</span>
                <span class="list-del-price">￥{{o.goodsPrice}}</span>
              </div>
              <div class="time">{{ o.updateTime }}</div>
            </div>
          </div>
        </div>
      </el-card>
      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
      <!-- 加载中提示，不指定，将显示默认加载中图标 -->
      <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
    </yd-infinitescroll>
    <!-- <div class="more">加载更多</div> -->
    <div class="picter" v-show="picterShow" @click="toTwo('hide')">
      <img class="picter-cell" :style="styles" :src="imgUrl" />
    </div>
  </div>
</template>

<script>
import { dateFormat, isPhone, openApp } from "utils/tools";
import { getSysMumuGoods, getImageShow } from "api/sysMumu";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pageNumber: 1,
      pageSize: 10,
      count: 0,
      tableData: [],
      picterShow: false,
      imgUrl: "",
      pageLists: []
    };
  },
  computed: {
    ...mapGetters(["orgId"]),
    styles() {
      if (isPhone()) {
        return {
          width: window.screen.width + "px",
          height: window.screen.height + "px"
        };
      }
      return {
        width: "350px",
        height: "466px"
      };
    }
  },
  created() {
    this.getImageShow();
    this.getSysMumuGoods();
  },
  methods: {
    getImageShow() {
      getImageShow(this.orgId).then(({ msg, data, resultStatus }) => {
        if (resultStatus) {
          this.pageLists = data;
          return;
        }
        this.$message.info(msg);
      });
    },
    getSysMumuGoods() {
      getSysMumuGoods(this.orgId, this.pageNumber, this.pageSize).then(res => {
        this.count = res.count;
        const _list = res.data.map(val => {
          val.updateTime = dateFormat(val.updateTime, "MM-DD HH:mm:ss");
          return val;
        });
        this.tableData = [...this.tableData, ..._list];
        if (_list.length < this.pageSize || this.pageNumber == 3) {
          /* 所有数据加载完毕 */
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
          return;
        }
        /* 单次请求数据完毕 */
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
        this.pageNumber++;
      });
    },
    toTwo(val) {
      if (val == "hide") {
        this.picterShow = false;
        return;
      }
      this.picterShow = true;
      this.imgUrl = val.filename;
    },
    openApp({ goodsUrl }) {
      if (!goodsUrl) return;
      window.location.href = goodsUrl;
      // openApp(val.goodsUrl);
    }
  }
};
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}
.name {
  word-wrap: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: justify;
  width: 280px;
}
.time-cell {
  word-wrap: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: justify;
  width: 280px;
  display: block;
}
.time-cell:active {
  color: #eb3443;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.elCard {
  width: 290px;
  height: 320px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.shop {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 100%;
  overflow-y: auto;
}
.scroll {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media screen and (min-width: 768px) {
  .scroll {
    justify-content: flex-start;
  }
}
.elCard-cell {
  padding-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.price {
  font-size: 14px;
}
.club {
  font-size: 18px;
  color: #eb3443;
}
.foot {
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 5px;
}
.other {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-del-price {
  padding-left: 0px;
  font-size: 10px;
  margin-left: 2px;
  position: relative;
  color: #8c8c8c;
}
.list-del-price:after {
  content: "";
  position: absolute;
  z-index: 1;
  left: 0;
  width: 100%;
  border-top: 1px solid #8c8c8c;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  top: auto;
  bottom: 50%;
}
.more {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
.picter {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.picter-cell {
  width: 750px;
  height: 1000px;
}
.desc-url {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: #999;
}
.button {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.image-show {
  width: 100%;
  height: 360px;
}
.page-show {
  height: 300px;
}
</style>
