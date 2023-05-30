<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="sid" prop="sid" help="">
        <a-input v-model.trim="form.sid" placeholder="请输入系统唯一标识" disabled />
      </a-form-model-item>
      <a-form-model-item label="分类" prop="category">
        <a-input v-model.trim="form.category" placeholder="请输入系统名称" />
      </a-form-model-item>
      <a-form-model-item label="Key" prop="key">
        <a-input v-model.trim="form.key" placeholder="请输入key" />
      </a-form-model-item>
      <a-form-model-item label="Value" prop="value">
        <a-input v-model.trim="form.value" placeholder="请输入value" />
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
import { save } from '@/api/dict'
export default {
  name: 'DictForm',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        id: '',
        sid: '',
        key: '',
        value: '',
        status: 1,
        category: '',
        remark: ''
      },
      rules: {
        key: [{ required: true, message: '请输入key', trigger: 'blur' }],
        value: [{ required: true, message: '请输入value', trigger: 'blur' }],
        category: [{ required: true, message: '请输入分类', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入说明', trigger: 'blur' }],
        sid: [{ required: true, trigger: 'change', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入系统名称'))
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
