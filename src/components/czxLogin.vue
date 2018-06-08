<template>
  <div class="login">
    <div class="app-user">
      <img class="login-url" :src="!userInfo ?require('assets/img/userImg.png'):userInfo.avaUrl">
      <div v-if="isLogin">{{userInfo && userInfo.userName}}</div>
      <div @click="login" v-else>登录</div>
      <div class="app-user-style"></div>
      <div v-if="isLogin" @click="logout">退出</div>
    </div>
    <el-dialog title="登录" :visible.sync="dialogTableVisible" width="500px">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="dialog">
        <el-form-item label="用户名" prop="email">
          <el-input v-model.number="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.login {
  height: 60px;
  line-height: 60px;

}
.app-user {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  & img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  &-style {
    width: 2px;
    height: 20px;
    background-color: #cccccc;
    margin: 0 10px;
  }
}
.dialog {
  margin: 0 50px 0 0;
}
.login-url {
  border-radius: 50%;
}
</style>
<script>
import { login } from "api/users";
import { mapGetters } from "vuex";
import md5 from "js-md5"
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
        return;
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
        return;
      }
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
        return;
      }
      callback();
    };
    return {
      dialogTableVisible: false,
      ruleForm: {
        email: "",
        password: ""
      },
      rules: {
        email: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      isLogin: false
    };
  },
  created() {
    if (!this.userInfo) return;
    this.isLogin = true;
  },
  mounted() {
    let self = this;
    document.onkeydown = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {
        self.submitForm("ruleForm");
      }
    };
  },
  methods: {
    handleSelect(val) {
      this.$store.commit("SET_MENUS", val);
      this.$router.push({ name: val });
    },
    login() {
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let {email,password} = this.ruleForm;
          let data = {
            username: email,
            password: md5(password)
          };
          console.log(data);
          login(data).then(res => {
            if (res.resultStatus) {
              this.dialogTableVisible = false;
              this.$store.commit("SET_USERINFO", res.data);
              this.isLogin = true;
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
    },
    logout() {
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.commit("SET_USERINFO");
        this.isLogin = false;
      });
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>
