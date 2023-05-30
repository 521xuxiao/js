<template>
  <div>
      <a-form-model
          ref="ruleForm"
          :model="params"
          layout="inline"
          class="search-form"
      >
        <a-card>
        <a-form-item label="请求标识" prop="path">
          <a-input type="text" v-model.trim="params.requestId" placeholder="请输入关键字"/>
        </a-form-item>
        <a-form-item label="请求路径" prop="path">
          <a-input type="text" v-model.trim="params.path" placeholder="请输入关键字"/>
        </a-form-item>
        <a-form-item label="IP" prop="ip">
          <a-input type="text" v-model.trim="params.ip" placeholder="请输入关键字"/>
        </a-form-item>
        <a-form-item label="服务名" prop="serviceId">
          <a-input type="text" v-model.trim="params.serviceId" placeholder="请输入关键字"/>
        </a-form-item>
        <a-form-item label="请求时间" prop="path">
          <a-range-picker v-model.trim="rangeTime"  format="YYYY-MM-DD" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch()">查询</a-button>&nbsp;
          <a-button @click="handleReset()">重置</a-button>
        </a-form-item>
        </a-card>
      </a-form-model>
    <a-card>
      <a-table
          size="small"
          bordered
          :columns="columns"
          :row-key="record => record.id"
          :data-source="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          :scroll="{x:800}"
      >
        <template slot="httpStatus" slot-scope="text , record">
          <a-badge  v-if="record.httpStatus==='200'"  status="success" :text="record.httpStatus" />
          <a-badge  v-else-if="record.httpStatus==='500'"  status="error" :text="record.httpStatus" />
          <a-badge  v-else  status="warning" :text="record.httpStatus" />
        </template>
        <template slot="detail" slot-scope="text , record">
          <a @click="openDrawer(record)">详情</a>
        </template>
        <template slot="ip" slot-scope="text , record">
          <p>{{record.ip}}</p>
          <p>{{record.region}}</p>
        </template>
      </a-table>
    </a-card>
    <a-drawer
              width="350"
              placement="right"
              @close="onClose"
              :visible="drawer">
      <div slot="title">
        {{ currentRow.path }}  {{ currentRow.httpStatus }} {{ currentRow.useTime }} ms
      </div>
      <div>
        <legend>请求标识</legend>
        <pre>{{ currentRow.requestId }}</pre>
        <legend>请求头</legend>
        <pre>
             {{ currentRow.headers ? JSON.stringify(JSON.parse(currentRow.headers), null, 4) : '' }}
        </pre>
        <legend>请求参数</legend>
        <pre>
              {{ currentRow.params ? JSON.stringify(JSON.parse(currentRow.params), null, 4) : '' }}
        </pre>
        <legend>请求内容</legend>
        <pre>
              {{ currentRow.body ? JSON.stringify(JSON.parse(currentRow.body), null, 4) : '' }}
        </pre>
        <legend>认证信息</legend>
        <pre>
              {{ currentRow.authentication ? JSON.stringify(JSON.parse(currentRow.authentication), null, 4) : '' }}
        </pre>
        <legend>IP/地域</legend>
        <pre>
          {{currentRow.ip}}
          {{currentRow.region}}
        </pre>
        <legend>错误信息</legend>
        <pre>
          {{ currentRow.error }}
        </pre>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { readUserAgent } from '@/utils'
import { accessLogsPage } from '@/api/api'
import moment from 'moment'
export default {
  name: 'AccessLogs',
  data() {
    return {
      drawer: false,
      loading: false,
      currentRow: {},
      pagination: { showSizeChanger: true, showTotal: total => `共 ${total} 条` },
      rangeTime: [moment(), moment()],
      params: {
        page: 1,
        limit: 10,
        requestId: '',
        path: '',
        ip: '',
        serviceId: '',
        startTime: '',
        endTime: ''
      },
      columns: [
        {
          title: '请求标识(requestId)',
          dataIndex: 'requestId',
          width: 230,
          ellipsis: true
        },
        {
          title: '请求地址',
          dataIndex: 'path',
          width: 220,
          ellipsis: true
        },
        {
          title: '请求方式',
          dataIndex: 'method',
          width: 100,
          ellipsis: true
        },

        {
          title: '客户端',
          width: 200,
          children: [
            {
              title: '浏览器',
              width: 100,
              ellipsis: true,
              customRender: (text, record) => {
                const userAgent = readUserAgent(record.userAgent)
                return `${userAgent.browser}`
              }
            },
            {
              title: '设备',
              width: 100,
              ellipsis: true,
              customRender: (text, record) => {
                const userAgent = readUserAgent(record.userAgent)
                return `${userAgent.terminal}`
              }
            },
            {
              title: 'IP',
              dataIndex: 'ip',
              width: 150,
              ellipsis: true
            },
            {
              title: '区域',
              dataIndex: 'region',
              width: 200,
              ellipsis: true
            }
          ]
        },
        {
          title: '服务名',
          dataIndex: 'serviceId',
          width: 150,
          ellipsis: true
        },
        {
          title: '响应状态',
          dataIndex: 'httpStatus',
          scopedSlots: { customRender: 'httpStatus' },
          width: 100,
          ellipsis: true
        },
        {
          title: '请求时间',
          dataIndex: 'requestTime',
          width: 150,
          ellipsis: true
        },
        {
          title: '响应时间',
          dataIndex: 'responseTime',
          width: 150,
          ellipsis: true
        },
        {
          title: '耗时',
          dataIndex: 'useTime',
          ellipsis: true,
          customRender: (text, record) => {
            return (record.useTime ? record.useTime : 0) + ' ms'
          }
        },
        {
          title: '详情',
          fixed: 'right',
          width: 100,
          scopedSlots: { customRender: 'detail' }
        }
      ],
      data: []
    }
  },
  mounted() {
    this.handleLoad()
  },
  methods: {
    openDrawer(data) {
      this.currentRow = data
      this.drawer = true
    },
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
      if (this.rangeTime.length > 0) {
        this.params.startTime = this.rangeTime[0].format('YYYY-MM-DD 00:00:00')
      }
      if (this.rangeTime.length > 1) {
        this.params.endTime = this.rangeTime[1].format('YYYY-MM-DD 23:59:59')
      }
      this.pagination.current = this.params.page
      accessLogsPage(this.params).then(({ data }) => {
        const pagination = { ...this.pagination }
        this.data = data.records
        pagination.total = data.total
        this.pagination = pagination
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    onClose() {
      this.drawer = false
    }
  }
}
</script>
