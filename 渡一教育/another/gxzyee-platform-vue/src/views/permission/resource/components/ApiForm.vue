<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="显示名称" prop="name">
        <a-input v-model.trim="form.name" placeholder="请输入显示名称" />
      </a-form-model-item>
      <a-form-model-item label="权限名称" prop="code" :help="form.code?`权限标识:${form.type}_${form.code}`:''">
        <a-input v-model.trim="form.code" placeholder="请输入权限名称" />
      </a-form-model-item>
      <a-form-model-item label="类型" prop="type">
        <a-radio-group v-model.trim="form.type">
          <a-radio-button value="api">
            接口
          </a-radio-button>
          <a-radio-button value="api_group">
            分组
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item v-if="form.type==='api'" label="请求地址" prop="path" help="{根路径}+{接口地址}">
        <a-input-group compact>
          <a-input v-model.trim="form.meta.basePath" style="width: 25%" placeholder="根路径" />
          <a-input v-model.trim="form.path" style="width: 75%" placeholder="接口地址" />
        </a-input-group>
      </a-form-model-item>
      <a-form-model-item v-if="form.type==='api'" label="请求方式" prop="meta.method">
        <a-select
          v-model.trim="form.meta.method"
          mode="multiple"
          allow-clear
          placeholder="请选择"
        >
          <a-select-option key="GET" name="method">
            GET
          </a-select-option>
          <a-select-option key="POST" name="method">
            POST
          </a-select-option>
          <a-select-option key="PUT" name="method">
            PUT
          </a-select-option>
          <a-select-option key="PATCH" name="method">
            PATCH
          </a-select-option>
          <a-select-option key="DELETE" name="method">
            DELETE
          </a-select-option>
          <a-select-option key="HEAD" name="method">
            HEAD
          </a-select-option>
          <a-select-option key="OPTIONS" name="method">
            OPTIONS
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item v-if="form.type==='api'" label="访问策略" prop="meta.access">
        <a-select
          v-model.trim="form.meta.access"
          allow-clear
          placeholder="请选择"
        >
          <a-select-option key="authenticated" name="access">
            权限认证
          </a-select-option>
          <a-select-option key="permitAll" name="access">
            允许所有
          </a-select-option>
          <a-select-option key="denyAll" name="access">
            拒绝所有
          </a-select-option>
        </a-select>
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
  name: 'ApiForm',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        authority: '',
        code: '',
        meta: {
          basePath: '/',
          method: ['GET'],
          access: 'authenticated' // permitAll,authenticated,denyAll
        },
        id: '',
        name: '',
        parentId: '',
        path: '',
        remark: '',
        sid: '',
        sort: 0,
        status: 1,
        type: 'api'
      },
      treeData: [],
      rules: {
        name: [{ required: true, message: '请输入显示名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路径', trigger: 'blur' }],
        'meta.method': [{ type: 'array', required: true, message: '请选择请求方式', trigger: 'change' }],
        'meta.access': [{ required: true, message: '请选择访问策略', trigger: 'change' }]
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
