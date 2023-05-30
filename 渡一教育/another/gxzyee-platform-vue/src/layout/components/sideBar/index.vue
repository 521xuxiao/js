<template>
  <div>
    <a-menu
      v-model.trim="selectKey"
      mode="inline"
      theme="dark"
      @select="handleSelect"
    >
      <template v-for="item in routes">
        <a-menu-item v-if="!item.children && !item.hidden" :key="item.path">
          <a-icon :type="item.icon" :style="{ fontSize: '16px' }"/>
          <template v-if="$i18n.locale ==='zh'">
            <a v-if="item.target" :href="item.target" target="_blank">{{ item.title }}</a>
            <span v-else> {{ item.title }}</span>
          </template>
          <template v-else>
            <a v-if="item.target" :href="item.target" target="_blank">{{ $t(`routes.${item.name}`) }}</a>
            <span v-else>{{ $t(`routes.${item.name}`) }}</span>
          </template>
        </a-menu-item>
        <sub-menu
          v-if="item.children && !item.hidden"
          :key="item.path"
          :menu="item"
        />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from 'ant-design-vue'
// import {
//   mapGetters
// } from 'vuex'
import { formatMenu } from './formatMenu.js'

const SubMenu = {
  template: `
            <a-sub-menu :key="menu.path" v-bind="$props" v-on="$listeners">
          <span slot="title">
             <a-icon :type="menu.icon" :style="{ fontSize: '16px' }"/>
             <template v-if="$i18n.locale ==='zh'">
                 <a v-if="menu.target" :href="menu.target" target="_blank">{{menu.title}}</a>
                 <span v-else> {{ menu.title }}</span>
             </template>
             <template v-else>
               <a v-if="menu.target" :href="menu.target" target="_blank">{{ $t('routes.' + menu.name) }}</a>
                 <span v-else> {{ $t('routes.' + menu.name) }}</span>
             </template>
          </span>
                <template v-for="subMenu in menu.children">
                    <a-menu-item v-if="!subMenu.children&&!subMenu.hidden" :key="subMenu.path">
                        <a-icon :type="subMenu.icon" :style="{ fontSize: '16px' }"/>
                        <template v-if="$i18n.locale ==='zh'">
                            <a v-if="subMenu.target" :href="subMenu.target" target="_blank">{{subMenu.title}}</a>
                            <span v-else> {{ subMenu.title }}</span>
                        </template>
                        <template v-else>
                            <a v-if="subMenu.target" :href="subMenu.target"
                               target="_blank">{{ $t('routes.' + subMenu.name) }}</a>
                            <span v-else> {{ $t('routes.' + subMenu.name) }}</span>
                        </template>
                    </a-menu-item>
                    <sub-menu v-if="subMenu.children && !subMenu.hidden" :key="subMenu.path" :menu="subMenu"/>
                </template>
            </a-sub-menu>
        `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menu: {
      type: Object,
      default: () => ({})
    }
  }
}
export default {
  components: {
    'sub-menu': SubMenu
  },
  data() {
    return {
      routes: [],
      selectKey: []
    }
  },
  watch: {
    '$route.path': {
      handler() {
        this.selectKey = this.$route.path.split()
      },
      immediate: true
    }
  },
  created() {
    this.routes = formatMenu(this.$store.state.menu.routes)
  },
  methods: {
    handleSelect({ key }) {
      if (!this.$utils.startsWith(key, '/')) {
        return
      }
      this.$router.push({ path: key })
    }
  }
}
</script>
<style >

</style>
