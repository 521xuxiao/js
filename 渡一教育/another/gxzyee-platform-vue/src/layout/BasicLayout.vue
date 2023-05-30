<template>
  <a-layout id="screen">

    <a-drawer class="sider-drawer" placement="left" :closable="false" :visible="collapsed" :width="200" @close="onClose"
      v-if="isMobile()">
      <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
        <div class="sider-logo">
          <a href="#">
            <img src="~@/assets/logo.png" width="32" />
            <h1>{{ title }}</h1>
          </a>
        </div>
        <side-bar />
      </a-layout-sider>
    </a-drawer>

    <a-layout-sider collapsed-width="48" v-model.trim="collapsed"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }" :header-collapsed-button="null"
      collapsible>
      <div class="sider-logo">
        <a href="#">
          <img src="~@/assets/logo.png" width="32" />
          <h1 v-if="!collapsed">{{ title }}</h1>
        </a>
      </div>
      <side-bar />
    </a-layout-sider>
    <a-layout v-watermark="{ text: userNo, text2: name }" :style="{ marginLeft: marginLeft }">
      <a-layout-header :style="{ width: `calc(100% - ${marginLeft})` }">
        <div class="header">

          <div v-if="isMobile()" class="header-logo">
            <a href="#">
              <img src="~@/assets/logo.png" width="32" />
            </a>
          </div>

          <div class="header-collapsed-button">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
          </div>
          <div class="header-bread-crumb">
            <bread-crumb v-if="!isMobile()" />
          </div>

          <div class="header-tools">
            <a-dropdown>
              <span class="dropdown-action">
                <a-badge :count="1000" :overflow-count="99">
                  <a-icon type="bell" :style="{ 'padding': '4px', 'vertical-align': 'middle' }" />
                </a-badge>
              </span>
            </a-dropdown>

            <a-dropdown>
              <span class="dropdown-action">
                <span class="account-avatar">
                  <a-avatar :src="avatar" size="small" />
                </span>
                <span class="account-name">{{ name }}</span>
              </span>
              <a-menu slot="overlay">
                <a-menu-item key="userCenter" @click="userCenter">
                  <a-icon type="user" />
                  {{
                      $t('system.account')
                  }}
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="layout" @click="signOut">
                  <a-icon type="logout" />
                  {{
                      $t('system.signOut')
                  }}
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <a-dropdown>
              <span class="dropdown-action">
                <a-icon type="global" />
              </span>
              <a-menu slot="overlay" :selected-keys="selectedLang" @click="onChangeLangClick">
                <a-menu-item v-for="item in language" :key="item.lang">
                  {{ item.title }}
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <div class="fixed-tags-view" :style="{ width: `calc(100% - ${marginLeft})` }">
        <tags-view></tags-view>
      </div>
      <a-layout-content>
        <div class="main-content">
          <!-- 缓存路由组件 -->
          <keep-alive :include="cachedViews">
            <router-view v-if="isRouterAlive" />
          </keep-alive>
        </div>
        <a-back-top />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SideBar from './components/sideBar'
import TagsView from './components/tagsView'
import BreadCrumb from './components/breadcrumb'
import { mapActions, mapGetters } from 'vuex'
import settings from '@/settings'
import { mixin, mixinDevice } from '@/utils/mixin'
import { triggerWindowResizeEvent, getToken, removeToken } from '@/utils'
export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    SideBar,
    TagsView,
    BreadCrumb
  },
  data() {
    return {
      collapsed: false,
      isLogin: '',
      title: settings.title,
      color: '',
      isRouterAlive: true,
      language: [
        { title: '简体中文', lang: 'zh' },
        { title: 'English', lang: 'en' }
      ]
    }
  },
  computed: {
    userNo() {
      return this.$store.state.user.userNo
    },
    name() {
      return this.$store.state.user.name
    },
    avatar() {
      return this.$store.state.user.avatar || ''
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    selectedLang() {
      return [this.$store.getters['app/getLang']]
    },
    marginLeft() {
      return this.isMobile() ? '0px' : (this.collapsed ? '48px' : '200px')
    }

  },
  mounted() {
    this.collapsed = !this.$store.state.app.sidebar
  },
  created() {
    console.log(process.env)
    this.$bus.on('reload-view', this.reload)
  },
  methods: {
    ...mapActions('user', {
      logout: 'logout'
    }),
    userCenter() {
      this.$router.push('/account')
    },
    async signOut() {
      let token = getToken();
      await removeToken()
      window.open(`${process.env.VUE_APP_OAUTH2_LOGOUT_URL}?clientId=${process.env.VUE_APP_OAUTH2_APP_KEY}&accessToken=${token}&redirectUri=${process.env.VUE_APP_OAUTH2_LOGOUT_URL}`, "_self")
    },
    onClose() {
      this.collapsed = false
    },
    onChangeLangClick({ key }) {
      const lang = key
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLang', lang)
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>
<style lang="less">
@import '~ant-design-vue/dist/antd.less';

.sider-drawer .ant-drawer-body {
  padding: 0px;
  height: 100%;
}

.main-content {
  padding: 12px 12px 0;
  width: 100%;
  height: 100%;
}

.sider-logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 16px;
  line-height: 32px;
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
  }

  img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }

  h1 {
    margin: 0 0 0 12px;
    overflow: hidden;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
  }
}

#screen {
  min-height: 100%;

  .ant-layout-header {
    position: fixed;
    z-index: 1000;
    padding: 0;
    background: rgb(255, 255, 255);
    height: 48px;
    line-height: 48px;

    .header {
      padding: 0 16px;
      display: flex;
      align-items: center;
      height: 100%;
      border-bottom: 1px solid #eee;

      .header-logo {
        a {
          display: flex;
          align-items: center;
          height: 100%;
        }
      }

      .header-collapsed-button {
        display: flex;
        align-items: center;
        font-size: 20px;
        margin-left: 16px;
      }

      .header-bread-crumb {
        flex: 1 1 0%;
        margin-left: 16px;
      }

      .header-tools {
        text-align: right;

        span {
          font-size: 16px !important;
          transform: none !important;
        }

        .account-avatar {
          margin: 12px 8px 12px 0;
          color: @primary-color;
          vertical-align: top;
          background: hsla(0, 0%, 100%, .85);
        }

        .account-name {
          vertical-align: unset;
        }

        .dropdown-action {
          padding: 0 12px;
          cursor: pointer;
          display: inline-block;
          height: 48px;
          line-height: 48px;
          cursor: pointer;
        }

        .dropdown-action:hover {
          background: rgba(0, 0, 0, .025);
        }
      }

    }
  }

  .fixed-tags-view {
    position: fixed;
    top: 48px;
    right: 0;
    z-index: 1000;
    background: rgb(255, 255, 255);
  }

  .ant-layout-content {
    margin-top: 93px;
  }

}
</style>
