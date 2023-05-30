<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="params"
      layout="inline"
      class="search-form"
    >
      <a-card>
        <a-form-model-item label="AppId" prop="appId">
          <a-input v-model.trim="params.appId" placeholder="请输入AppId" />
        </a-form-model-item>
        <a-form-model-item label="名称" prop="appName">
          <a-input v-model.trim="params.appName" placeholder="请输入中文/英文名称" />
        </a-form-model-item>
        <a-form-model-item label="来源标识" prop="sourceId">
          <a-input v-model.trim="params.sourceId" placeholder="请输入来源标识" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <a-select v-model.trim="params.status" placeholder="请选择" allow-clear style="width: 120px">
            <a-select-option  key="">全部</a-select-option>
            <a-select-option v-for="(value, key) in statusMap" :key="key">
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="开发者类型" prop="developerType">
          <a-select v-model.trim="params.developerType" placeholder="请选择" allow-clear style="width: 120px">
            <a-select-option  key="">全部</a-select-option>
            <a-select-option v-for="(value, key) in developerTypeMap" :key="key">
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
        :row-key="record => record.appId"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        size="middle"
        @change="handleTableChange"
         :scroll="{x:600}"
      >
        <template slot="icon" slot-scope="text , record">
          <a-avatar shape="square" :size="32" :src="record.icon" />
        </template>
        <template slot="appKey" slot-scope="text , record">
          {{ record.appKey }}
          <a-tooltip placement="right">
            <template slot="title">
              <span>复制到剪切板</span>
            </template>
            <a v-clipboard:copy="record.appKey" v-clipboard:success="onCopy"><a-icon type="copy" /></a>
          </a-tooltip>
        </template>
        <template slot="appSecret" slot-scope="text , record">
          <span v-if="record.show" style="margin-right: 8px;">{{ record.appSecret }}</span>
          <span v-else style="margin-right: 8px;">*****</span>
          <a v-if="!record.show" @click="() => onShow(record.appId, 'show',true)">显示</a>
          <a v-else-if="record.show" @click="() => onShow(record.appId,'show',false)">隐藏</a>&nbsp;
          <a-tooltip placement="right">
            <template slot="title">
              <span>复制到剪切板</span>
            </template>
            <a v-clipboard:copy="record.appSecret" v-clipboard:success="onCopy"><a-icon type="copy" /></a>
          </a-tooltip>
        </template>
        <template slot="status" slot-scope="text , record">
          <a-badge v-if="record.status === 1" status="success" :text="statusMap[record.status]" />
          <a-badge v-else status="error" :text="statusMap[record.status]" />
        </template>
        <template slot="developerType" slot-scope="text , record">
          <a-tag v-if="record.developerType === 0" color="blue">
            {{ developerTypeMap[record.developerType] }}
          </a-tag>
          <a-tag v-else-if="record.developerType === 1" color="blue">
            {{ developerTypeMap[record.developerType] }}
          </a-tag>
          <a-tag v-else color="blue">
            {{ developerTypeMap[record.developerType] }}
          </a-tag>
        </template>
        <template slot="type" slot-scope="text , record">
          {{ appTypeMap[record.type] }}
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
        </template>
      </a-table>
    </a-card>

    <a-modal
      :title="modalTitle"
      :visible="visible"
      :width="700"
      @cancel="handleCancel"
      @ok="handleOk"
    >
      <application-form ref="form" @done="onSubmitDone" />
    </a-modal>
  </div>
</template>
<script>
import { statusMap, developerTypeMap, appTypeMap, getPage, remove } from '@/api/application'
import ApplicationForm from './components/ApplicationForm'

export default {
  name: 'PlatformApplication',
  components: {
    ApplicationForm
  },
  data() {
    return {
      columns: [
        {
          title: '应用图标',
          dataIndex: 'icon',
          ellipsis: true,
          width: '80px',
          scopedSlots: { customRender: 'icon' }
        },
        {
          title: '应用名称',
          dataIndex: 'appName',
          ellipsis: true
        },
        {
          title: 'AppId',
          dataIndex: 'appId',
          width: '200px',
          ellipsis: true
        },
        {
          title: 'AppKey',
          dataIndex: 'appKey',
          width: '200px',
          ellipsis: true,
          scopedSlots: { customRender: 'appKey' }
        },
        {
          title: 'AppSecret',
          dataIndex: 'appSecret',
          width: '200px',
          scopedSlots: { customRender: 'appSecret' }
        },
        {
          title: '开发者类型',
          dataIndex: 'developerType',
          ellipsis: true,
          scopedSlots: { customRender: 'developerType' },
          width: '100px'
        },
        {
          title: '应用类型',
          dataIndex: 'type',
          ellipsis: true,
          scopedSlots: { customRender: 'type' },
          width: '100px',
        },
        {
          title: '主页',
          dataIndex: 'host',
          ellipsis: true,
          scopedSlots: { customRender: 'host' },
          width: '200px',
        },
        {
          title: '状态',
          dataIndex: 'status',
          ellipsis: true,
          scopedSlots: { customRender: 'status' },
          width: '100px',
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
      visible: false,
      modalTitle: '',
      pagination: { showSizeChanger: true, showTotal: total => `共 ${total} 条数据` },
      params: {
        page: 1,
        limit: 10,
        appId: '',
        appName: '',
        status: '',
        sourceId: '',
        developerType: ''
      },
      statusMap: statusMap,
      developerTypeMap: developerTypeMap,
      appTypeMap: appTypeMap,
      data: []
    }
  },
  mounted() {
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
      getPage(this.params).then(({ data }) => {
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
      if (!row) {
        row = {}
      }
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
    onDelete(row) {
      remove({ id: row.appId }).then(res => {
        res.success ? this.$message.success('删除成功') : this.$message.error('删除失败')
        this.handleLoad({ page: 1 })
      })
    },
    onShow(key, dataIndex, value) {
      const dataSource = [...this.data]
      const target = dataSource.find(item => item.appId === key)
      if (target) {
        target[dataIndex] = value
        this.data = dataSource
      }
    },
    onCopy(e) {
      this.$message.success('复制成功')
    }
  }
}
</script>
