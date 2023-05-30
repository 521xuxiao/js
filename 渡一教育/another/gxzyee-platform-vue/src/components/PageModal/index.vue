<template>
    <div v-if="visible" :id="el"  class="page-modal">
        <a-card style="width: 100%;" :title="title">
            <template slot="extra">
               <a-button @click="onClose" type="primary" ><a-icon type="left" />返回</a-button>
            </template>
            <div class="page-modal-content">
                <slot></slot>
            </div>
        </a-card>
    </div>
</template>
<script>
export default {
  name: 'PageModal',
  // 双向绑定
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
      required: true,
      default: () => { return false }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          const div = document.getElementById(this.el)
          if (div) {
            const parentNode = document.querySelector('.main-content>div')
            parentNode.style.position = 'relative'
            parentNode.appendChild(div)
          }
        })
      } else {
        const parentNode = document.querySelector('.main-content>div')
        parentNode.style.position = 'none'
      }
    }
  },
  data() {
    return {
      el: `pageModal-${new Date().getTime()}`
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    onClose() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less">
    .page-modal{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: #fff;
        width: 100%;
        height: 100%;
    }
</style>
