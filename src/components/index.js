import czxHead from "./czxHead.vue"
import czxLogin from "./czxLogin.vue"
import czxRight from './czxRight.vue'
import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';

export default {
  install(Vue) {
    Vue.component("czx-head", czxHead);
    Vue.component("czx-login", czxLogin);
    Vue.component("czx-right", czxRight);
    Vue.component(InfiniteScroll.name, InfiniteScroll);
  }
}