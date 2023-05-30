<template>
  <div>
    <a-result status="404" title="404" sub-title="对不起, 当前页面不存在.">
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
