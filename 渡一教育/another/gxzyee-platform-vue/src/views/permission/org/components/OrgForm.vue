<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="机构名称" prop="name">
        <a-input v-model.trim="form.name" placeholder="请输入机构名称" />
      </a-form-model-item>
      <a-form-model-item label="机构编码" prop="code">
        <a-input v-model.trim="form.code" placeholder="请输入机构编码" />
      </a-form-model-item>
      <a-form-model-item label="上级机构" prop="parentId">
        <a-tree-select
          v-model.trim="form.parentId"
          :tree-data="tree"
          placeholder="请选择"
          tree-default-expand-all
        />
      </a-form-model-item>
      <a-form-model-item label="类型" prop="type">
        <a-radio-group v-model.trim="form.type">
          <a-radio :value="1">
            单位或部门
          </a-radio>
          <a-radio :value="2">
            组
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="负责人" prop="headUserId">
        <user-select
          v-model.trim="headUser"
@change="onUserChange"
        />
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
      <a-form-model-item label="序号" prop="sort">
        <a-input-number v-model.trim="form.sort" :min="1" />
      </a-form-model-item>
      <a-form-model-item label="说明" prop="remark">
        <a-textarea v-model.trim="form.remark" placeholder="请输入说明" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { save } from '@/api/org'
import UserSelect from '@/views/public/user/UserSelect'
export default {
  name: 'OrgForm',
  components: {
    UserSelect
  },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    orgTree: {
      type: Array,
      default: () => {
      }
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      headUser: {},
      form: Object.assign({
        id: '',
        code: '',
        name: '',
        status: 1,
        sort: 1,
        type: 1,
        parentId: 0,
        remark: '',
        headUserId: ''
      }, this.value),
      rules: {
        name: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        parentId: [{ required: true, message: '请选择上级机构', trigger: 'change' }],
        code: [{ required: true, trigger: 'blur', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入机构编码'))
          } else if (!this.$regex.char.reg.test(value)) {
            callback(new Error(this.$regex.char.message))
          } else {
            callback()
          }
        } }]
      },
      tree: this.orgTree
    }
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          save(this.form).then(res => {
            res.success ? this.$message.success('保存成功') : this.$message.error('保存失败')
            this.$emit('done', res.success, this.form)
          }).catch(res => {
            this.$emit('done', res.success, this.form)
          })
        } else {
          this.$emit('done', false, this.form)
          return false
        }
      })
    },
    resetForm() {
      // 重置表单数据
      this.$refs.ruleForm.resetFields()
    },
    onUserChange(data) {
      this.form.headUserId = data.key
    }
  }
}
</script>
