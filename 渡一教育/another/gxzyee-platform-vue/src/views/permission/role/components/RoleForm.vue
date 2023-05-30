<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="显示名称" prop="name">
        <a-input v-model.trim="form.name" placeholder="请输入显示名称" />
      </a-form-model-item>
      <a-form-model-item label="权限名称" prop="code" :help="form.code?`权限标识:role:${form.code}`:''">
        <a-input v-model.trim="form.code" placeholder="请输入权限名称" />
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <a-radio-group v-model.trim="form.status">
          <a-radio :value="1">
            启用
          </a-radio>
          <a-radio :value="0">
            禁用
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="说明" prop="remark">
        <a-textarea v-model.trim="form.remark" placeholder="请输入说明" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { save } from '@/api/role'
export default {
  name: 'RoleForm',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        id: '',
        code: '',
        name: '',
        status: 1,
        sid: '',
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '请输入显示名称', trigger: 'blur' }],
        code: [{ required: true, trigger: 'change', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入权限名称'))
          } else if (!this.$regex.char.reg.test(value)) {
            callback(new Error(this.$regex.char.message))
          } else {
            callback()
          }
        } }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          save(this.form).then(res => {
            res.success ? this.$message.success('保存成功') : this.$message.error('保存失败')
            this.$emit('done', res.success)
          }).catch(res => {
            this.$emit('done', res.success)
          })
        } else {
          this.$emit('done', false)
          return false
        }
      })
    },
    resetForm() {
      // 重置表单数据
      this.$refs.ruleForm.resetFields()
      this.$utils.merge(this.form, this.$options.data()['form'])
    },
    loadData(data) {
      if (data) {
        this.$utils.merge(this.form, data)
      }
    }
  }
}
</script>
