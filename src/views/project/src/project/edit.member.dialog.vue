<template>
    <el-dialog
        class="wl-edit-member"
        width = "600px"
        title = "编辑成员"
        :visible="visible"
        :before-close="onCancel"
        :append-to-body="true">
        <el-form :model="form" ref="form">
          <el-form-item label="成员角色">
            <el-select size="small" v-model="form.role" placeholder="请分配角色" :style="{width: '400px'}">
                <el-option v-for="(role, index) in roles" :key="index" :label="role" :value="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="onOk">确定</el-button>
          <el-button size="small" @click="onCancel">取消</el-button>
        </div>
      </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roles: {
      type: Object
    }, // 角色列表
    member: Object // 用户信息
  },
  data () {
    return {
      form: this.initForm()
    }
  },
  watch: {
    member (val) {
      if (val) {
        Object.assign(this.form, {
          ...val
        })
      } else {
        this.form = this.initForm()
      }
    }
  },
  methods: {
    onOk () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('update:visible')
          this.$emit('confirm', this.form)
        } else {
          return false
        }
      })
    },
    onCancel () {
      this.$emit('update:visible')
      this.$emit('close')
    },
    initForm () {
      return {
        role: ''
      }
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(edit-member) {
    .el-dialog__header {
        background: #fff;
        border-bottom: 1px solid #e8e8e8;
        border-radius: 4px 4px 0 0;
        color: rgba(0,0,0,.65);
        padding: 16px 24px;
    }

    .el-dialog__body {
        padding-right: 100px;
    }

    .el-dialog__footer {
        border-radius: 0 0 4px 4px;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
    }
}
</style>
