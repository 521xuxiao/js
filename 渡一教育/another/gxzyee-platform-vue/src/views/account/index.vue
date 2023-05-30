<template>
  <div>
    <a-card style="height: 100%">
      <a-row :gutter="16" type="flex">
        <a-col>
          <a-menu style="width: 224px" mode="vertical" @click="handleClick">
            <a-menu-item key="/account/base">
              基本设置
            </a-menu-item>
            <a-menu-item key="/account/security">
              安全设置
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col flex="auto">
          <router-view />
        </a-col>
      </a-row>
    </a-card>

    <a-upload
      name="file"
      :multiple="true"
      :action="onUpload"
    >
      <a-button> <a-icon type="upload" /> 测试上传 </a-button>
    </a-upload>
  </div>
</template>
<script>
import { upload } from '@/api/user'
export default {
  name: 'Account',
  data() {
    return {}
  },
  methods: {
    handleClick({ item, key, keyPath }) {
      this.$router.push(key)
    },
    onUpload(file) {
      return new Promise((resolve, reject) => {
        const data = new FormData()
        data.append('file', file)
        data.append('name', 'w22222')
        upload(data)
        reject()
      })
    }
  }
}
</script>
