<template>
  <div>
    <a-form-model ref="ruleForm" :model="params" layout="inline" class="search-form">
      <a-card>
        <a-form-model-item label="权限系统" prop="category">
          <system-select @change="onSelectChange" />
        </a-form-model-item>
      </a-card>
    </a-form-model>
    <a-card>
      <div slot="extra">
        <a-button type="primary" @click="() => onEdit()"> 新建 </a-button>
      </div>
      <a-table
        bordered
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        size="middle"
        @change="handleTableChange"
        :scroll="{ x: 600 }"
      >
        <template slot="status" slot-scope="text, record">
          <a-badge v-if="record.status === 1" status="success" :text="statusMap[record.status]" />
          <a-badge v-else status="error" :text="statusMap[record.status]" />
        </template>
        <template slot="operation" slot-scope="text, record">
          <a @click="() => onEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => onDelete(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>

          <a-divider type="vertical" />
          <a @click="() => onDetails(record)">详情</a>
        </template>
      </a-table>
    </a-card>

    <page-modal :title="modalTitle" :visible="visibleDetails" @close="onDetailsClose">
      <a-descriptions size="small" :title="currentRow.name">
        <a-descriptions-item label="显示名称">
          {{ currentRow.name }}
        </a-descriptions-item>
        <a-descriptions-item label="权限名称">
          {{ currentRow.code }}
        </a-descriptions-item>
        <a-descriptions-item label="权限标识">
          {{ currentRow.authority }}
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
      <a-tabs v-model.trim="activeKey" @change="onTabsChange">
        <a-tab-pane key="页面权限" tab="页面权限">
          <menu-select ref="menuSelect" :selected-keys="menuSelectedKeys" @change="onMenuSelectChange" />
          <a-row>
            <a-col :span="14" :offset="8">
              <a-button v-if="currentRow.id" type="primary" @click="onSaveMenu"> 保存 </a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="角色成员" tab="角色成员">
          <a-row>
            <a-button v-if="currentRow.id" type="primary" @click="onAddUsers">添加成员</a-button>
          </a-row>
          <a-table bordered :columns="columns2" :row-key="(record) => record.userId" :data-source="dataRoles" :pagination="false" :loading="loading" size="middle">
            <template slot="operation" slot-scope="text, record">
              <a-popconfirm title="确定移除成员吗?" @confirm="() => onDeleteUser(record)">
                <a href="javascript:;">移除</a>
              </a-popconfirm>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </page-modal>
    <a-modal :title="modalTitle" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
      <role-form ref="form" @done="onSubmitDone" />
    </a-modal>

    <a-modal title="选择成员" :visible="visibleUser" destroy-on-close @ok="handleUserOk" @cancel="handleUserCancel">
      <user-select v-model.trim="selectedUsers" :disabled-value="dataUsers" mode="multiple" />
    </a-modal>
  </div>
