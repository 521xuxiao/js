<template>
  <div>
    <a-card style="height: 100%">
      <a-row :gutter="16" type="flex">
        <a-col>
          <system-menu @click="onClick" />
        </a-col>
        <a-col flex="16">
          <a-tabs v-model.trim.trim="activeKey" @change="onTabChange">
            <a-tab-pane key="页面">
              <span slot="tab">
                页面({{ counts['menu']+counts['action'] }})
              </span>
              <a-alert message="页面权限控制使用指令v-has=[权限标识1,权限标识2],拥有任意一个即可." type="info" show-icon />
            </a-tab-pane>
            <a-tab-pane key="接口">
              <span slot="tab">
                接口({{ counts['api'] }})
              </span>
            </a-tab-pane>
            <a-tab-pane key="数据" disabled>
              <span slot="tab">
                数据(暂不支持)({{ counts['data'] }})
              </span>
            </a-tab-pane>
          </a-tabs>
          <div class="tools-bar">
            <a-button v-if="params.sid" style="margin-top: 10px" type="primary" @click="() => onEdit()">
              新建
            </a-button>
            <a-button v-if="params.sid && activeKey==='接口'" type="primary" @click="showSyncConfirm">
              同步接口
            </a-button>
          </div>
         <a-table
         bordered
            :loading="loading"
            :row-key="record => record.id"
            :columns="columns"
            :data-source="treeData"
            :default-expand-all-rows="true"
            :pagination="false"
            :expanded-row-keys.sync="expandedKeys"
          >
            <template slot="name" slot-scope="text , record">
              <a-icon v-if="record.meta.icon" :type="record.meta.icon" />
              {{ record.name }}
            </template>
            <template slot="type" slot-scope="text , record">
              <a-tag v-if="record.type ==='api' || record.type ==='action'" color="green">
                {{ resourceTypeMap[record.type] }}
              </a-tag>
              <a-tag v-else color="blue">
                {{ resourceTypeMap[record.type] }}
              </a-tag>
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
              <a @click="() => onCopy(record)">复制</a>
              <a-divider type="vertical" />
              <a v-if="record.type ==='menu'" @click="() => onEdit(record,record.id)">添加下级</a>
              <a v-if="record.type ==='action'" @click="() => onBinding(record)">关联接口</a>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>

    <a-modal
      :title="modalTitle"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <menu-form v-model.trim.trim="currentRow" ref="form" @done="onSubmitDone" />
    </a-modal>

    <a-drawer
      placement="right"
      :width="720"
      :visible="drawerVisible"
      @close="onDrawerClose"
    >
      <span slot="title">
        <a-tag color="green">{{ currentRow.name }}</a-tag> - 关联接口
      </span>
      <api-select ref="apiSelect" @onChange="onApiSelectChange" />
    </a-drawer>
  </div>
</template>
<script>
import {  statusMap, remove,   grantAdd, grantRemove } from '@/api/menu'
import {apiSync,listBy,resourceTypeMap,listGranted} from '@/api/resource'
import SystemMenu from '@/views/public/system/SystemMenu'
import ApiSelect from '@/views/public/resource/ApiSelect'
import MenuForm from './components/MenuForm'
import ApiForm from './components/ApiForm'
import DataForm from './components/DataForm'

export default {
  name: 'PermissionResources',
  components: {
    SystemMenu,
    MenuForm,
    ApiForm,
    DataForm,
    ApiSelect
  },
  data() {
    return {
      columns: [
        {
          title: '显示名称',
          dataIndex: 'name',
          key: 'name',
          ellipsis: true,
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '权限标识',
          dataIndex: 'authority',
          ellipsis: true
        },
        {
          title: '访问路径',
          dataIndex: 'path',
          ellipsis: true
        },
        {
          title: '类型',
          dataIndex: 'type',
          width: '100px',
          ellipsis: true,
          scopedSlots: { customRender: 'type' }
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
          title: '更新时间',
          dataIndex: 'updateTime',
          ellipsis: true
        },
        {
          title: '操作',
          width: '200px',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      activeKey: '页面',
      loading: false,
      confirmLoading: false,
      visible: false,
      drawerVisible: false,
      modalTitle: '',
      treeData: [],
      treeDataSimple: [],
      statusMap: statusMap,
      resourceTypeMap: resourceTypeMap,
      params: {
        sid: '',
        types: []
      },
      counts: {
        action: 0,
        api: 0,
        data: 0,
        menu: 0,
        file: 0
      },
      expandedKeys: [],
      currentRow: {}
    }
  },
  computed: {

  },
  created() {
  },
  methods: {
    onClick(key) {
      this.loading = true
      this.params.sid = key
      this.handleLoad()
    },
    handleLoad() {
      let types = []
      if (this.activeKey === '页面') {
        types = ['menu', 'action']
      } else if (this.activeKey === '接口') {
        types = ['api', 'api_GROUP']
      } else if (this.activeKey === '数据') {
        types = ['data']
      }
      this.params.types = types
      listBy(this.params).then(({ data, extras }) => {
        const opt = {
          key: 'id',
          parentKey: 'parentId',
          children: 'children'
        }
        this.expandedKeys.length = 0
        // 深copy
        this.treeDataSimple = this.$utils.clone(data, true)
        const tree = this.$utils.toArrayTreeExt(data, opt)
        // 默认展开第一个节点和第二个节点
        tree.length && tree.forEach((item) => {
          if (item.children && item.children.length) {
            this.expandedKeys.push(item.id)
            item.children.forEach((item) => {
              this.expandedKeys.push(item.id)
            })
          } else {
            this.expandedKeys.push(item.id)
          }
        })
        this.counts = extras
        this.treeData = tree
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    onTabChange(activeKey) {
      this.activeKey = activeKey
      this.handleLoad()
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
    },
    onEdit(row, parentId) {
      if (!row) {
        row = { sid: this.params.sid }
      }
      if (parentId) {
        row.parentId = parentId
      }
      this.currentRow = row
      this.modalTitle = (row.id ? '编辑' : '新增') + this.activeKey
      this.visible = true
      const treeData = [...this.treeDataSimple]
      setTimeout(() => {

        this.$refs.form.loadData(row, treeData)
      }, 50)
    },
    onCopy(row, parentId) {
      const r = { ...row }
      r.id = null
      this.onEdit(r, parentId)
    },
    onBinding(row) {
      this.drawerVisible = true
      this.currentRow = row
      setTimeout(() => {
        listGranted({ grantToType: 'action', grantToIds: [row.id], types: ['api'] }).then(({ data }) => {
          const list = data || []
          const targetKeys = list.map(t => t.id)
          this.$refs.apiSelect.loadData(row.sid, targetKeys)
        })
      }, 50)
    },
    onDrawerClose() {
      this.drawerVisible = false
      this.currentRow = {}
    },
    onSubmitDone(success) {
      this.confirmLoading = false
      if (success) {
        this.handleCancel()
        this.handleLoad()
      }
    },
    showSyncConfirm() {
      const that = this
      this.$confirm({
        title: '确定同步吗？',
        content: `正在操作同步服务(${that.params.sid})接口.将覆盖原有接口,是否继续执行？`,
        onOk() {
          return apiSync({ sid: that.params.sid }).then(res => {
            res.success ? that.$message.success(res.message) : that.$message.error(res.message)
            that.handleLoad({ page: 1 })
          })
        }
      })
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
