<template>
  <keep-alive :include="cachedViews">
    <router-view v-if="isRouterAlive" ref="child" />
  </keep-alive>
</template>
<script>
export default {
  name: 'BlankLayout',
  data() {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  },
  created() {
    this.$bus.on('reload-view', this.reload)
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>
