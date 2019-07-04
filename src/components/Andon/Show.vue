<template>
  <el-dialog title="Andon信息" :visible="visible" :before-close="dialogClose" width="30%">
    <el-form :model="AndonModel" label-width="80px">
      <el-form-item>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="doneAndon()">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'andonDone',
  props: {
    andon: Object
  },
  data() {
    return {
      AndonModel: this.andon
    }
  },
  watch: {
    andon(val, old) {
      this.AndonModel = val;
    }
  },
  methods: {
    doneAndon() {
      this.$emit('update:visible', false)
    },
    dialogClose(done) {
      done();
      this.$emit('update:visible', false)
    }
  }
}
</script>
