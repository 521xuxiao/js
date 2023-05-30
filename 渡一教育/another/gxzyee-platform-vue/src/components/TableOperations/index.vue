<template>
  <div class="table-operations">
    <div class="table-operations-left">
      <slot />
    </div>
    <div class="table-operations-right">
      <!-- <a-input :placeholder="placeholder" v-model.trim="searchValue" @keyup.enter="handleSearch ">
        <a-icon slot="addonAfter" type="search" @click="handleSearch" />
      </a-input> -->
      <a-input-search v-model.trim="searchValue" :placeholder="placeholder" enter-button @keyup.enter="handleSearch " />

      <a-button shape="circle" icon="close" class="input-clear-btn" @click="handleClearValue" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableOpeartions',
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    handleClearValue() {
      this.searchValue = ''
    },
    handleSearch() {
      if (!this.searchValue) return false
      this.$emit('search', this.searchValue)
    }
  }

}
</script>
<style lang="less">
.table-operations {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .table-opeartions-left,
  .table-operations-right {
    display: flex;
    align-items: center;
    // justify-content: center;
  }
  .table-operations-right {
    .input-clear-btn {
      margin-left: 10px;
    }
  }
}
</style>
