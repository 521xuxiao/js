<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <fieldset>
        <legend>基本信息</legend>
        <a-form-model-item label="接口名称" prop="name">
          <a-input v-model.trim="form.name" placeholder="请输入接口名称" />
        </a-form-model-item>
        <a-form-model-item label="唯一编码" prop="code">
          <a-input v-model.trim="form.code" placeholder="请输入唯一编码" />
        </a-form-model-item>
        <a-form-model-item label="权限名称" prop="authority" >
          <a-input v-model.trim="form.authority" :addon-before="form.type+':'" placeholder="请输入权限名称" />
        </a-form-model-item>
        <a-form-model-item label="安全认证" prop="meta.auth">
          <a-select
                  v-model.trim="form.meta.auth"
                  allow-clear
                  placeholder="请选择"
          >
            <a-select-option :key="1">
              OAuth2(AK/SK)
            </a-select-option>
            <a-select-option :key="0">
              无认证
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="显示顺序" prop="sort">
          <a-input-number v-model.trim="form.sort" :min="0" />
        </a-form-model-item>

        <a-form-model-item label="说明" prop="remark">
          <a-textarea v-model.trim="form.remark" placeholder="请输入说明" />
        </a-form-model-item>
      </fieldset>
      <fieldset>
        <legend>请求信息</legend>
        <a-form-model-item label="请求协议" prop="meta.scheme">
          <a-select
                  v-model.trim="form.meta.scheme"
                  placeholder="请选择"
          >
            <a-select-option key="http://">
              Http
            </a-select-option>
            <a-select-option key="https://">
              Https
            </a-select-option>
            <a-select-option key="ws://">
              WebSocket
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="请求Path" prop="path"  help="支持URL变量,比如/users/{username}" >
          <a-input v-model.trim="form.path"  placeholder="请求Path"/>
        </a-form-model-item>
        <a-form-model-item label="请求方式" prop="meta.method">
          <a-select
                  v-model.trim="form.meta.method"
                  mode="multiple"
                  allow-clear
                  placeholder="请选择"
          >
            <a-select-option key="GET">
              GET
            </a-select-option>
            <a-select-option key="POST">
              POST
            </a-select-option>
            <a-select-option key="PUT">
              PUT
            </a-select-option>
            <a-select-option key="PATCH">
              PATCH
            </a-select-option>
            <a-select-option key="DELETE">
              DELETE
            </a-select-option>
            <a-select-option key="HEAD">
              HEAD
            </a-select-option>
            <a-select-option key="OPTIONS">
              OPTIONS
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </fieldset>
      <fieldset>
        <legend>请求入参</legend>
       <a-table
         bordered></a-table>
      </fieldset>
      <fieldset>
        <legend>后端服务信息</legend>
        <a-form-model-item label="后端服务类型" prop="meta.serverType" >
          <a-select
                  v-model.trim="form.meta.serverType"
                  placeholder="请选择"
                  @change="serverTypeChange"
          >
            <a-select-option key="1">
              服务负载
            </a-select-option>
            <a-select-option key="2">
              网络地址
            </a-select-option>
            <a-select-option key="3">
              Dubbo
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="form.meta.serverType==='1'" label="后端服务名称" prop="meta.serverName" help="服务名称,通常指:spring.application.name">
          <a-input v-model.trim="form.meta.serverName"  placeholder="后端服务名称" />
        </a-form-model-item>
        <a-form-model-item v-if="form.meta.serverType==='2'" label="后端服务地址" prop="meta.serverUrl"  help="http://www.demo.com或http://ip:port">
          <a-input v-model.trim="form.meta.serverUrl"  placeholder="后端服务地址" />
        </a-form-model-item>
        <a-form-model-item v-if="form.meta.serverType==='1' || form.meta.serverType==='2'" label="后端请求Path" prop="meta.serverPath"  help="支持URL变量,比如/users/{username}" >
          <a-input v-model.trim="form.meta.serverPath" placeholder="后端请求Path"/>
        </a-form-model-item>
        <a-form-model-item v-if="form.meta.serverType==='3'" label="接口名" prop="meta.dubboInterface"  help="com.alibaba.dubbo.samples.generic.api.IUserService" >
          <a-input v-model.trim="form.meta.dubboInterface" placeholder="com.dubbo.samples.api.IUserService"/>
        </a-form-model-item>
        <a-form-model-item v-if="form.meta.serverType==='3'" label="调用方法名" prop="meta.dubboMethodName"  help="方法名" >
          <a-input v-model.trim="form.meta.dubboMethodName" placeholder="method"/>
        </a-form-model-item>
        <a-form-model-item v-if="form.meta.serverType==='3'" label="分组(Group)" prop="meta.dubboGroup"  >
          <a-input v-model.trim="form.meta.dubboGroup" placeholder="Group"/>
        </a-form-model-item>
        <a-form-model-item v-if="form.meta.serverType==='3'" label="版本号(Version)" prop="meta.dubboVersion"  >
          <a-input v-model.trim="form.meta.dubboVersion" placeholder="1.0.0"/>
        </a-form-model-item>
        <a-form-model-item v-if="form.meta.serverType==='3'" label="注册中心" prop="meta.dubboRegistry"  help="zookeeper://127.0.0.1:2181.默认使用网关服务所在注册中心" >
          <a-input v-model.trim="form.meta.dubboRegistry" placeholder="注册中心"/>
        </a-form-model-item>
      </fieldset>
      <fieldset>
        <legend>后端请求参数</legend>
       <a-table
         bordered></a-table>
      </fieldset>
      <a-form-model-item :wrapper-col="{ span: wrapperCol.span, offset: labelCol.span }">
        <a-button type="primary" @click="onSubmit">
          提交
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>

