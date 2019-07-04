<template>
  <el-container>
    <el-main>
      <el-card>
        <div slot="header" class="clearfix">
          <span>{{andonTypeName}}</span>
          <el-button style="float: right; padding: 8px" type="warning" v-if="Config.CanAndon">ANDON</el-button>
        </div>
        <el-image style="height: 140px" :src="Config.User?Config.User.Photo:''" fit="fill">
          <div slot="error" class="image-slot">
            <img src="../../assets/mes.jpg" />
          </div>
        </el-image>
      </el-card>
      <el-card>
        <el-input placeholder="人员" v-model="CurAndonModel.TargetUser" :readonly="true">
          <template slot="prepend">处理人员:</template>
        </el-input>
        <el-input placeholder="确认时间" v-model="CurAndonModel.ResponseTime" :readonly="true">
          <template slot="prepend">确认时间:</template>
        </el-input>
        <el-input placeholder="开始时间" v-model="CurAndonModel.StartTime" :readonly="true">
          <template slot="prepend">开始时间:</template>
        </el-input>
        <el-input placeholder="完成时间" v-model="CurAndonModel.EndTime" :readonly="true">
          <template slot="prepend">完成时间:</template>
        </el-input>
        <el-input placeholder="状态" v-model="CurAndonModel.Status" :readonly="true">
          <template slot="prepend">当前状态:</template>
        </el-input>
      </el-card>
      <el-card>
        <el-button type="success">处理</el-button>
        <el-button type="info">查看</el-button>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import andonSvc from "../../api/andon"
export default {
  name: 'userAndon',
  props: {
    andonType: Number,
    taskId: String,
    user: Object
  },
  data() {
    return {
      Config: { AndonType: this.andonType, TaskId: this.taskId, User: this.user, CanAndon: true },
      CurAndonModel: {}
    };
  },
  computed: {
    andonTypeName() {
      var andonName = "";
      switch (this.AndonType) {
        case 0: andonName = "操作员"; break;
        case 1: andonName = "设计/工艺"; break;
        case 2: andonName = "质检"; break;
        case 3: andonName = "调度"; break;
        case 4: andonName = "设备"; break;
        default: break;
      }
      return andonName;
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
      debugger;
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
