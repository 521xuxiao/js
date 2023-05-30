<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="params"
      layout="inline"
      class="search-form"
    >
      <a-card>
        <a-form-model-item label="工号" prop="userNo">
          <a-input v-model.trim="params.userNo" placeholder="请输入工号" />
        </a-form-model-item>
        <a-form-model-item label="登录名" prop="userName">
          <a-input v-model.trim="params.userName" placeholder="请输入登录名" />
        </a-form-model-item>
        <a-form-model-item label="姓名" prop="fullName">
          <a-input v-model.trim="params.fullName" placeholder="请输入登录名" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleSearch">
            搜索
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
        </a-form-model-item>
      </a-card>
    </a-form-model>
    <a-card>
      <div slot="extra">
        <a-button type="primary" @click="() => onEdit()">
          新建
        </a-button>
      </div>
     <a-table
         bordered
        :columns="columns"
        :row-key="record => record.userId"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        size="middle"
        @change="handleTableChange"
         :scroll="{x:600}"
      >
        <template slot="avatar" slot-scope="text , record">
          <a-avatar :src="record.avatar" />
        </template>
        <template slot="status" slot-scope="text , record">
          <a-badge v-if="record.status === 1" status="success" :text="statusMap[record.status]" />
          <a-badge v-else status="error" :text="statusMap[record.status]" />
        </template>
        <template slot="operation" slot-scope="text , record">
          <a @click="() => onEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="() => onGrantRole(record)">授权角色</a>
        </template>
      </a-table>
    </a-card>

    <a-modal
      :title="modalTitle"
      :visible="visible"
      :confirm-loading="confirmLoading"
      destroy-on-close
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <user-form ref="form" @done="onSubmitDone" />
    </a-modal>
  </div>
</template>
<script>
import { statusMap, page } from '@/api/user'
import UserForm from './components/UserForm'

export default {
  name: 'PermissionUser',
  components: {
    UserForm
  },
  data() {
    return {
      columns: [
        {
          title: '头像',
          dataIndex: 'avatar',
          scopedSlots: { customRender: 'avatar' },
          width: '50px'
        },
        {
          title: '工号',
          dataIndex: 'userNo',
          ellipsis: true,
          width: '200px'
        },
        {
          title: '登录名',
          dataIndex: 'userName',
          ellipsis: true,
          width: '200px'
        },
        {
          title: '姓名',
          dataIndex: 'fullName',
          ellipsis: true,
          width: '200px'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          ellipsis: true,
          width: '100px'
        },
        {
          title: '直属部门',
          dataIndex: 'orgName',
          ellipsis: true,
          width: '200px'
        },
        {
          title: '直属领导',
          dataIndex: 'leaderUserName',
          ellipsis: true,
          width: '200px'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          ellipsis: true,
          width: '200px'
        },
        {
          title: '说明',
          dataIndex: 'remark',
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: '200px',
          fixed: 'right'
        }
      ],
      loading: false,
      confirmLoading: false,
      modalTitle: '',
      visible: false,
      pagination: { showSizeChanger: true, showTotal: total => `共 ${total} 条数据` },
      params: {
        page: 1,
        limit: 10,
        userNo: '',
        userName: '',
        fullName: ''
      },
      statusMap: statusMap,
      data: []
    }
  },
  created() {
    this.handleLoad()
  },
  methods: {
    handleSearch() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.params.page = 1
          this.handleLoad()
        }
        return false
      })
    },
    handleReset() {
      this.$refs.ruleForm.resetFields()
    },
    handleTableChange(pagination, filters, sorter) {
      this.params = {
        ...this.params,
        limit: pagination.pageSize,
        page: pagination.current
      }
      this.handleLoad()
    },
    handleLoad(params) {
      this.loading = true
      if (params) {
        this.params = { ...this.params, ...params }
      }
      this.pagination.current = this.params.page
      page(this.params).then(({ data }) => {
        const pagination = { ...this.pagination }
        this.data = data.records
        pagination.total = data.total
        this.pagination = pagination
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleOk(e) {
      this.confirmLoading = true
      this.$refs.form.onSubmit()
    },
    handleCancel(e) {
      this.$refs.form.resetForm()
      this.visible = false
    },
    onEdit(row) {
      this.visible = true
      if (!row) {
        row = {}
      }
      this.modalTitle = row.userId ? '编辑' : '新增'
      setTimeout(() => {
        this.$refs.form.loadData(row)
      }, 50)
    },
    onSubmitDone(success) {
      this.confirmLoading = false
      if (success) {
        this.handleCancel()
        this.handleLoad()
      }
    },
    onGrantRole(data) {
      this.$router.push({ path: '/permission/role' })
    }
  }
}
</script>
