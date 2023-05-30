<template>
  <a-card style="height: 100%">
    <a-row :gutter="16" type="flex" style="height: 100%">
      <a-col flex="6" style="border-right: 1px solid #e8e8e8;">
        <h3>组织机构 <a-button type="primary" shape="circle" icon="plus" size="small" @click="() => onEdit()" /></h3>
        <a-tree
          v-model.trim="checkedKeys"
          :replace-fields="{children:'children', key:'id',title:'name' }"
          :block-node="true"
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :selected-keys="selectedKeys"
          :tree-data="treeData"
          @expand="onExpand"
          @select="onSelect"
        >
          <template slot="custom" slot-scope="item">
            <a-icon v-if="item.type===1" type="apartment" />
            <a-icon v-else type="team" />
            <span>&nbsp;&nbsp;{{ item.name }}</span>
            <div style="float: right">
              <span class="icon-wrap" title="添加下级">
                <a-icon type="plus" @click="onEdit(item,true)" />
              </span>
              <span class="icon-wrap" title="编辑" @click="onEdit(item)">
                <a-icon type="edit" />
              </span>
              <span class="icon-wrap" title="删除" @click="onRemove(item)">
                <a-icon type="delete" />
              </span>
            </div>
          </template>
        </a-tree>
      </a-col>
      <a-col flex="18">
        <a-skeleton :loading="loading">
          <a-descriptions title="机构信息"   size="small">
            <a-descriptions-item label="机构名称">
              {{ currentRow.name }}
            </a-descriptions-item>
            <a-descriptions-item label="机构编码">
              {{ currentRow.code }}
            </a-descriptions-item>
            <a-descriptions-item label="类型">
              <span v-if="currentRow.type === 1">
                单位或部门
              </span>
              <span v-else-if="currentRow.type === 2">
                组
              </span>
            </a-descriptions-item>
            <a-descriptions-item label="负责人">
              {{ currentRow.headUserLabel }}
            </a-descriptions-item>
            <a-descriptions-item label="状态">
              <a-badge v-if="currentRow.status === 1" status="success" :text="statusMap[currentRow.status]" />
              <a-badge v-else status="error" :text="statusMap[currentRow.status]" />
            </a-descriptions-item>
            <a-descriptions-item label="更新时间">
              {{ currentRow.updateTime }}
            </a-descriptions-item>
            <a-descriptions-item label="说明">
              {{ currentRow.remark }}
            </a-descriptions-item>
          </a-descriptions>
        </a-skeleton>
        <a-tabs v-model.trim="activeKey">
          <a-tab-pane key="组织成员" tab="组织成员">
            <a-row>
              <a-button v-if="currentRow.id" type="primary" @click="onAddUsers">添加成员</a-button>
            </a-row>
           <a-table
         bordered
              :columns="userColumns"
              :row-key="record => record.id"
              :data-source="dataUsers"
              :pagination="pagination"
              :loading="loading"
              size="middle"
              @change="handleTableChange"
            >
              <template slot="avatar" slot-scope="text , record">
                <a-avatar :src="record.avatar" />
              </template>
              <template slot="leader" slot-scope="text , record">
                <a-icon type="star"  theme="twoTone" :two-tone-color="record.leader?'orange':'#cccccc'" ></a-icon>
              </template>
              <template slot="operation" slot-scope="text , record">
                <a-popconfirm
                  title="确定移除成员吗?"
                  @confirm="() => onDeleteUser(record)"
                >
                  <a href="javascript:;">移除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
    <a-modal
      :title="modalTitle"
      :visible="visible"
      destroy-on-close
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <org-form ref="form" v-model.trim="form" :org-tree="treeData" @done="onSubmitDone" />
    </a-modal>

    <a-modal
      title="选择成员"
      :visible="visibleUser"
      destroy-on-close
      @ok="handleUserOk"
      @cancel="handleUserCancel"
    >
      <user-select
        mode="multiple"
        :disabled-value="dataUsers"
        v-model.trim="selectedUsers"
      />
    </a-modal>
  </a-card>

