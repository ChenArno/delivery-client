<template>
  <czx-head>
    <div slot="head" class="com-head">
      <div @click="toHome">首页</div>
      <czx-login></czx-login>
    </div>
    <div class="cont">
      <router-view class="router-view" />
      <div class="app-foot">浙ICP备18004469号 友情链接:<a href="https://www.vanz-vision.com">凡知智能</a></div>
    </div>
  </czx-head>
</template>
<script>
export default {
  methods: {
    toHome() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>
<style scoped>
.cont {
  background-color: #ffffff;
  position: absolute;
  top: 60px;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 10px 0 25px 0;
}
.com-head {
  justify-content: space-between;
  align-items: center;
}
.app-foot {
  font-size: 10px;
  background-color: #fff;
  border-top: 1px solid #9c9a9a;
  display: flex;
  justify-content: center;
  line-height: 25px;
  height: 25px;
}
.router-view{
  padding: 0 20px;
}
</style>
