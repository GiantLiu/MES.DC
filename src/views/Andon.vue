<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="工序" v-model="TaskModel.ProduceUnitName" :readonly="true">
              <template slot="prepend">工序</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="工单号" v-model="TaskModel.PlantOrder" :readonly="true">
              <template slot="prepend">工单号：</template>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="5">
          <user-andon andonType="PE" :taskId="TaskModel.Id" :user="TaskUser.PE"></user-andon>
        </el-col>
        <el-col :span="5">
          <user-andon andonType="IPQC" :taskId="TaskModel.Id" :user="TaskUser.IPQC"></user-andon>
        </el-col>
        <el-col :span="5">
          <user-andon andonType="Control" :taskId="TaskModel.Id" :user="TaskUser.Control"></user-andon>
        </el-col>
        <el-col :span="5">
          <user-andon andonType="Device" :taskId="TaskModel.Id" :user="TaskUser.Device"></user-andon>
        </el-col>
        <el-col :span="4">5</el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import andonSvc from "../api/andon"
import UserAndon from "../components/Andon/UserAndon.vue"
export default {
  name: 'Andon',
  components: {
    UserAndon
  },
  data() {
    return {
      TaskModel: {},
      TaskUser: {}
    }
  },
  mounted() {
    andonSvc.getCurTask().then(result => {
      this.TaskModel = result.Data;
      andonSvc.getTaskUser(result.Data.Id).then(result => {
        this.TaskUser = result.Data;
      });
    });
  },
  methods: {

  }
}
</script>