</template>
<script>
import { list, statusMap, remove, listUsersByOrgId, addOrgUsers, removeOrgUser } from '@/api/org'
import OrgForm from './components/OrgForm'
import UserSelect from '@/views/public/user/UserSelect'
export default {
  name: 'PermissionOrg',
  components: {
    OrgForm,
    UserSelect
  },
  data() {
    return {
      activeKey: '组织成员',
      loading: true,
      confirmLoading: false,
      visible: false,
      visibleUser: false,
      modalTitle: '',
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      searchValue: '',
      treeData: [],
      currentRow: {},
      form: {},
      statusMap,
      userColumns: [
        {
          title: '头像',
          dataIndex: 'avatar',
          scopedSlots: { customRender: 'avatar' },
          width: '50px'
        },
        {
          title: '姓名',
          dataIndex: 'fullName',
          key: 'fullName',
          ellipsis: true,
          width: '100px'
        },
        {
          title: '工号',
          dataIndex: 'userNo',
          key: 'userNo',
          ellipsis: true,
          width: '100px'
        },
        {
          title: '负责人',
          dataIndex: 'leader',
          key: 'leader',
          ellipsis: true,
          scopedSlots: { customRender: 'leader' },
          width: '100px'
        },
        {
          title: '部门名称',
          dataIndex: 'orgName',
          key: 'orgName',
          ellipsis: true,
          width: '100px'
        },
        {
          title: '部门编码',
          dataIndex: 'orgCode',
          key: 'orgCode',
          ellipsis: true,
          width: '100px'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: '100px'
        }
      ],
      pagination: { showSizeChanger: true, showTotal: total => `共 ${total} 条数据` },
      params: {
        page: 1,
        limit: 10,
        orgId: ''
      },
      dataUsers: [],
      selectedUsers: []
    }
  },
  created() {
    this.handleLoad()
  },
  methods: {

    handleLoad() {
      this.loading = true
      list({ keyword: this.searchValue }).then(({ data, extras }) => {
        const opt = {
          key: 'id',
          parentKey: 'parentId',
          children: 'children'
        }
        data.forEach((item) => {
          item.key = item.id
          item.value = item.id
          item.label = item.name
          item.scopedSlots = { title: 'custom' }
          item.headUserLabel = item.headUserId ? `${item.headUserFullName}(${item.headUserNo})` : ''
        })
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
      }).finally(() => {
        this.loading = false
      })
    },
    onExpand(expandedKeys) {
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onSelect(selectedKeys, info) {
      if (selectedKeys.length === 0) { return }
      this.currentRow = info.selectedNodes[0].data.props
      this.selectedKeys = selectedKeys
      this.loadUsersData()
    },
    onChange(e) {
      const value = e.target.value
      this.searchValue = value
      this.handleLoad()
    },
    onEdit(item, add) {
      this.modalTitle = (add ? '新增机构' : '编辑机构')
      this.visible = true
      if (item) {
        this.currentRow = item
        if (add) {
          this.form = { parentId: item.id }
        } else {
          this.form = this.$utils.clone(item, true)
        }
      }
    },
    onRemove(row) {
      const that = this
      this.$confirm({
        title: `删除机构 ${row.name}`,
        content: `删除机构后，机构成员将会自动移动到根机构下，请再次确认。`,
        onOk() {
          return remove({ id: row.id }).then(res => {
            res.success ? that.$message.success('删除成功') : that.$message.error('删除失败')
            that.currentRow = {}
            that.handleLoad()
          })
        }
      })
    },
    handleOk(e) {
      this.confirmLoading = true
      this.$refs.form.onSubmit()
    },
    handleCancel(e) {
      this.form = {}
      this.visible = false
      this.$refs.form.resetForm()
    },
    onSubmitDone(success, form) {
      this.confirmLoading = false
      if (success) {
        this.currentRow = { ...form }
        this.handleCancel()
        this.handleLoad()
        this.loadUsersData()
      }
    },
    handleTableChange(pagination, filters, sorter) {
      this.params = {
        ...this.params,
        limit: pagination.pageSize,
        page: pagination.current
      }
      this.loadUsersData()
    },
    loadUsersData() {
      if (this.activeKey === '组织成员') {
        this.params.orgId = this.currentRow.id
        listUsersByOrgId(this.params).then(({ data }) => {
          const pagination = { ...this.pagination }
          this.dataUsers = data.records
          pagination.total = data.total
          this.pagination = pagination
        }).catch(() => {
        })
      }
    },
    onDeleteUser(row) {
      removeOrgUser({ orgId: row.orgId, userId: row.userId }).then(res => {
        res.success ? this.$message.success('移除成功') : this.$message.error('移除失败')
        this.loadUsersData()
      })
    },
    onAddUsers() {
      this.visibleUser = true
    },
    handleUserOk(e) {
      if (this.selectedUsers.length > 0) {
        const userIds = this.selectedUsers.map(t => t.key).join(',')
        addOrgUsers({ orgId: this.currentRow.id, userIds: userIds }).then(res => {
          res.success ? this.$message.success('添加成功') : this.$message.error('添加失败')
        }).finally(() => {
          this.handleUserCancel()
          this.loadUsersData()
        })
      } else {
        this.$message.warning('请选择用户')
      }
    },
    handleUserCancel(e) {
      this.visibleUser = false
      this.selectedUsers = []
    }
  }
}
</script>

<style lang="less" scoped>
  .icon-wrap {
    padding: 0 5px;
    display: inline-block;
  }
</style>
