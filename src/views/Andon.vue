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
        <el-col :span="5" v-if="TaskUser.PE != null">
          <user-andon :andonType="1" :taskId="TaskModel.Id" :user="TaskUser.PE"></user-andon>
        </el-col>
        <el-col :span="5" v-if="TaskUser.IPQC != null">
          <user-andon :andonType="2" :taskId="TaskModel.Id" :user="TaskUser.IPQC"></user-andon>
        </el-col>
        <el-col :span="5" v-if="TaskUser.Control != null">
          <user-andon :andonType="3" :taskId="TaskModel.Id" :user="TaskUser.Control"></user-andon>
        </el-col>
        <el-col :span="5" v-if="TaskUser.Device != null">
          <user-andon :andonType="4" :taskId="TaskModel.Id" :user="TaskUser.Device"></user-andon>
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