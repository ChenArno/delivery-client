<template>
  <czx-head>
    <div slot="head" class="com-head">
      <el-menu :default-active="activeName" class="app-head-el" mode="horizontal" @select="handleSelect">
        <el-menu-item index="main">图片展示</el-menu-item>
        <el-menu-item index="order">交易订单</el-menu-item>
        <el-menu-item index="user">用户管理</el-menu-item>
      </el-menu>
      <czx-login></czx-login>
    </div>
    <router-view class="view" />

  </czx-head>
</template>

<script>
import { mapGetters } from "vuex";
import md5 from "js-md5"

export default {
  data() {
    return {
      theme: "light"
    };
  },

  mounted() {
    if (!this.menus) return;
    this.$router.push({ name: this.menus });
  },
  methods: {
    handleSelect(val) {
      this.$store.commit("SET_MENUS", val);
      this.$router.push({ name: val });
    },
    tapImg() {
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            username: this.ruleForm.email,
            password: md5(this.ruleForm.password)
          };
          console.log(data);
          login(data).then(res => {
            if (res.resultStatus) {
              this.dialogTableVisible = false;
              this.$store.commit("SET_USERINFO", res.data);
              return;
            }
            this.$message({
              message: res.msg,
              type: "warning"
            });
          });
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    ...mapGetters(["menus", "userInfo"]),
    activeName() {
      return this.menus ? this.menus : "main";
    }
  }
};
</script>

<style lang="scss" scoped>
$color: teal;

.view {
  padding: 15px 90px;
  background-color: #ffffff;
  height: 100%;
  position: relative;
}
.app-logo {
  height: 100%;
  width: 100px;
}

.el-menu--horizontal .el-menu-item {
  height: 50px;
  line-height: 50px;
}
</style>
