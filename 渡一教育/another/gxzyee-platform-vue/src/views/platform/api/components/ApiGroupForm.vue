<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="分组名称" prop="name">
        <a-input v-model.trim="form.name" placeholder="请输入分组名称" />
      </a-form-model-item>
      <a-form-model-item label="唯一编码" prop="code" help="唯一编码" >
        <a-input v-model.trim="form.code" placeholder="请输入唯一编码" />
      </a-form-model-item>
      <a-form-model-item label="权限名称" prop="authority" >
        <a-input v-model.trim="form.authority" :addon-before="form.type+':'" placeholder="请输入权限名称" />
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

import { save } from '@/api/api'

export default {
  name: 'ApiGroupForm',
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {

      },
      treeData: [],
      rules: {
        name: [{ required: true, message: '请输入分组名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入唯一编码', trigger: 'blur' }],
        authority: [{ required: true, message: '请输入权限名称', trigger: 'blur' }]
      }
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val, oldVal) {
        if (val) {
          this.form = this.$utils.merge({ authority: '',
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
            type: 'group' }, val)
          this.form.authority = this.form.authority.replace(this.form.type + ':', '')
          this.loadTreeData()
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.form.authority = this.form.type + ':' + this.form.authority
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
