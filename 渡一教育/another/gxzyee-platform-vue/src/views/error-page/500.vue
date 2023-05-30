<template>
  <div>
    <a-result status="500" title="500" sub-title="对不起, 服务出错了.">
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
