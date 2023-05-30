<template>
  <div>
    <a-select
      v-model.trim="sid"
      show-search
      style="width: 200px"
      @change="onSelectChange"
    >
      <a-select-option v-for="item in selectData" :key="item.sid" :value="item.sid">
        {{ item.name }}
      </a-select-option>
    </a-select>
    <a-divider />
    <a-transfer
      class="tree-transfer"
      :list-style="{
        width: '250px'
      }"
      :operations="['添加','移除']"
      :render="record => record.title "
      :data-source="dataSource"
      :target-keys="targetKeys"
      :show-select-all="true"
      @change="onChange"
    >
      <template
        slot="children"
        slot-scope="{ props: { direction, selectedKeys }, on: { itemSelect } }"
      >
        <a-tree
          v-if="direction === 'left'"
          block-node
          checkable
          :style="{width:'270px',overflow:'hidden'}"
          check-strictly
          :expanded-keys.sync="expandedKeys"
          :checked-keys="[...selectedKeys, ...targetKeys]"
          :tree-data="handleTreeData(treeData)"
          @check="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect);
            }
          "
          @select="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect);
            }
          "
        >
          <template slot="title" slot-scope="{ title }" />
        </a-tree>
      </template>
      <a-button
        slot="footer"
        slot-scope="props"
        size="small"
        style="float:right;margin: 5px"
        @click="loadData(sid,[])"
      >
        刷新
      </a-button>
      <span slot="notFoundContent">
        没数据
      </span>
    </a-transfer>
  </div>
</template>
<script>
import { listBy } from '@/api/resource'
import { list } from '@/api/system'
function isChecked(selectedKeys, eventKey) {
  return selectedKeys.indexOf(eventKey) !== -1
}

function handleTreeData(data, targetKeys = []) {
  data.forEach(item => {
    if (item.status === 0 || item.type === 'api_group') {
      item['disabled'] = true
    } else {
      item['disabled'] = targetKeys.includes(item.key)
    }
    if (item.children) {
      handleTreeData(item.children, targetKeys)
    }
  })
  return data
}

export default {
  name: 'ApiSelect',
  props: {
    selectedKeys: {
      type: Array
    }
  },
  data() {
    return {
      sid: '',
      expandedKeys: [],
      selectData: [],
      dataSource: [],
      treeData: [],
      targetKeys: this.selectedKeys
    }
  },
  computed: {
    handleTreeData() {
      return function(data) {
        return handleTreeData(data, this.targetKeys)
      }
    }
  },
  methods: {
    loadData(sid, targetKeys) {
      this.sid = sid
      if (targetKeys) {
        this.targetKeys = targetKeys
      }
      listBy().then(({ data }) => {
        this.selectData = data
      })

      this.onSelectChange(sid)
    },
    onChange(targetKeys, direction, moveKeys) {
      this.targetKeys = targetKeys
      this.$emit('onChange', targetKeys, direction, moveKeys)
    },
    onSelectChange(value) {
      getList({ types: ['api_group', 'api'], sid: value }).then(({ data }) => {
        data.forEach(t => {
          t.key = t.id
          t.title = t.type === 'api_group' ? t.name : t.name + '-' + t.path
        })
        // 转换树
        const flatten = JSON.parse(JSON.stringify(data))
        const tree = this.$utils.toArrayTreeExt(flatten)
        // 默认展开第一个节点和第二个节点
        this.expandedKeys.length = 0
        tree.forEach((item) => {
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
        this.dataSource = data
      })
    },
    onChecked(_, e, checkedKeys, itemSelect) {
      const { eventKey } = e.node
      itemSelect(eventKey, !isChecked(checkedKeys, eventKey))
    },
    filterOption(inputValue, option) {
      return option.title.indexOf(inputValue) > -1
    }
  }
}
</script>
<style scoped>
  .tree-transfer .ant-transfer-list:first-child {
    width: 50%;
    flex: none;
  }
</style>
