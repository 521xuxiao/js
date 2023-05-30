<template>
  <div>
    <a-menu style="width: 190px;height: 100%" :default-selected-keys="defaultSelectedKeys" mode="inline" @click="handleClick">
        <a-menu-item v-for="item in list" :key="item.sid">
          {{ item.name }}
        </a-menu-item>
    </a-menu>
  </div>
</template>
<script>

import { list } from '@/api/system'
export default {
  name: 'SystemMenu',
  data() {
    return {
      list: [],
      defaultSelectedKeys: []
    }
  },
  mounted() {
  },
  created() {
    this.loadData()

    this.$bus.on('load-system', this.loadData)
  },
  beforeDestroy() {
    this.$bus.off('load-system')
  },
  methods: {
    loadData() {
      list().then(res => {
        this.list = res.data
        if (this.list && this.list.length > 0) {
          const item = this.list[0]
          this.defaultSelectedKeys.push(item.sid)
          this.handleClick({ item, key: item.sid, keyPath: '' })
        }
      })
    },
    handleClick({ item, key, keyPath }) {
      this.$emit('click', key)
    }
  }
}
</script>