import { save } from '@/api/api'

export default {
  name: 'ApiForm',
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {},
      treeData: [],
      rules: {
        name: [{ required: true, message: '请输入接口名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入唯一编码', trigger: 'blur' }],
        authority: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        path: [{ required: true, message: '请输入请求Path', trigger: 'blur' }],
        'meta.method': [{ type: 'array', required: true, message: '请选择请求方式', trigger: 'change' }],
        'meta.scheme': [{ required: true, message: '请选择请求协议', trigger: 'change' }],
        'meta.serverType': [{ required: true, message: '请选择后端服务类型', trigger: 'change' }],
        'meta.serverName': [{ required: true, message: '请填写请填写服务名称', trigger: 'blur' }],
        'meta.serverUrl': [{ required: true, message: '请填写后端服务地址', trigger: 'blur' }],
        'meta.serverPath': [{ required: true, message: '请填写后端请求Path', trigger: 'blur' }],
        'meta.dubboInterface': [{ required: true, message: '请填写接口名', trigger: 'blur' }],
        'meta.dubboMethodName': [{ required: true, message: '请填写调用方法名称', trigger: 'blur' }]
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
            meta: {
              basePath: '/',
              scheme: 'http://',
              method: ['GET'],
              auth: 1,
              serverType: '1',
              serverName: '',
              serverUrl: val.sid,
              serverPath: '',
              dubboInterface: '',
              dubboMethodName: '',
              dubboGroup: '',
              dubboVersion: '',
              dubboRegistry: ''
            },
            id: '',
            name: '',
            parentId: '',
            path: '',
            remark: '',
            sid: '',
            sort: 0,
            status: 0,
            type: 'api' }, val)
          this.form.authority = this.form.authority.replace(this.form.type + ':', '')
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
    },
    serverTypeChange(value, option) {
      if (value !== '1') {
        this.form.meta.serverName = ''
      }
      if (value !== '2') {
        this.form.meta.serverUrl = ''
      }
      if (value !== '3') {
        this.form.meta.dubboInterface = ''
        this.form.meta.dubboMethodName = ''
        this.form.meta.dubboGroup = ''
        this.form.meta.dubboVersion = ''
        this.form.meta.dubboRegistry = ''
      }
    }
  }
}
</script>
