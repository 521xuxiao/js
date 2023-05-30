<template>
  <div>
    <a-card style="height: 100%">
      <a-row>
        <a-col :span="4" style="height: 100%;border-right: 1px solid #e8e8e8;">
          <h3>权限系统</h3>
          <system-select @change="onSelectSystemChange" />
         <a-table
                  :show-header="false"
                  :columns="columns"
                  :row-key="record => record.id"
                  :data-source="dataGroup"
                  :pagination="pagination"
                  size="middle"
                  :scroll="{x:500}"
                  @change="handleTableChange"
          >
            <template slot="title">
              接口分组
              <a-button v-if="params.sid" title="新建分组" type="primary" shape="circle" icon="plus" size="small" @click="() => onEdit({type:'group'})" />
            </template>
            <template slot="operation" slot-scope="text , record">
              <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                  <a-icon type="more" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a @click="() => onEdit(record)">编辑</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a-popconfirm
                            title="确定删除吗?"
                            @confirm="() => onDelete(record)"
                    >
                      <a href="javascript:;">删除</a>
                    </a-popconfirm>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </a-table>
        </a-col>
        <a-col :span="20">
          <a-card>
            <div slot="extra">
              <a-button-group v-if="params.sid">
                <a-button type="primary" @click="() => onEdit()">
                  新建
                </a-button>
                <a-button type="primary">
                  发布
                </a-button>
                <a-button type="primary" @click="() => showImportSwagger()">
                  导入swagger文档
                </a-button>
              </a-button-group>
            </div>
            <a-table
                    bordered
                    :loading="loading"
                    :row-key="record => record.id"
                    :columns="columns2"
                    :data-source="data"
                    :pagination="pagination2"
                    @change="handleTableChange2"
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                    :scroll="{x:500}"
                    size="middle"
            >
              <template slot="name" slot-scope="text , record">
                <a-icon v-if="record.meta.icon" :type="record.meta.icon" />
                {{ record.name }}
              </template>
              <template slot="status" slot-scope="text , record">
                <a-tag v-if="record.status === 1" color="green"  >{{statusMap[record.status]}}</a-tag>
                <a-tag v-else>{{statusMap[record.status]}}</a-tag>
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
                <a @click="() => onCopy(record)">复制</a>
                <a-divider type="vertical" />
                <a v-if="record.type ==='menu'" @click="() => onEdit(record,record.id)">添加下级</a>
                <a v-if="record.type ==='btn'" @click="() => onBinding(record)">关联接口</a>
                <a @click="() => onCopy(record)">发布历史</a>
              </template>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <page-modal
      :title="modalTitle"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @close="handleCancel"
    >
      <api-group-form v-if="currentRow.type==='group'" ref="form" v-model.trim="currentRow"  @done="onSubmitDone" />
      <api-form v-if="currentRow.type!=='group'" ref="form" v-model.trim="currentRow"  @done="onSubmitDone2" />
    </page-modal>

    <import-swagger-modal :sid="this.params.sid" :visible="visibleImport" @done="onImportSwaggerDone"></import-swagger-modal>
  </div>
</template>
<script>
import { page, list, statusMap, remove, importSwagger, listGranted, grantAdd, grantRemove } from '@/api/api'
import SystemSelect from '@/views/public/system/SystemSelect'
import ApiForm from './components/ApiForm'
import ApiGroupForm from './components/ApiGroupForm'
import ImportSwaggerModal from './components/ImportSwaggerModal'

