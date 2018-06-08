<template>
  <div>
    <div class="page">
      <el-upload class="upload-demo" drag :action="`${serverIp}/fileManager`" multiple :on-error="onerror" :on-success="onsuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-carousel indicator-position="outside" class="card" height="100%">
        <el-carousel-item v-for="(item,i) in lists" :key="i">
          <img class="demo-carousel" :src="item.filename">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { getAllPicte,baseUrl } from "api/picterList";
export default {
  data() {
    return {
      serverIp:"http://127.0.0.1:3000",
      value: 0,
      lists: []
    };
  },
  created(){
    this.serverIp = baseUrl();
    // this.serverIp = "http://www.hengdiancn.club:3000"
    this.getAllPicte();
  },
  methods: {
    getAllPicte(){
      getAllPicte(10,1).then(({data})=>{
        if(!data) return;
        this.lists = data;
      })
    },
    onsuccess(response, file, fileList) {
      console.log(response);
      this.getAllPicte();
    },
    onerror(file){
      console.log(file);
    }
  }
};
</script>

<style scoped>
.demo-carousel {
  padding: 10px;
  /* height: 80%; */
}
.card {
  height: 100%;
  width: 600px;
}
.page {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>

