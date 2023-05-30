<template>
  <a-config-provider :locale="antdLang">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  name: 'App',
  data() {
    return {
      // locale: zh_CN,
    }
  },
  computed: {
    ...mapGetters('app', {
      antdLang: 'getAntdLang'
    })
  }
}
</script>
<style>
  #app {
    height: 100%;
  }
</style>