</template>
<script>
import { page, statusMap, remove, listUsersByRoleId, removeUser, addRoleUsers } from "@/api/role";
import { listRoleGrantedMenu, grantSave } from "@/api/menu";
import RoleForm from "./components/RoleForm";
import SystemSelect from "@/views/public/system/SystemSelect";
import MenuSelect from "../menu/components/MenuSelect";
import UserSelect from "@/views/public/user/UserSelect";
export default {
  name: "PermissionRole",
  components: {
    RoleForm,
    MenuSelect,
    SystemSelect,
    UserSelect,
  },
  data() {
    return {
      loading: true,
      confirmLoading: false,
      visible: false,
      visibleUser: false,
      visibleDetails: false,
      modalTitle: "",
      activeKey: "页面权限",
      columns: [
        {
          title: "显示名称",
          dataIndex: "name",
          key: "name",
          ellipsis: true,
          width: "200px",
        },
        {
          title: "权限名称",
          dataIndex: "code",
          ellipsis: true,
          width: "200px",
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          ellipsis: true,
          width: "200px",
        },
        {
          title: "更新时间",
          dataIndex: "updateTime",
          ellipsis: true,
          width: "200px",
        },
        {
          title: "说明",
          dataIndex: "remark",
          ellipsis: true,
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          width: "200px",
          fixed: "right",
        },
      ],
      columns2: [
        {
          title: "姓名",
          dataIndex: "fullName",
          key: "fullName",
          ellipsis: true,
        },
        {
          title: "工号",
          dataIndex: "userNo",
          key: "userNo",
          ellipsis: true,
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          fixed: "right",
        },
      ],
      statusMap: statusMap,
      data: [],
      dataRoles: [],
      dataUsers: [],
      selectedUsers: [],
      pagination: { size: "small" },
      params: {
        page: 1,
        limit: 20,
        sid: "",
      },
      currentRow: {},
      menuSelectedKeys: [],
      spinning: false,
    };
  },
  computed: {},
  methods: {
    onSelectChange(key) {
      this.loading = true;
      this.params.sid = key;
      this.currentRow = {};
      this.dataUsers = [];
      this.dataRoles = [];
      this.menuSelectedKeys = [];
      this.handleLoad();
    },
    handleTableChange(pagination, filters, sorter) {
      this.params = {
        ...this.params,
        limit: pagination.pageSize,
        page: pagination.current,
      };
      this.handleLoad();
    },
    handleLoad(params) {
      this.loading = true;
      if (params) {
        this.params = { ...this.params, ...params };
      }
      page(this.params)
        .then(({ data }) => {
          const pagination = { ...this.pagination };
          this.data = data.records;
          pagination.total = data.total;
          this.pagination = pagination;
          if (this.data && this.data.length) {
            this.onCellClick(this.data[0]);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleOk(e) {
      this.confirmLoading = true;
      this.$refs.form.onSubmit();
    },
    handleCancel(e) {
      this.$refs.form.resetForm();
      this.visible = false;
    },
    onCellClick(row) {
      this.currentRow = row;
      this.loadData();
    },
    onEdit(row) {
      this.modalTitle = row ? "编辑角色" : "新增角色";
      this.visible = true;
      setTimeout(() => {
        if (!row) {
          row = { sid: this.params.sid };
        } else {
          this.currentRow = row;
        }
        this.$refs.form.loadData(row);
      }, 50);
    },
    onDetails(row) {
      this.modalTitle = "详情";
      this.visibleDetails = true;
      this.currentRow = row;
      listRoleGrantedMenu({ roleIds: [this.currentRow.id] }).then(({ data }) => {
        const list = data || [];
        this.menuSelectedKeys = list.map((t) => t.id);
        this.spinning = false;
      });
    },
    onSubmitDone(success) {
      this.confirmLoading = false;
      if (success) {
        this.handleCancel();
        this.handleLoad();
      }
    },
    onMenuSelectChange(keys) {
      this.menuSelectedKeys = keys;
    },
    onDelete(row) {
      remove({ id: row.id }).then((res) => {
        res.success ? this.$message.success("删除成功") : this.$message.error("删除失败");
        this.handleLoad({ page: 1 });
      });
    },
    onSaveMenu() {
      grantSave({ grantToId: this.currentRow.id, grantResIds: this.menuSelectedKeys }).then((res) => {
        res.success ? this.$message.success("授权成功") : this.$message.error("授权失败");
      });
    },
    onTabsChange(activeKey) {
      this.activeKey = activeKey;
      this.loadData();
    },
    loadData() {
      if (!this.currentRow.id) {
        return;
      }
      this.spinning = true;
      if (this.activeKey === "角色成员") {
        listUsersByRoleId({ roleId: this.currentRow.id }).then(({ data }) => {
          this.dataRoles = data;
          this.dataUsers = data;
          this.spinning = false;
        });
      } else {
        listRoleGrantedMenu({ roleIds: [this.currentRow.id] }).then(({ data }) => {
          const list = data || [];
          this.menuSelectedKeys = list.map((t) => t.id);
          this.spinning = false;
        });
      }
    },
    onDeleteUser(row) {
      removeUser({ roleId: this.currentRow.id, userIds: [row.userId] }).then((res) => {
        res.success ? this.$message.success("移除成功") : this.$message.error("移除失败");
        this.loadData();
      });
    },
    onAddUsers() {
      this.visibleUser = true;
    },
    handleUserOk(e) {
      if (this.selectedUsers.length > 0) {
        const userIds = this.selectedUsers.map((t) => t.key).join(",");
        addRoleUsers({ roleId: this.currentRow.id, userIds: userIds })
          .then((res) => {
            res.success ? this.$message.success("添加成功") : this.$message.error("添加失败");
          })
          .finally(() => {
            this.handleUserCancel();
            this.loadData();
          });
      } else {
        this.$message.warning("请选择用户");
      }
    },
    handleUserCancel(e) {
      this.visibleUser = false;
      this.selectedUsers = [];
    },
    onDetailsClose() {
      this.visibleDetails = false;
    },
  },
};
</script>
