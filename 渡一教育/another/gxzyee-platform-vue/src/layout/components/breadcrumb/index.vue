<template>
  <a-breadcrumb :routes="filterRoute">
    <template v-if="route.meta && !route.meta.hidden" slot="itemRender" slot-scope="{ route, routes }">
      <router-link v-if="isBreadcrumbLink(routes, route)" :to="route.path">
        <span v-if="$i18n.locale ==='zh'">{{ route.meta.title }}</span>
        <span v-else>{{ $t(`routes.${route.name}`) }}</span>
      </router-link>
      <span v-else>
        <span v-if="$i18n.locale ==='zh'">{{ route.meta.title }}</span>
        <span v-else>{{ $t(`routes.${route.name}`) }}</span>
      </span>
    </template>
  </a-breadcrumb>
</template>
<script>
export default {
  data() {
    return {
      filterRoute: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        const matchedRoute = this.$route.matched.map((r) => {
          const { meta, path, name } = r
          return { meta, path, name }
        })

        const filterRoute = matchedRoute.slice(1)
        if (this.$route.path !== '/home') {
          // 如果不是首页
          filterRoute.unshift({
            path: '/home',
            name: 'Home',
            meta: {
              title: '主页'
            }
          })
        }
        this.filterRoute = filterRoute
      }
    }
  },
  methods: {
    isBreadcrumbLink(routes, route) {
      return (
        routes.indexOf(route) === routes.length - 1 ||
        (route.meta ? route.meta.breadcrumbLink || false : false)
      )
    }
  }
}
</script>
<style lang="less">
.breadcrumb {
  z-index: 2;
}
</style>
