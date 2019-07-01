<template>
  <el-container>
    <el-header>{{andonTypeName}}</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'userAndon',
  props: {
    andonType: String,
    taskId: String,
    user: Object
  },
  computed: {
    andonTypeName() {
      var andonName = "";
      switch (this.andonType) {
        case "OP": andonName = "操作员"; break;
        case "IPQC": andonName = "质检"; break;
        case "PE": andonName = "设计/工艺"; break;
        case "Control": andonName = "调度"; break;
        case "Device": andonName = "设备"; break;
        default: break;
      }
      return andonName;
    }
  }
}
</script>