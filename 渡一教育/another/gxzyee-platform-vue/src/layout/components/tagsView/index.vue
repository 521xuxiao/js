<template>
  <div class="router-tags">
    <div class="tags-view">
      <div class="tags-box" :style="{ left: -leftValue + 'px' }" @click.stop>
        <a-dropdown v-for="tag in visitedViews" :key="tag.title" :trigger="['contextmenu']">
          <router-link
            :key="tag.title"
            ref="tag"
            class="tag-item"
            :class="isActiveTag(tag) ? 'tag-active' : ''"
            :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
            @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
            @contextmenu.prevent.native="openMenu(tag,$event)"
          >
            <span v-if="$i18n.locale ==='zh'">{{ tag.title }}</span>
            <span v-else>{{ $t(`routes.${tag.name}`) }}</span>
            <a-icon
              v-if="isActiveTag(tag)"
              type="reload"
              :spin="spin"
              @click.prevent.stop="refreshSelectedTag(tag)"
            />
            <a-icon
              v-if="!isAffix(tag)"
              type="close"
              class="icon-tag-close"
              @click.prevent.stop="closeSelectedTag(tag)"
            />
          </router-link>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="refresh">{{ $t('tagsView.refresh') }}</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="close" :disabled="isAffix(tag)">{{ $t('tagsView.close') }}</a-menu-item>
            <a-menu-item key="closeOthers">{{ $t('tagsView.closeOthers') }}</a-menu-item>
            <a-menu-item key="closeAll">{{ $t('tagsView.closeAll') }}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <div class="tag-control">
      <a-button
        :disabled="leftDisabled"
        icon="left"
        class="tag-control-btn"
        @click="handleLeftOffset"
      />
      <a-dropdown>
        <a-button icon="more"></a-button>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="refresh" >{{ $t('tagsView.refresh') }}</a-menu-item>
          <a-menu-item key="close" :disabled="isAffix(selectedTag)">{{ $t('tagsView.close') }}</a-menu-item>
          <a-menu-item key="closeOthers">{{ $t('tagsView.closeOthers') }}</a-menu-item>
          <a-menu-item key="closeAll">{{ $t('tagsView.closeAll') }}</a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-button
        :disabled="rightDisabled"
        icon="right"
        class="tag-control-btn"
        @click="handleRightOffset"
      />
    </div>
  </div>
