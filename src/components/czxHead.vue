<template>
  <div class="app-cell">
    <el-container class="app-cont">
      <el-header class="app-head">
        <slot name="head">
          <div class="page">首页</div>
        </slot>
      </el-header>
      <el-main>
        <slot></slot>
      </el-main>
      <!-- <el-footer height="25px" class="app-foot">浙ICP备18004469号</el-footer> -->
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      orgName: ""
    };
  },
  created() {
    if (!this.userInfo) return;
    let { orgId } = this.userInfo;
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>
<style lang="scss" scoped>
$color: teal;
.app-cell {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #e7ebee;
}
.app-cont {
  height: 100%;
}
.app-head {
  background-color: #ffffff;
  height: 61px;
  width: 100%;
  display: flex;
  border-bottom: 3px solid $color;
  justify-content: space-between;
  padding: 0 20px;
  &-el {
    align-self: center;
    .el-menu-item {
      height: 48px;
      line-height: 48px;
      &.is-active {
        color: $color !important;
      }
    }
  }
}

.page{
  cursor: pointer;
}
</style>
