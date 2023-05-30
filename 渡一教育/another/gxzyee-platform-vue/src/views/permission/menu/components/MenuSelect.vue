<template>
  <div>
    <a-collapse v-model.trim="activeKey" expand-icon-position="left"  >
      <a-collapse-panel v-for="(value, key) in group" :key="key">
       <span slot="header">
        {{ value.name }}({{ key }})
      </span>
       <a-table
                :row-selection="{ selectedRowKeys: targetKeys, onChange: onTableSelectChange,onSelect: onTableSelect,onSelectAll:onTableSelectAll }"
                :loading="loading"
                :row-key="record => record.id"
                :columns="columns"
                :data-source="group[key]['menu']"
                :default-expand-all-rows="true"
                :pagination="false"
        >
          <template slot="action" slot-scope="text , record">
            <a-row>
              <a-col v-for="c in record['element']" :key="c.id" :span="3">
                <a-checkbox :checked="targetKeys.includes(c.id)" :value="c.id" @change="onChange">
                  {{ c.name }}
                </a-checkbox>
              </a-col>
            </a-row>
          </template>
        </a-table>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import { list } from '@/api/menu'

const columns = [
  {
    title: '页面',
    dataIndex: 'name',
    key: 'name',
    width: '30%'
  },
  {
    title: '操作项',
    dataIndex: 'code',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'MenuSelect',
  props: {
    selectedKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      group: {},
      activeKey:[],
      dataSource: [],
      selectData: [],
      treeData: [],
      columns: columns,
      defaultTargetKeys: [],
      targetKeys: [],
      indeterminate: false
    }
  },
  created() {
    this.initData()
  },
  watch: {
    selectedKeys(val, oldVal) {
      this.targetKeys = val
    }
  },
  methods: {
    initData() {
      list({ status: 1 }).then(({ data }) => {
        const obj = {}
        const activeKey = []
        data.forEach(t => {
          t.key = t.id
          t.title = `${t.name}`
          t.label = `${t.name}`
          t.value = t.id
          if (!obj[t.sid]) {
            const source = data.filter(j => j.sid === t.sid && j.type === 'menu')
            obj[t.sid] = { name: t.sysName, data: source }
            activeKey.push(t.sid)
          }
          const btn = data.filter(j => j.parentId === t.id && j.type !== 'menu')
          t['element'] = btn
        })

        // 转换树
        Object.values(obj).forEach(value => {
          const flatten = JSON.parse(JSON.stringify(value['data']))
          const tree = this.$utils.toArrayTreeExt(flatten)
          value['menu'] = tree
        })
        this.group = { ...obj }
        this.dataSource = data
        this.activeKey = activeKey
      })
    },
    loadData(targetKeys) {
      if (targetKeys) {
        this.targetKeys = targetKeys
        this.defaultTargetKeys = this.targetKeys
      }
    },
    onChange(e) {
      if (e.target.checked) {
        this.targetKeys = this.$utils.union(this.targetKeys, [e.target.value])
      } else {
        this.$utils.remove(this.targetKeys, item => item === e.target.value)
      }
      this.$emit('change', this.targetKeys)
    },
    onTableSelectChange(selectedRowKeys) {
      this.targetKeys = selectedRowKeys
    },
    onTableSelect(record, selected, selectedRows, all) {
      this.dataSource.filter(t => t.id === record.id).forEach(t => {
        const ids = t['element'].map(j => j.id)
        if (selected) {
          this.targetKeys = this.$utils.union(this.targetKeys, ids)
        } else {
          this.$utils.remove(this.targetKeys, item => ids.includes(item))
        }
      })
      if (typeof (all) === 'object') {
        this.$emit('change', this.targetKeys)
      }
    },
    onTableSelectAll(selected, selectedRows, changeRows) {
      changeRows.forEach(t => {
        this.onTableSelect(t, selected, selectedRows, true)
      })
      this.$emit('change', this.targetKeys)
    }
  }
}
</script>
