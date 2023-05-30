<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="基本信息">
          <a-form-model-item v-if="form.appId" label="AppId" prop="AppId">
            <a-input v-model.trim="form.appId" disabled />
          </a-form-model-item>
          <a-form-model-item label="名称" prop="appName">
            <a-input v-model.trim="form.appName" />
          </a-form-model-item>
          <a-form-model-item label="开发者类型" prop="developerType">
            <a-select v-model.trim="form.developerType">
              <a-select-option :value="0">
                企业自有
              </a-select-option>
              <a-select-option :value="1">
                第三方企业
              </a-select-option>
              <a-select-option :value="2">
                第三方个人
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="应用类型" prop="type">
            <a-select v-model.trim="form.type">
              <a-select-option value="server">
                服务应用
              </a-select-option>
              <a-select-option value="app">
                手机应用
              </a-select-option>
              <a-select-option value="pc">
                PC网页应用
              </a-select-option>
              <a-select-option value="wap">
                手机网页应用
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="主页" prop="host">
            <a-input v-model.trim="form.host" />
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
          <a-form-model-item label="来源标识" prop="sourceId">
            <a-input v-model.trim="form.sourceId" disabled />
          </a-form-model-item>
          <a-form-model-item label="说明" prop="remark">
            <a-textarea v-model.trim="form.remark" />
          </a-form-model-item>
        </a-tab-pane>
        <a-tab-pane key="2" tab="OAuth2">
          <a-form-model-item v-if="form.appId" label="AppKey" prop="appKey">
            <a-input v-model.trim="form.appKey" disabled />
          </a-form-model-item>
          <a-form-model-item v-if="form.appId" label="AppSecret" prop="appSecret">
            <a-input v-model.trim="form.appSecret" disabled />
          </a-form-model-item>
          <a-form-model-item label="授权方式" prop="client.authorizedGrantTypes">
            <a-select v-model.trim="form.client.authorizedGrantTypes" mode="tags">

              <a-select-option value="authorization_code" title="Web服务端应用与第三方移动App应用,返回code码,通过code获取access_token">
                授权码
              </a-select-option>

              <a-select-option value="implicit" title="Web网页应用或第三方移动App应用,可以直接返回access_token. 当前前端项目sso单点采用的就是该模式">
                简化模式
              </a-select-option>

              <a-select-option value="client_credentials" title="没有用户参与的,内部服务端与第三方服务端">
                  客户端
              </a-select-option>

              <a-select-option value="password" title="内部Web网页应用与内部移动App应用" :disabled="form.developerType!==0">
                密码模式
              </a-select-option>

              <a-select-option value="refresh_token" title="刷新并延迟访问令牌时长">
                刷新令牌
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="授权范围" prop="client.scope" help="输入即可添加自定义范围">
            <a-select v-model.trim="form.client.scope" mode="tags" :token-separators="[',']">
              <a-select-option value="user_info">user_info</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="自动授权范围" prop="client.autoApproveScopes" help="输入即可添加自定义范围">
            <a-select v-model.trim="form.client.autoApproveScopes" mode="tags" :token-separators="[',']">
              <a-select-option value="user_info">user_info</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="重定向地址" prop="client.registeredRedirectUri" help="认证成功跳转地址。多个使用英文,号隔开。">
            <a-textarea v-model.trim="form.client.registeredRedirectUri" />
          </a-form-model-item>
          <a-form-model-item label="令牌有效期" prop="client.accessTokenValiditySeconds" help="永久有效设为：-1">
            <a-input v-model.trim="form.client.accessTokenValiditySeconds" :min="-1"  >
              <a-select slot="addonAfter" v-model.trim="form.client.accessTokenValiditySeconds" style="width: 100px">
                <a-select-option :value="-1">
                  永久有效
                </a-select-option>
                <a-select-option :value="3600">
                  1小时
                </a-select-option>
                <a-select-option :value="7200">
                  2小时
                </a-select-option>
                <a-select-option :value="43200">
                  12小时
                </a-select-option>
                <a-select-option :value="86400">
                  一天
                </a-select-option>
                <a-select-option :value="604800">
                  七天
                </a-select-option>
                <a-select-option :value="2592000">
                  一个月
                </a-select-option>
                <a-select-option :value="7776000">
                  三个月
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="刷新令牌有效期" prop="client.refreshTokenValiditySeconds" help="永久有效设为：-1">
            <a-input v-model.trim="form.client.refreshTokenValiditySeconds" :min="-1" >
              <a-select slot="addonAfter" v-model.trim="form.client.refreshTokenValiditySeconds" style="width: 100px">
                <a-select-option :value="-1">
                  永久有效
                </a-select-option>
                <a-select-option :value="3600">
                  1小时
                </a-select-option>
                <a-select-option :value="7200">
                  2小时
                </a-select-option>
                <a-select-option :value="43200">
                  12小时
                </a-select-option>
                <a-select-option :value="86400">
                  一天
                </a-select-option>
                <a-select-option :value="604800">
                  七天
                </a-select-option>
                <a-select-option :value="2592000">
                  一个月
                </a-select-option>
                <a-select-option :value="7776000">
                  三个月
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-model-item>
        </a-tab-pane>
      </a-tabs>
    </a-form-model>
  </div>
</template>
<script>

import { save, getById } from '@/api/application'
export default {
  name: 'ApplicationForm',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        appId: '',
        appKey: '',
        appSecret: '',
        sourceId: 'base-service',
        appName: '',
        developerType: 0,
        icon: '',
        type: 'pc',
        os: '',
        host: '',
        status: 1,
        remark: '',
        client: {
          accessTokenValiditySeconds: 43200,
          refreshTokenValiditySeconds: 604800,
          authorizedGrantTypes: [],
          autoApproveScopes: [],
          registeredRedirectUri: '',
          scope: ['user_info']
        }
      },
      rules: {
        appName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sourceId: [{ required: true, message: '请输入来源ID', trigger: 'blur' }],
        developerType: [{ required: true, message: '请选择开发者类型', trigger: 'change' }],
        type: [{ required: true, message: '请选择应用类型', trigger: 'change' }],
        'client.authorizedGrantTypes': [{ type: 'array', required: true, message: '请选择授权类型', trigger: 'change' }],
        'client.scope': [{ type: 'array', required: true, message: '请输入授权范围', trigger: 'change' }],
        'client.registeredRedirectUri': [{ required: true, message: '请输入重定向地址', trigger: 'change' }],
        'client.accessTokenValiditySeconds': [{ required: true, message: '请输入令牌有效期', trigger: 'change' }]
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
    async loadData(data) {
      if (data.appId) {
        getById({ appId: data.appId }).then(res => {
          if (res.data.client.registeredRedirectUri) {
            res.data.client.registeredRedirectUri = res.data.client.registeredRedirectUri.join(',')
          }
          console.log(res.data)
          this.$utils.merge(this.form, res.data)
        })
      }
    }
  }
}
</script>