</template>
<script>
import path from 'path'
export default {
  name: 'RouterTags',
  data() {
    return {
      tagsBox: null,
      offset: 200,
      leftValue: 0,
      viewWidth: 0, // 可见宽度
      realWidth: 0, // 实际宽度
      leftDisabled: true,
      rightDisabled: true,
      affixTags: [],
      selectedTag: {},
      spin: false,
      visible: false,
      top: 0,
      left: 0
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route(v) {
      this.addTags(v)
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
    viewWidth(newVal, oldVal) {
      if (oldVal) {
        if (newVal > oldVal) {
          // 放大页面
          if (this.viewWidth < this.realWidth) {
            const overValue = this.leftValue + newVal - this.realWidth - 16
            if (overValue > 0) {
              this.leftValue -= overValue
            }
          } else {
            this.leftValue = 0
          }
        } else {
          // 缩小页面
          this.leftDisabled = this.leftValue + this.viewWidth > this.realWidth
        }
      }
    },
    visitedViews() {
      this.$nextTick(() => {
        this.realWidth = this.tagsBox.clientWidth
        this.leftDisabled = this.realWidth <= this.viewWidth
        if (this.realWidth > this.viewWidth) {
          const overValue = this.realWidth - this.viewWidth + 16
          this.leftValue = overValue
        } else {
          this.leftValue = 0
        }
      })
    }
  },
  mounted() {
    this.tagsBox = document.querySelector('.tags-box')
    const tagsView = document.querySelector('.tags-view')

    setTimeout(() => {
      this.realWidth = this.tagsBox.clientWidth
      this.viewWidth = tagsView.clientWidth
      this.initTags()
    }, 1)
    window.addEventListener('resize', () => {
      this.viewWidth = tagsView.clientWidth // 可见宽度/
    })
  },
  methods: {
    isActiveTag(tag) {
      if (this.selectedTag.meta && this.selectedTag.meta.hidden) { return true }
      return tag.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && (tag.meta.affix || false)
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          route.fullPath = tagPath
          route.path = tagPath
          tags.push(route)
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    addTags(tag) {
      if (tag.meta && tag.meta.hidden) { return }
      const { name } = tag
      if (name) {
        this.selectedTag = tag
        this.$store.dispatch('tagsView/addView', tag)
      }
      return false
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.$router.getRoutes())
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.addTags(tag)
        }
      }
      this.addTags(this.$route)
    },
    handleLeftOffset() {
      this.rightDisabled = false
      const viewWidth = this.tagsBox.parentNode.offsetWidth // 可见宽度
      const realWidth = this.tagsBox.scrollWidth // 实际宽度
      const isMove =
            this.leftValue + this.offset + viewWidth < realWidth
      if (isMove) {
        this.leftValue += this.offset
      } else {
        const finalOffset = realWidth - this.leftValue - viewWidth
        this.leftValue += finalOffset + 16
        this.leftDisabled = true
      }
    },
    handleRightOffset() {
      this.leftDisabled = false
      if (this.leftValue >= this.offset) {
        this.leftValue -= this.offset
      } else {
        this.leftValue = 0
        this.rightDisabled = true
      }
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        this.$router.push('/')
      }
    },
    refreshSelectedTag(view) {
      this.spin = true
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          // 切换到当前路由
          this.$router.push({ path: fullPath })
          // 使用消息总线刷新视图
          this.$bus.emit('reload-view')
          // 添加缓存
          this.$store.dispatch('tagsView/addCachedView', view)
        })
        const that = this
        setTimeout(function() {
          that.spin = false
        }, 1000)
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActiveTag(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        if (!this.isActiveTag(this.selectedTag)) {
          this.$router.push(this.selectedTag)
        }
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    openMenu(tag, e) {
      this.selectedTag = tag
    },
    handleMenuClick(e) {
      const { key } = e
      if (key === 'refresh') {
        this.refreshSelectedTag(this.selectedTag)
      }
      if (key === 'close') {
        this.closeSelectedTag(this.selectedTag)
      }
      if (key === 'closeOthers') {
        this.closeOthersTags()
      }
      if (key === 'closeAll') {
        this.closeAllTags(this.selectedTag)
      }
    }
  }
}
</script>
<style lang="less">
  @import '~ant-design-vue/dist/antd.less';
    .router-tags {
        position: relative;
        padding-left: 16px;
        height: 45px;
        background: #fff;
        border-bottom: 1px solid #eee;
        .tag-control {
            position: absolute;
            top: 7px;
            right: 0;

            .ant-btn {
                font-size: 12px;
                 border: 0;
                border-radius: 0 !important;
            }

            .tag-control-btn {
                width: 20px;
            }
        }

        .tags-view {
            width: calc(100% - 90px);
            height: 100%;
            overflow: hidden;
            position: absolute;
        }

        .tags-box {
            display: inline-block;
            white-space: nowrap;
            position: absolute;
            transition: left 0.2s;

          .tag-item {
                background: #fafafa;
                margin-top: 8px;
                color: #000;
                background: #fafafa;
                border: 1px solid #f0f0f0;
                transition: all .3s cubic-bezier(.645,.045,.355,1);
                outline: none;
                cursor: pointer;
                font-size: 14px;
                padding: 0 16px;
                line-height: 30px;
                border-radius: 4px;
                display: inline-block;
            }

          .tag-item+.tag-item {
            margin-left: 2px;
          }

          .tag-active {
                color: @primary-color;
                background: #fff;
            }

            .anticon {
                 margin-left: 8px;
                color: rgba(0, 0, 0, .45);
                font-size: 12px;
            }

            .anticon:hover {
                color: #000;
            }
        }

        .contextmenu {
            margin: 0;
            background: #fff;
            z-index: 3000;
            position: absolute;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
        }
    }
</style>
