<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="params"
      layout="inline"
      class="search-form"
    >
      <a-card>
        <a-form-model-item label="名称" prop="name">
          <a-input v-model.trim="params.name" placeholder="请输入名称" />
        </a-form-model-item>
        <a-form-model-item label="SID" prop="sid">
          <a-input v-model.trim="params.sid" placeholder="请输入sid" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <a-select v-model.trim="params.status" placeholder="请选择" allow-clear style="width: 120px">
            <a-select-option  key="">全部</a-select-option>
            <a-select-option v-for="(value,key) in statusMap" :key="key">
              {{ value }}
            </a-select-option>
          </a-select>
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
        :row-key="record => record.id"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        size="middle"
        @change="handleTableChange"
         :scroll="{x:600}"
      >
        <template slot="ssoEnabled" slot-scope="text , record">
          <a-switch disabled size="small" :checked="record.ssoEnabled" />
        </template>
        <template slot="status" slot-scope="text , record">
          <a-badge v-if="record.status === 1" status="success" :text="statusMap[record.status]" />
          <a-badge v-else status="error" :text="statusMap[record.status]" />
        </template>
        <template slot="operation" slot-scope="text , record">
          <a @click="() => onEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定删除吗?"
            @confirm="() => onDelete(record)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>

          <a-divider type="vertical" />
          <a @click="() => onDownload(record)">下载前端模板</a>

        </template>
      </a-table>
    </a-card>

    <a-modal
      :title="modalTitle"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <system-form ref="form" @done="onSubmitDone" />
    </a-modal>
  </div>
</template>
<script>
import { statusMap, page, remove } from '@/api/system'
import SystemForm from './components/SystemForm'

export default {
  name: 'PermissionSystem',
  components: {
    SystemForm
  },
  data() {
    return {
      columns: [
        {
          title: '系统名称',
          dataIndex: 'name',
          ellipsis: true,
          width: '150px'
        },
        {
          title: 'sid',
          dataIndex: 'sid',
          ellipsis: true,
          width: '150px'
        },
        {
          title: 'appId',
          dataIndex: 'appId',
          ellipsis: true,
          width: '150px'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          ellipsis: true,
          width: '80px'
        },
        {
          title: '开启sso',
          dataIndex: 'ssoEnabled',
          scopedSlots: { customRender: 'ssoEnabled' },
          ellipsis: true,
          width: '80px'
        },
        {
          title: 'sso跳转地址',
          dataIndex: 'ssoRedirectUri',
          ellipsis: true,
          width: '300px'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          ellipsis: true,
          width: '150px'
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
        name: '',
        sid: '',
        status: ''
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
      this.modalTitle = row ? '编辑' : '新增'
      this.visible = true
      setTimeout(() => {
        this.$refs.form.loadData(row)
      }, 50)
    },
    onSubmitDone(success) {
      this.confirmLoading = false
      if (success) {
        this.handleCancel()
        this.handleLoad()
        this.$bus.emit('load-system')
      }
    },
    onDelete(row) {
      remove({ id: row.id }).then(res => {
        res.success ? this.$message.success('删除成功') : this.$message.error('删除失败')
        this.handleLoad({ page: 1 })
        this.$bus.emit('load-system')
      })
    },
    onDownload(data) {
      window.open(`${this.$http.defaults.baseURL}/base/sys/downloadTemplateVue?id=${data.id}&access_token=${this.$store.getters['user/getToken']}`)
    }
  }
}
</script>
