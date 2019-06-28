<template>
  <el-dialog
    title="登录"
    :visible.sync="Config.DialogVisible"
    width="30%"
    center
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-tabs v-model="Config.ActiveTab" @tab-click="loginTabClick">
      <el-tab-pane label="刷卡登录" name="Card">
        <el-input v-model="Model.Card" placeholder="请在设备上刷卡登录" readonly>
          <template slot="prepend">卡号：</template>
        </el-input>
      </el-tab-pane>
      <el-tab-pane label="密码登录" name="Account">
        <el-input v-model="Model.UserName" placeholder="请输入用户名">
          <template slot="prepend">用户名：</template>
        </el-input>
        <el-input v-model="Model.Password" placeholder="请输入密码" type="password" style="margin-top:10px">
          <template slot="prepend">密&nbsp;&nbsp;&nbsp;码：</template>
        </el-input>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="loginSubmitClick">登录</el-button>
    </span>
  </el-dialog>
</template>

<script>
import loginSvc from "../api/login";
export default {
  name: "Login",
  props: {
    loginDialogVisible: Boolean
  },
  data() {
    return {
      Config: { ActiveTab: "Card", DialogVisible: this.loginDialogVisible },
      Model: { LoginType: "Card", UserName: null, Password: null, Card: null }
    };
  },
  methods: {
    loginTabClick(tab, event) {
      this.Model.LoginType = tab.name;
    },
    loginSubmitClick() {
      //登录
      loginSvc.getToken(this.Model).then(result => {
        console.log(result);
        if (result.Code !== "0") return;
        let tokenKey = process.env.VUE_APP_TokenKey;
        localStorage.setItem(tokenKey, result.Data);
        this.updateUser();
        this.Config.DialogVisible = false;
        this.$emit("loginSuccess", result);
      });
    },
    updateUser() {
      //登录成功后，获取用户基本信息
      loginSvc.getUser().then(result => {
        if (result.Code !== "0") return;
        this.$root.Config.IsAuthenticated = true;
        this.$root.CurUserModel = result.Data;
      });
    }
  }
};
</script>
