<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="登录名" prop="userName">
        <a-input v-model.trim="form.userName" placeholder="请输入登录名" :disabled="form.userId?true:false" />
      </a-form-model-item>
      <a-form-model-item label="密码" v-if="!form.userId" prop="password">
        <a-input type="password" v-model.trim="form.password" placeholder="请输入密码" />
      </a-form-model-item>
      <a-form-model-item label="密码确认" v-if="!form.userId" prop="checkPassword">
        <a-input type="password" has-feedback v-model.trim="form.checkPassword" placeholder="请再次输入密码" />
      </a-form-model-item>
      <a-form-model-item label="姓名" prop="fullName">
        <a-input v-model.trim="form.fullName" placeholder="请输入姓名" />
      </a-form-model-item>
      <a-form-model-item label="电子邮箱" v-if="!form.userId" prop="email">
        <a-input v-model.trim="form.email" placeholder="请输入电子邮箱" />
      </a-form-model-item>
      <a-form-model-item label="手机号码" v-if="!form.userId" prop="mobile">
        <a-input v-model.trim="form.mobile" placeholder="请输入手机号码" />
      </a-form-model-item>
      <a-form-model-item label="直属部门" prop="orgId">
        <org-select v-model.trim="form.orgId"></org-select>
      </a-form-model-item>
      <a-form-model-item label="直属领导" prop="leaderUserId">
        <user-select v-model.trim="leaderUser" @change="onLeaderUserChange"></user-select>
      </a-form-model-item>
      <a-form-model-item label="性别" prop="status">
        <a-radio-group v-model.trim="form.gender">
          <a-radio value="">
            未知
          </a-radio>
          <a-radio :value="1">
            男
          </a-radio>
          <a-radio :value="0">
            女
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="生日" prop="birthday">
        <a-date-picker v-model.trim="form.birthday" />
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
import UserSelect from '../../../public/user/UserSelect'
import OrgSelect from '../../../public/org/OrgSelect'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
import moment from 'moment'
import { save } from '@/api/user'
export default {
  name: 'SystemForm',
  components: { UserSelect, OrgSelect },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      loading: false,
      form: {
        userId: '',
        fullName: '',
        userName: '',
        email: '',
        mobile: '',
        password: '',
        checkPassword: '',
        status: 1,
        leaderUserId: '',
        remark: '',
        gender: '',
        orgId: '',
        birthday: null
      },
      leaderUser: {},
      rules: {
        fullName: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        orgId: [{ required: true, message: '请选择直属部门', trigger: 'change' }],
        leaderUserId: [{ required: true, message: '请选择直属部门', trigger: 'change' }],
        userName: [{ required: true, trigger: 'change', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入登录名'))
          } else if (!this.$regex.account.reg.test(value)) {
            callback(new Error(this.$regex.account.message))
          } else {
            callback()
          }
        } }],
        password: [{ required: true, trigger: 'change', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'))
          } else if (!this.$regex.password.reg.test(value)) {
            callback(new Error(this.$regex.password.message))
          } else {
            callback()
          }
        } }],
        checkPassword: [{ required: true, trigger: 'change', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== this.form.password) {
            callback(new Error('两次输入密码不一致'))
          } else {
            callback()
          }
        } }],
        email: [{ required: true, trigger: 'change', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入电子邮箱'))
          } else if (!this.$regex.email.reg.test(value)) {
            callback(new Error(this.$regex.email.message))
          } else {
            callback()
          }
        } }],
        mobile: [{ required: true, trigger: 'change', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入手机号码'))
          } else if (!this.$regex.mobile.reg.test(value)) {
            callback(new Error(this.$regex.mobile.message))
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
          const data = { ...this.form }
          if (data.birthday) {
            data.birthday = moment(data.birthday).format('YYYY-MM-DD  HH:mm:ss')
          }
          save(data).then(res => {
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
        this.leaderUser = {
          key: data.leaderUserId,
          label: `${data.leaderUserName} - ${data.leaderUserNo}`
        }
        this.$utils.merge(this.form, data)
      }
    },
    onLeaderUserChange(data){
      this.form.leaderUserId = data.key
    }

  }
}
</script>
