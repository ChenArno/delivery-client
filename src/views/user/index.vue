<template>
  <div class="table">
    我的
  </div>
</template>

<script>
import { pay } from "api/pay";
export default {
  data() {
    return {
      tableData:[]
    };
  },
  methods: {
    pay() {
      pay().then(res => {
        console.log(res);
        window.open(res);
      });
    }
  }
};
</script>

<style>

</style>
