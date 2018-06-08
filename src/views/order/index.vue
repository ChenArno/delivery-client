<template>
  <div>
    <div class="table">
      <el-table class="table-el" :data="tableData">
        <el-table-column prop="id" label="商品订单号" fixed  width="120">
        </el-table-column>
        <el-table-column prop="quan_link" label="二维码">
          <template slot-scope="scope">
            <vue-qr :logoSrc="require('assets/img/userImg.png')" :text="scope.row.quan_link" :margin="0" :size="70"></vue-qr>
          </template>
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名" width="400">
        </el-table-column>
        <el-table-column prop="quan_guid_content" label="商品说明" width="400">
        </el-table-column>
        <el-table-column prop="goods_url" label="商品链接">
          <template slot-scope="scope">
            <img class="table-img" :src="scope.row.goods_url">
          </template>
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格">
        </el-table-column>
        <el-table-column prop="price_coupons" label="会员价">
        </el-table-column>
        
        <el-table-column prop="createTime" label="创建时间" width="180">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNumber" :page-size="pageSize" layout="prev, pager, next, jumper" :total="count">
    </el-pagination>
  </div>
</template>

<script>
import { queryGoods } from "api/getuser";
import VueQr from "vue-qr";
import { dateFormat } from "utils/tools";
export default {
  data() {
    return {
      pageNumber: 1,
      pageSize: 10,
      count: 0,
      tableData: []
    };
  },
  components: {
    VueQr
  },
  mounted() {
    this.queryGoods();
  },
  watch: {
    pageNumber() {
      this.queryGoods();
    }
  },
  methods: {
    queryGoods() {
      queryGoods(this.pageNumber, this.pageSize).then(res => {
        this.count = res.count;
        this.tableData = res.data.map(val => {
          val.createTime = dateFormat(val.createTime);
          return val;
        });
      });
    },
    handleSizeChange(val) {
      this.pageNumber = val;
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
    }
  }
};
</script>

<style scoped>
.table-img {
  width: 80px;
  height: 80px;
}
.table {
  overflow-y: auto;
  height: 94%;
  
}
.page{
  margin-top:10px;
}
</style>
