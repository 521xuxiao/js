<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="上一级" prop="parentId">
        <a-tree-select
                v-model.trim.trim="form.parentId"
                show-search
                :tree-data="treeData"
                :replace-fields="{children:'children', title:'name', key:'id', value: 'id' }"
                placeholder="请选择"
                allow-clear
                tree-default-expand-all
        />
      </a-form-model-item>
      <a-form-model-item label="显示名称" prop="name">
        <a-input v-model.trim.trim="form.name" placeholder="请输入显示名称">
          <icon-picker slot="addonBefore" :disabled="form.type!='menu'" :icon="form.meta.icon" @onChange="(icon)=> this.form.meta.icon = icon" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="组件名称" prop="code" help="需要与前端组件name保持一致,否则页面缓存不生效" >
        <a-input v-model.trim.trim="form.code" placeholder="请输入组件名称" />
      </a-form-model-item>
      <a-form-model-item label="权限名称" prop="authority" >
        <a-input v-model.trim.trim="form.authority" :addon-before="form.type+':'" placeholder="请输入权限名称" />
      </a-form-model-item>
      <a-form-model-item label="类型" prop="type">
        <a-radio-group v-model.trim.trim="form.type">
          <a-radio-button value="menu">
            菜单
          </a-radio-button>
          <a-radio-button value="btn">
            按钮
          </a-radio-button>
          <a-radio-button value="page">
            页面
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <a-radio-group v-model.trim.trim="form.status">
          <a-radio-button :value="1">
            启用
          </a-radio-button>
          <a-radio-button :value="0">
            禁用
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="显示顺序" prop="sort">
        <a-input-number v-model.trim.trim="form.sort" :min="0" />
      </a-form-model-item>
      <a-form-model-item v-if="form.type !== 'btn'" label="访问路径" prop="path" help="默认以“/”开头,支持链接跳转.">
        <a-input v-model.trim.trim="form.path" placeholder="请输入路径" />
      </a-form-model-item>
      <a-form-model-item v-if="form.type !== 'btn'" label="前端组件路径" prop="meta.component" help="前端组件所在路径(不包含src/view),非必填">
        <a-input addon-before="src/view"   v-model.trim.trim="form.meta.component" placeholder="请输入前端组件" >
          <a-checkbox  slot="addonAfter"  v-model.trim.trim="form.meta.keepAlive">
            页面缓存
          </a-checkbox>
        </a-input>
      </a-form-model-item>
      <a-form-model-item  v-if="form.type !== 'menu'" label="关联接口" prop="apiIds">
        <a-select v-model.trim.trim="form.apiIds" />
      </a-form-model-item>
      <a-form-model-item label="说明">
        <a-textarea v-model.trim.trim="form.remark" placeholder="请输入说明" prop="remark" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>

import { save, list } from '@/api/menu'
import IconPicker from '@/components/IconPicker'
export default {
  name: 'MenuForm',
  components: {
    IconPicker: IconPicker
  },
  props: {
    value: {
      type: Object
    },
  },
  watch: {
    'form.type': {
      handler() {
        if (this.form.type === 'btn') {
          this.form.meta.icon = 'link'
        }
        if (this.form.type === 'page') {
          this.form.meta.icon = 'file'
        }
      },
      immediate: true
    },
    value: {
      immediate: true,
      handler(val, oldVal) {
        if (val) {
          this.form = this.$utils.merge({
            authority: '',
            code: '',
            meta: { icon: 'folder', component: '', keepAlive: true },
            id: '',
            name: '',
            parentId: '',
            path: '/',
            remark: '',
            sid: '',
            sort: 0,
            status: 1,
            type: 'menu',
            apiIds: ''
          }, val)
          this.form.authority = this.form.authority.replace(this.form.type + ':', '')
          this.loadTreeData()
        }
      }
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {},
      treeData: [],
      rules: {
        name: [{ required: true, message: '请输入显示名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
        authority: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路径', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }]
      }
    }
  },
  created() {
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
    },
    loadTreeData() {
      list({ sid: this.form.sid }).then(({ data, extras }) => {
        const opt = {
          key: 'id',
          parentKey: 'parentId',
          children: 'children'
        }
        // 深copy
        const list = data.filter(t => { return t.type === 'menu' })
        const tree = this.$utils.toArrayTreeExt(list, opt)
        this.treeData = tree
      }).catch(() => {
      })
    }
  }
}
</script>