export default {
  name: 'PlatformApi',
  components: {
    ImportSwaggerModal,
    SystemSelect,
    ApiForm,
    ApiGroupForm
  },
  data() {
    return {
      columns: [
        {
          title: '显示名称',
          dataIndex: 'name',
          key: 'name',
          width: '200px',
          ellipsis: true,
          customCell: (record) => {
            return {
              on: {
                click: (event) => {
                  this.onCellClick(record)
                }
              }
            }
          }
        },
        {
          title: '操作',
          width: '200px',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      columns2: [
        {
          title: '接口名称',
          dataIndex: 'name',
          key: 'name',
          ellipsis: true,
          width: '200px',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '权限名称',
          dataIndex: 'authority',
          width: '200px',
          ellipsis: true
        },
        {
          title: '分组',
          dataIndex: 'parentName',
          width: '150px',
          ellipsis: true
        },
        {
          title: '请求方式',
          dataIndex: 'meta.method',
          width: '100px',
          ellipsis: true
        },
        {
          title: '请求Path',
          dataIndex: 'path',
          width: '200px',
          ellipsis: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: '100px',
          ellipsis: true,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '说明',
          dataIndex: 'remark',
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '250px',
          scopedSlots: { customRender: 'operation' },
          fixed: 'right'
        }
      ],
      loading: false,
      confirmLoading: false,
      visible: false,
      visibleImport: false,
      drawerVisible: false,
      modalTitle: '',
      dataGroup: [],
      data: [],
      statusMap: statusMap,
      pagination: { size: 'small' },
      pagination2: { showSizeChanger: true, showTotal: total => `共 ${total} 条数据` },
      paramsGroup: {
        page: 1,
        limit: 30,
        type: 'group',
        sid: ''
      },
      params: {
        page: 1,
        limit: 10,
        sid: '',
        type: 'api',
        parentId: ''
      },
      selectedRowKeys: [],
      expandedKeys: [],
      currentRow: {}
    }
  },
  computed: {

  },
  created() {
  },
  methods: {
    onSelectSystemChange(key) {
      this.paramsGroup.sid = key
      this.params.sid = key
      this.selectedRowKeys = []
      this.handleLoadGroup()
    },
    handleTableChange(pagination, filters, sorter) {
      this.paramsGroup = {
        ...this.paramsGroup,
        limit: pagination.pageSize,
        page: pagination.current
      }
      this.handleLoadGroup()
    },
    handleTableChange2(pagination, filters, sorter) {
      this.params = {
        ...this.params,
        limit: pagination.pageSize,
        page: pagination.current
      }
      this.handleLoad()
    },
    onCellClick(row) {
      this.params.parentId = row.id
      this.selectedRowKeys = []
      this.handleLoad()
    },
    handleLoadGroup(params) {
      if (params) {
        this.paramsGroup = { ...this.paramsGroup, ...params }
      }
      page({ sid: this.paramsGroup.sid, type: this.paramsGroup.type }).then(({ data }) => {
        const pagination = { ...this.pagination }
        this.dataGroup = data.records
        pagination.total = data.total
        this.pagination = pagination
        if (this.dataGroup && this.dataGroup.length) {
          this.handleLoad({ page: 1, parentId: this.dataGroup[0].id })
        }
      })
    },
    handleLoad(params) {
      this.loading = true
      if (params) {
        this.params = { ...this.params, ...params }
      }
      this.pagination2.current = this.params.page
      page(this.params).then(({ data }) => {
        const pagination = { ...this.pagination2 }
        this.data = data.records
        pagination.total = data.total
        this.pagination2 = pagination
        this.loading = false
      })
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleOk(e) {
      this.confirmLoading = true
      this.$refs.form.onSubmit()
    },
    handleCancel(e) {
      if (this.$refs.form) {
        this.$refs.form.resetForm()
      }
      this.visible = false
      this.currentRow = {}
    },
    onEdit(row, parentId) {
      if (!row) {
        row = {}
      }
      row.parentId = parentId
      row.sid =this.params.sid
      this.modalTitle = row.id ? '编辑' : '新增'
      this.currentRow = row
      this.visible = true
    },
    onCopy(row, parentId) {
      const r = { ...row }
      r.id = null
      this.onEdit(r, parentId)
    },
    onSubmitDone(success) {
      this.confirmLoading = false
      if (success) {
        this.handleCancel()
        this.handleLoadGroup()
      }
    },
    onSubmitDone2(success) {
      this.confirmLoading = false
      if (success) {
        this.handleCancel()
        this.handleLoad()
      }
    },
    showImportSwagger() {
      this.visibleImport = true
    },
    onImportSwaggerDone(e, ok) {
      this.visibleImport = false
      if (ok) {
        this.params.parentId = ''
        this.handleLoadGroup({ page: 1 })
      }
    },
    onDelete(row) {
      remove({ id: row.id }).then(res => {
        res.success ? this.$message.success('删除成功') : this.$message.error('删除失败')
        this.handleLoad({ page: 1 })
      })
    },
    onApiSelectChange(targetKeys, direction, moveKeys) {
      if (direction === 'left') {
        grantRemove({ grantToId: this.currentRow.id, grantToType: 'action', resources: moveKeys }).then(res => {
          res.success ? this.$message.success('移除成功') : this.$message.error('移除失败')
        })
      } else {
        grantAdd({ grantToId: this.currentRow.id, grantToType: 'action', resources: moveKeys }).then(res => {
          res.success ? this.$message.success('添加成功') : this.$message.error('添加失败')
        })
      }
    }
  }
}
</script>
<style lang="less">
  .tools-bar .ant-btn {
    margin-right: 8px;
    margin-bottom: 12px;
  }
</style>
