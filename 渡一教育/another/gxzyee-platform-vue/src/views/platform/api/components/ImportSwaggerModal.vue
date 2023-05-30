<template>
    <a-modal
            title="导入swagger文档"
            :visible="visibleModal"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
    >
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="服务标识" prop="sid">
        <a-input v-model.trim="form.sid"  placeholder="请输入服务名称" />
      </a-form-model-item>
      <a-form-model-item label="文档地址" prop="path" help="/v2/api-docs 或 http://localhost:8080/v2/api-docs">
        <a-input v-model.trim="form.path" placeholder="请输入文档地址" />
      </a-form-model-item>
        <a-form-model-item label="请求路由前缀" prop="basePath">
            <a-input v-model.trim="form.basePath" placeholder="请输入请求路由前缀" />
        </a-form-model-item>
    </a-form-model>
    </a-modal>
</template>
<script>

import { importSwagger } from '@/api/api'

export default {
  name: 'ImportSwaggerModal',
  props: {
    visible: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    sid: {
      type: String,
      required: true
    }
  },
  watch: {
    visible(val) {
      this.visibleModal = val
      this.form.sid = this.sid
    }
  },
  data() {
    return {
      visibleModal: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      confirmLoading: false,
      form: {
        sid: '',
        path: '/v2/api-docs',
        basePath: '/'
      },
      treeData: [],
      rules: {
        sid: [{ required: true, message: '请输入服务名称', trigger: 'blur' }],
        path: [{ required: true, message: '请输入文档地址', trigger: 'blur' }],
        basePath: [{ required: true, message: '请输入请求路由前缀', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleOk(e) {
      this.confirmLoading = true
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          importSwagger(this.form).then(res => {
            res.success ? this.$message.success(res.message) : this.$message.error(res.message)
            this.handleCancel(null, res.success)
          }).catch(res => {
            this.handleCancel(null, res.success)
          })
        } else {
          this.handleCancel(null, false)
          return false
        }
      })
    },
    handleCancel(e, data) {
      this.resetForm()
      this.confirmLoading = false
      this.visibleModal = false
      this.$emit('done', e, data)
    },
    resetForm() {
      // 重置表单数据
      this.$refs.ruleForm.resetFields()
      this.$utils.merge(this.form, this.$options.data()['form'])
    }
  }
}
</script>
