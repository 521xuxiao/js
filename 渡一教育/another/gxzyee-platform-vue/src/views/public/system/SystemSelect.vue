<template>
  <a-select
    v-model.trim="selected"
    show-search
    style="width: 150px"
    @change="onSelectChange"
  >
    <a-select-option v-for="item in selectData" :key="item.sid" :value="item.sid">
      {{ item.name }}
    </a-select-option>
  </a-select>
</template>
<script>

import { list } from '@/api/system'
export default {
  name: 'SystemSelect',
  model: {
    prop: 'value', // 指定父组件中v-model.trim绑定到子组件上的属性名
    event: 'change'// 指定子组件中属性发生改变的时候，触发父组件什么方法
  },
  props: {
    // 提供给父组件绑定的属性
    value: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      selectData: [],
      selected: ''
    }
  },
  watch: {
    // 监听value变化（slect控件不是必要，暂时不明）
    value(newValue, oldValue) {
      this.selected = newValue
    }
  },
  mounted() {
    this.loadData()
  },
  created() {
    this.$bus.on('load-system', this.loadData)
  },
  beforeDestroy() {
    this.$bus.off('load-system')
  },
  methods: {
    loadData() {
      list().then(res => {
        this.selectData = res.data
        if (this.selectData && this.selectData.length > 0) {
          const item = this.selectData[0]
          this.onSelectChange(item.sid)
        }
      })
    },
    onSelectChange(value) {
      this.selected = value
      this.$emit('change', value)
    }
  }
}
</script>
