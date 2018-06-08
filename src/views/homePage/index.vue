<template>
  <div class="card">
    <el-card class="box-card" v-for="item in cardLists" :key="item.id">
      <div slot="header" class="clearfix">
        <span>{{item.desc}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="enterHome(item)">进入我的主页</el-button>
      </div>
      <div class="text item">
        <img class="card-img" :src="item.filename">
        <div class="card-time">
          <span>最近修改时间</span>
          <span>{{item.updateTime +item.id }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="enterShop(item)">进入商品列表</el-button>
        </div>

      </div>
    </el-card>
  </div>
</template>
<script>
import { dateFormat } from "utils/tools";
import { getBusinessLists } from "api/business";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cardLists: []
    };
  },
  created() {
    this.getBusinessLists();
    if (!this.userInfo) return;
    let { orgId } = this.userInfo;
  },
  // watch:{
  //   userInfo(val){
  //     if(!val){
  //       this.cardLists = [];
  //       return;
  //     }
  //     this.getBusinessLists(val.orgId);
  //   }
  // },
  methods: {
    getBusinessLists() {
      getBusinessLists(0).then(({ data, resultStatus }) => {
        if (!resultStatus) return;
        this.cardLists = data.map(res => {
          res.updateTime = dateFormat(res.updateTime);
          return res;
        });
      });
    },
    enterHome({ module }) {
      if (!this.userInfo) {
        this.$message.success("请先登陆");
        return;
      }
      let { orgId } = this.userInfo;
      if (!module) return;
      if (orgId == 2) {
        if (module != "sysMumu") {
          this.$message.error("暂无权限");
          return;
        }
      }
      if (orgId == 3) {
        if (module != "sysLincon") {
          this.$message.error("暂无权限");
          return;
        }
      }
      this.$router.push({ name: module });
    },
    enterShop({ module,id }) {
      if (!module) return;
      this.$store.commit("SET_ORGID",id);
      this.$router.push({ name: module + ".shop"});
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>
<style scoped>
.card {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  overflow-y: auto;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 300px;
  height: 200px;
  margin-left: 10px;
  margin-bottom: 10px;
}
.card-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.card-time {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}
</style>
