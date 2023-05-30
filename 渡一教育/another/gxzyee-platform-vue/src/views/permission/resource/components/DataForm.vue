<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="显示名称" prop="name">
        <a-input v-model.trim="form.name" placeholder="请输入显示名称" />
      </a-form-model-item>
      <a-form-model-item label="权限名称" prop="code">
        <a-input v-model.trim="form.code" placeholder="请输入权限名称" />
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <a-radio-group v-model.trim="form.status">
          <a-radio-button :value="1">
            启用
          </a-radio-button>
          <a-radio-button :value="0">
            禁用
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="显示顺序" prop="sort">
        <a-input-number v-model.trim="form.sort" :min="0" />
      </a-form-model-item>
      <a-form-model-item label="说明" prop="remark">
        <a-textarea v-model.trim="form.remark" placeholder="请输入说明" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>

import { save } from '@/api/resource'
export default {
  name: 'DataForm',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        authority: '',
        code: '',
        meta: {},
        id: '',
        name: '',
        parentId: '',
        path: '',
        remark: '',
        sid: '',
        sort: 0,
        status: 1,
        type: 'DATA'
      },
      treeData: [],
      rules: {
        name: [{ required: true, message: '请输入显示名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入权限名称', trigger: 'blur' }]
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
      this.$refs.ruleForm.resetFields()
      // 重置表单数据
      this.$utils.merge(this.form, this.$options.data()['form'])
    },
    loadData(data, treeDataSimple) {
      if (data) {
        this.$utils.merge(this.form, data)
      }
      if (treeDataSimple) {
        const opt = {
          key: 'id',
          parentKey: 'parentId',
          children: 'children'
        }
        const tree = this.$utils.toArrayTreeExt(treeDataSimple, opt)
        this.treeData = tree
      }
    }
  }
}
</script>
