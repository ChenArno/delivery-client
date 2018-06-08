<template>
  <div class="right" v-if="isactive">
    <div class="left-cell" @click="confirm"></div>
    <div class="right-cell" :class="{sliderightout:!isactive,slideleftin:isactive}">
      <div class="rightBox-title">
        <div>{{title}}</div>
        <slot name="header">
          <el-button type="info" plain @click="isactive = false">返回</el-button>
        </slot>
      </div>
      <div :class="{'box-content':boxShow}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title:{
      type:String,
      default:"标题"
    },
    boxShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isactive: false
    };
  },
  methods: {
    open() {
      this.isactive = true;
    },
    close() {
      this.isactive = false;
    },
    confirm(){
      this.$confirm("是否关闭?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.isactive = false;
      });
    }
  }
};
</script>

<style scoped>
.right {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: flex;
  justify-content: flex-end;
}
.left-cell {
  position: absolute;
  height: 100%;
  right: 400px;
  top: 0;
  left: 0;
}
.right-cell {
  width: 400px;
  z-index: 999;
  box-shadow: -5px 0 10px #cccccc;
  background-color: #fff;
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  height: 100%;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.rightBox-title {
  height: 8%;
  border-bottom: 1px solid #e7ebee;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  padding: 0 3rem;
  justify-content: space-between;
}
.box-content {
  height: 91%;
  overflow-y: auto;
  padding: 3rem 3rem 3rem 2rem;
}

@-webkit-keyframes sliderightout {
  from {
    -webkit-transform: translateX(0px);
    opacity: 1;
  }
  to {
    -webkit-transform: translateX(50%);
    opacity: 0;
  }
}

@-webkit-keyframes slideleftin {
  from {
    -webkit-transform: translateX(-50%);
    opacity: 0;
  }
  to {
    -webkit-transform: translateX(0px);
    opacity: 1;
  }
}

@-o-keyframes sliderightout {
  from {
    -webkit-transform: translateX(0px);
    opacity: 1;
  }
  to {
    -webkit-transform: translateX(50%);
    opacity: 0;
  }
}

@-o-keyframes slideleftin {
  from {
    -webkit-transform: translateX(-50%);
    opacity: 0;
  }
  to {
    -webkit-transform: translateX(0px);
    opacity: 1;
  }
}

@-moz-keyframes sliderightout {
  from {
    -webkit-transform: translateX(0px);
    opacity: 1;
  }
  to {
    -webkit-transform: translateX(50%);
    opacity: 0;
  }
}

@-moz-keyframes slideleftin {
  from {
    -webkit-transform: translateX(-50%);
    opacity: 0;
  }
  to {
    -webkit-transform: translateX(0px);
    opacity: 1;
  }
}

@-ms-keyframes sliderightout {
  from {
    -webkit-transform: translateX(0px);
    opacity: 1;
  }
  to {
    -webkit-transform: translateX(50%);
    opacity: 0;
  }
}

@-ms-keyframes slideleftin {
  from {
    -webkit-transform: translateX(-50%);
    opacity: 0;
  }
  to {
    -webkit-transform: translateX(0px);
    opacity: 1;
  }
}

@keyframes sliderightout {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(50%);
    opacity: 0;
  }
}

@keyframes slideleftin {
  from {
    transform: translateX(50%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slideleftin {
  -webkit-animation: slideleftin 350ms ease-in-out;
  -moz-animation: slideleftin 350ms ease-in-out;
  -ms-animation: slideleftin 350ms ease-in-out;
  -o-animation: slideleftin 350ms ease-in-out;
  animation: slideleftin 350ms ease-in-out;
}

.sliderightout {
  -webkit-animation: sliderightout 350ms ease-in-out;
  -moz-animation: sliderightout 350ms ease-in-out;
  -ms-animation: sliderightout 350ms ease-in-out;
  -o-animation: sliderightout 350ms ease-in-out;
  animation: sliderightout 350ms ease-in-out;
}
</style>
