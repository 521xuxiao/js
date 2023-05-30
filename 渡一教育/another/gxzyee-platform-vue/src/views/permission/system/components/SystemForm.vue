<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="SID" prop="sid" help="服务标识,尽量以服务名称命名">
        <a-input v-model.trim="form.sid" placeholder="请输入系统唯一标识" :disabled="form.id?true:false" />
      </a-form-model-item>
      <a-form-model-item label="系统名称" prop="name">
        <a-input v-model.trim="form.name" placeholder="请输入系统名称" />
      </a-form-model-item>
      <a-form-model-item label="主页" prop="host">
        <a-input v-model.trim="form.host" placeholder="请输入系统主页" />
      </a-form-model-item>
      <a-form-model-item label="开启SSO登录" prop="ssoEnabled">
        <a-switch v-model.trim="form.ssoEnabled" />
      </a-form-model-item>
      <a-form-model-item v-if="form.ssoEnabled" label="SSO跳转地址" prop="ssoRedirectUri">
        <a-input v-model.trim="form.ssoRedirectUri" placeholder="请输入登录成功调整地址" />
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
import { save } from '@/api/system'
export default {
  name: 'SystemForm',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        id: '',
        sid: '',
        name: '',
        host: '',
        status: 1,
        ssoEnabled: true,
        ssoRedirectUri: '',
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sid: [{ required: true, trigger: 'change', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入系统名称'))
          } else if (!this.$regex.char.reg.test(value)) {
            callback(new Error(this.$regex.char.message))
          } else {
            callback()
          }
        } }],
        host: [{ required: true, message: '请输入主页', trigger: 'change' }],
        ssoRedirectUri: [{ required: true, message: '请输入SSO跳转地址', trigger: 'change' }]
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
