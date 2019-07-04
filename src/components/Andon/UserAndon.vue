<template>
  <el-container>
    <el-main>
      <el-card>
        <div slot="header" class="clearfix">
          <span>{{andonTypeName}}</span>
          <el-button style="float: right; padding: 8px" type="warning" v-if="Config.CanAndon" @click="Config.ShowAndonStart=true">ANDON</el-button>
        </div>
        <el-image style="height: 140px" :src="Config.User?Config.User.Photo:''" fit="fill">
          <div slot="error" class="image-slot">
            <img src="../../assets/mes.jpg" />
          </div>
        </el-image>
      </el-card>
      <el-card>
        <el-input placeholder="人员" :value="CurAndonModel.TargetName" :readonly="true">
          <template slot="prepend">处理人员:</template>
        </el-input>
        <el-input placeholder="确认时间" :value="CurAndonModel.ResponseTime" :readonly="true">
          <template slot="prepend">确认时间:</template>
        </el-input>
        <el-input placeholder="开始时间" :value="CurAndonModel.StartTime" :readonly="true">
          <template slot="prepend">开始时间:</template>
        </el-input>
        <el-input placeholder="完成时间" :value="CurAndonModel.EndTime" :readonly="true">
          <template slot="prepend">完成时间:</template>
        </el-input>
        <el-input placeholder="状态" :value="statusName" :readonly="true">
          <template slot="prepend">当前状态:</template>
        </el-input>
      </el-card>
      <el-card>
        <el-button type="success" :disabled="CurAndonModel.Status != 0" @click="Config.ShowAndonConfirm = true">确认</el-button>
        <el-button type="success" :disabled="CurAndonModel.Status != 1">处理</el-button>
        <el-button type="success" :disabled="CurAndonModel.Status != 2">关闭</el-button>
      </el-card>
      <andon-start :taskId="Config.TaskId" :andonType="Config.AndonType" :targetUserId="Config.User.Id" :visible.sync="Config.ShowAndonStart" @andonchange="getAndon"></andon-start>
      <andon-confirm :andonId="CurAndonModel.Id" :visible.sync="Config.ShowAndonConfirm" @andonchange="getAndon"></andon-confirm>
    </el-main>
  </el-container>
</template>

<script>
import andonSvc from "../../api/andon"
import andonStart from "./Start.vue"
import andonConfirm from "./Confirm.vue"
export default {
  name: 'userAndon',
  components: {
    andonStart, andonConfirm
  },
  props: {
    andonType: Number,
    taskId: String,
    user: Object
  },
  data() {
    return {
      Config: { AndonType: this.andonType, TaskId: this.taskId, User: this.user, CanAndon: false, ShowAndonStart: false, ShowAndonConfirm: false },
      CurAndonModel: {}
    };
  },
  computed: {
    andonTypeName() {
      var andonName = "";
      switch (this.Config.AndonType) {
        case 0: andonName = "操作员"; break;
        case 1: andonName = "设计/工艺"; break;
        case 2: andonName = "质检"; break;
        case 3: andonName = "调度"; break;
        case 4: andonName = "设备"; break;
        default: break;
      }
      return andonName;
    },
    statusName() {
      var value = this.CurAndonModel.Status;
      var valString = "";
      switch (value) {
        case 0: valString = "待处理"; break;
        case 1: valString = "处理中"; break;
        case 2: valString = "已处理"; break;
        case 3: valString = "已完成"; break;
        default: break;
      }
      return valString;
    }
  },
  watch: {
    taskId(val, old) {
      this.Config.TaskId = val;
      this.getAndon();
    },
    user(val, old) {
      this.Config.User = val;
      this.getAndon();
    }
  },
  mounted() {
    this.getAndon();
  },
  methods: {
    getAndon() {
      if (this.Config.User == undefined || this.Config.User == null) return;
      if (this.Config.TaskId == undefined || this.Config.TaskId == null) return;
      var queryModel = { TaskId: this.Config.TaskId, Type: this.Config.AndonType, TargetId: this.Config.User.Id };
      console.log(queryModel);
      andonSvc.getAndon(queryModel).then(result => {
        if (result.Data !== null) {
          this.Config.CanAndon = false;
          this.CurAndonModel = result.Data;
        } else {
          this.Config.CanAndon = true;
          this.CurAndonModel = { TargetUser: "", ResponseTime: null, StartTime: null, EndTime: null, Status: null };
        }
      });
    }
  }
}
</script>
<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
