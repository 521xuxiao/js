import { isArray } from 'lodash'
import user from '@/store/modules/user'

export default {
  inserted(el, binding) {
    const permissionArr = binding.value
    // 判断传入参数是否是一个数组
    if (isArray(permissionArr)) {
      const auths = user.getters.getAuth()
      if (!permissionArr.some(item => {
        return auths.includes(item)
      })) {
        // 没有权限移除元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error("The argument to 'v-has' must be an array")
    }
  }
}
