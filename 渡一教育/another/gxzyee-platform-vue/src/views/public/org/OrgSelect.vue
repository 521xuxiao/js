<template>
  <div>
    <a-tree-select
            v-model.trim="selectedItems"
            :tree-data="treeData"
            :multiple="multiple"
            :replace-fields="{children:'children', title:'name', key:'id', value: 'id' }"
            placeholder="请选择"
            allow-clear
            @change="onChange"
            tree-default-expand-all
    />
  </div>
</template>
<script>
import { list} from '@/api/org'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  name: 'OrgSelect',
  props: {
    value:{
      type: [String,Object,Array]
    },
    // 设置 Select 的模式为多选或标签 'default' | 'multiple' | 'tags' | 'combobox'
    multiple: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      selectedItems: this.value,
      treeData: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      list().then(({ data }) => {
        const opt = {
          key: 'id',
          parentKey: 'parentId',
          children: 'children'
        }
        const tree = this.$utils.toArrayTreeExt(data, opt)
        this.treeData = tree
        this.selectedItems = this.value
      })
    },
    onChange(value, label, extra) {
      this.selectedItems = value
      this.$emit('change', value)
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
