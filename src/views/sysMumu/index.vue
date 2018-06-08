<template>
  <div>
    <div class="table">
      <div class="table-head" v-if="this.userInfo">
        <el-button type="primary" plain @click="add">增加</el-button>
        <el-button type="danger" @click="deleteList">批量删除</el-button>
      </div>
      <el-table class="table-el" :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="商品单号" fixed>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名">
        </el-table-column>
        <el-table-column prop="goodsDesc" label="商品说明">
        </el-table-column>
        <el-table-column prop="goodsUrl" label="商品链接">
        </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img class="table-img" :src="scope.row.filename" v-if="scope.row.filename">
          </template>
        </el-table-column>
        <el-table-column prop="goodsPrice" label="商品价格">
        </el-table-column>
        <el-table-column prop="clubPrice" label="会员价">
        </el-table-column>
        <el-table-column prop="clubPrice" label="详情">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="edit(scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" width="180">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNumber" :page-size="pageSize" layout="prev, pager, next, jumper" :total="count">
    </el-pagination>

    <czx-right ref="box">
      <el-form label-position="right" ref="ruleForm" :rules="rules" label-width="80px" :model="formLabel">
        <el-form-item label="商品名" prop="goodsName">
          <el-input v-model="formLabel.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="formLabel.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item label="商品链接">
          <el-input v-model="formLabel.goodsUrl"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input type="number" v-model="formLabel.goodsPrice"></el-input>
        </el-form-item>
        <el-form-item label="会员价格">
          <el-input type="number" v-model="formLabel.clubPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <div class="upload">
            <!-- <el-upload class="upload-cell" :limit="1" :on-exceed="handleExceed" :action="serverIp" list-type="picture-card" :on-success="onsuccess" :on-error="onerror">
              <i class="el-icon-plus"></i>
            </el-upload> -->
            <el-upload class="avatar-uploader" :action="serverIp" :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="onsuccess" :on-error="onerror">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>

    </czx-right>
  </div>
</template>
<script>
import {
  addSysMumuGoods,
  baseUrl,
  getSysMumuGoods,
  deleteSysMumuGoods,
  updateSysMumuGoods
} from "api/sysMumu";
import { mapGetters } from "vuex";
import { dateFormat } from "utils/tools";
export default {
  data() {
    return {
      pageNumber: 1,
      pageSize: 10,
      count: 0,
      tableData: [],
      formLabel: {
        goodsName: "",
        goodsUrl: "",
        goodsPrice: 0,
        clubPrice: 0,
        goodsDesc: ""
      },
      isAddOrEdit: true,
      phoneId: -1,
      rules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, message: "长度在 1个字符以上", trigger: "blur" }
        ]
      },
      serverIp: baseUrl(),
      deleteLists: [],
      imageUrl: ""
    };
  },
  mounted() {
    if (!this.userInfo) {
      this.$message.success("请先登陆");
      return;
    }
    this.getSysMumuGoods();
  },
  watch: {
    pageNumber() {
      this.getSysMumuGoods();
    },
    userInfo(val) {
      if (!val) {
        this.tableData = [];
        return;
      }
      this.getSysMumuGoods();
    }
  },
  methods: {
    getSysMumuGoods() {
      getSysMumuGoods(this.userInfo.orgId, this.pageNumber, this.pageSize).then(
        res => {
          this.count = res.count;
          this.tableData = res.data.map(val => {
            val.updateTime = dateFormat(val.updateTime);
            return val;
          });
        }
      );
    },
    handleSizeChange(val) {
      this.pageNumber = val;
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
    },
    add() {
      this.formLabel = {
        goodsName: "",
        goodsUrl: "",
        goodsPrice: 0,
        clubPrice: 0,
        goodsDesc: ""
      };
      this.isAddOrEdit = true;
      this.imageUrl = "";
      this.phoneId = -1;
      this.$refs.box.open();
    },
    edit({
      goodsName,
      goodsUrl,
      goodsPrice,
      filename,
      clubPrice,
      goodsDesc,
      id
    }) {
      this.formLabel = {
        goodsName,
        goodsUrl,
        goodsPrice,
        filename,
        clubPrice,
        goodsDesc,
        id
      };
      this.phoneId = -1;
      this.imageUrl = filename;
      this.isAddOrEdit = false;
      this.$refs.box.open();
    },
    onsuccess(res, file, fileList) {
      let { id } = res.data;
      this.phoneId = id;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    onerror(err, file, fileList) {
      this.$message.error("上传失败");
    },
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let {
            goodsName,
            goodsUrl,
            goodsPrice,
            clubPrice,
            goodsDesc,
            id
          } = this.formLabel;

          let { account, orgId } = this.userInfo;
          let data = {
            goodsName,
            goodsUrl,
            goodsPrice: goodsPrice ? parseFloat(goodsPrice).toFixed(2) : 0,
            clubPrice: clubPrice ? parseFloat(clubPrice).toFixed(2) : 0,
            goodsDesc,
            creater: account,
            orgId
          };
          if (this.phoneId > 0) {
            data.phoneId = this.phoneId;
          }
          if (this.isAddOrEdit) {
            addSysMumuGoods(data)
              .then(res => {
                if (!res.resultStatus) {
                  this.$message.error(res.msg);
                  return;
                }
                this.$refs.box.close();
                this.getSysMumuGoods();
              })
              .catch(err => {
                this.$message.error(err);
              });
            return;
          }
          data.id = id;
          updateSysMumuGoods(data)
            .then(res => {
              if (!res.resultStatus) {
                this.$message.error(res.msg);
                return;
              }
              this.$refs.box.close();
              this.getSysMumuGoods();
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSelectionChange(val) {
      this.deleteLists = val.map(r => {
        return r.id;
      });
    },
    deleteList() {
      this.$confirm("执行将无法还原，是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let data = {
          orgId: this.userInfo.orgId,
          lists: this.deleteLists
        };
        deleteSysMumuGoods(data).then(res => {
          this.$message({
            showClose: true,
            message: res.msg,
            type: res.resultStatus ? "success" : "error"
          });
          if (res.resultStatus) {
            this.getSysMumuGoods();
          }
        });
      });
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
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
.page {
  margin-top: 10px;
}
.table-head {
  background-color: #f4f9f8;
  border: 1px solid #e7ebee;
  padding: 5px 20px;
  text-align: left;
}
.upload {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.upload-cell {
  height: 111px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 111px;
  height: 111px;
  line-height: 111px;
  text-align: center;
}
.avatar {
  width: 111px;
  height: 111px;
  display: block;
}
.el-icon-edit {
  cursor: pointer;
}
</style>
