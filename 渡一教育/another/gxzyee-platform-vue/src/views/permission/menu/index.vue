<template>
  <div>
      <a-form-model
                  ref="ruleForm"
                  :model="params"
                  layout="inline"
                  class="search-form"
          >
            <a-card>
              <a-form-model-item label="权限系统" prop="category">
                <system-select @change="onClick" />
              </a-form-model-item>
            </a-card>
          </a-form-model>
    <a-card>
      <div slot="extra">
        <a-button type="primary" @click="() => onEdit()">
          新建
        </a-button>
      </div>
      <a-alert banner message="页面元素或按钮,权限控制使用指令“v-has=[权限标识1,权限标识2]”." type="info" show-icon />
      <a-table
              bordered
            :loading="loading"
            :row-key="record => record.id"
            :columns="columns"
            :data-source="treeData"
            :default-expand-all-rows="true"
            :pagination="false"
            :expanded-row-keys.sync="expandedKeys"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :scroll="{x:600}"
          >
            <template slot="name" slot-scope="text , record">
              <a-icon v-if="record.meta.icon" :type="record.meta.icon" />
              {{ record.name }}
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
              <a v-if="record.type ==='btn'" @click="() => onBinding(record)">关联接口</a>
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
      <menu-form ref="form" v-model.trim="currentRow"  @done="onSubmitDone" />
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
import { list, statusMap, remove,  grantAdd, grantRemove } from '@/api/menu'
import {listGranted} from '@/api/resource'
import SystemMenu from '@/views/public/system/SystemMenu'
import ApiSelect from '@/views/public/resource/ApiSelect'
import MenuForm from './components/MenuForm'
import SystemSelect from '@/views/public/system/SystemSelect'
export default {
  name: 'PermissionMenu',
  components: {
    SystemSelect,
    MenuForm,
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
          width: '200px',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '组件名称',
          dataIndex: 'code',
          width: '300px',
          ellipsis: true
        },
        {
          title: '权限名称',
          dataIndex: 'authority',
          width: '300px',
          ellipsis: true
        },
        {
          title: '访问路径',
          dataIndex: 'path',
          width: '300px',
          ellipsis: true
        },
        {
          title: '类型',
          dataIndex: 'type',
          width: '100px',
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          ellipsis: true,
          width: '100px',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          width: '200px',
          ellipsis: true
        },
        {
          title: '说明',
          dataIndex: 'remark'
        },
        {
          title: '操作',
          width: '250px',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          fixed: 'right'
        }
      ],
      loading: false,
      confirmLoading: false,
      visible: false,
      drawerVisible: false,
      modalTitle: '',
      treeData: [],
      statusMap: statusMap,
      params: {
        sid: ''
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
    onClick(key) {
      this.loading = true
      this.params.sid = key
      this.selectedRowKeys = []
      this.handleLoad()
    },
    handleLoad() {
      list({ sid: this.params.sid }).then(({ data, extras }) => {
        const opt = {
          key: 'id',
          parentKey: 'parentId',
          children: 'children'
        }
        this.expandedKeys.length = 0
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
        this.treeData = tree
        this.loading = false
      }).catch(() => {
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
      this.currentRow = {}
      this.visible = false
    },
    onEdit(row, parentId) {
      if (!row) {
        row = { sid: this.params.sid }
      }
      if (parentId) {
        row = { sid: this.params.sid, parentId: parentId }
      }
      this.modalTitle = row.id ? '编辑' : '新增'
      this.currentRow = row
      this.visible = true
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
