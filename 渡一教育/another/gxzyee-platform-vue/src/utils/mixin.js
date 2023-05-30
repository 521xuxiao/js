// import Vue from 'vue'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  computed: {
    ...mapState({
      sidebarOpened: state => state.app.sidebar
    })
  },
  methods: {
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

const AppDeviceEnquire = {
  mounted() {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.dispatch('app/ToggleDevice', 'desktop')
          $store.dispatch('app/setSidebar', true)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.dispatch('app/ToggleDevice', 'mobile')
          $store.dispatch('app/setSidebar', false)
          break
      }
    })
  }
}

export { mixin, AppDeviceEnquire, mixinDevice }
