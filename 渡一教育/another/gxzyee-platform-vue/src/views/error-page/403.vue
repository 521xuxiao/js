<template>
  <div>
    <a-result status="403" title="403" sub-title="对不起, 你没有权限访问该页面.请联系管理员！">
      <template #extra>
        <a-button type="primary">
          Back Home
        </a-button>
      </template>
    </a-result>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
