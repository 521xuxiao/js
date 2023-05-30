import { list } from '@/api/dict.js'
const state = {
  system: {}, // 系统字典
  other: {} // 其他字典
}

const mutations = {
  SET_SYSTEM(state, obj) {
    const { key, value } = obj
    try {
      state.system = { ...state.system, [key]: value }
    } catch (error) {
      console.log(error)
    }
  }
}

const actions = {
  /**
   *  args ['dict1','dict2']
   */
  system(context, args) {
    return new Promise((resolve, reject) => {
      // 数据字典
      const dict = state.system
      const params = args.reduce((o, v, i) => {
        // 当缓存中没有时添加到请求中
        if (!dict[v]) {
          o.push(v)
        }
        return o
      }, [])
      if (params.length === 0) { // 当缓存中存在时从缓存中拿数据
        resolve(true)
        return false
      }
      list({ sid: process.env.VUE_APP_SID, category: params.join(','), status: 1 })// 请求新数据字典存入vuex中
        .then(res => {
          const value = res.data || []
          const groups = {}
          value.forEach(function(o) {
            const group = o.category
            groups[group] = groups[group] || []
            groups[group].push(o)
          })
          Object.keys(groups).map(t => {
            context.commit('SET_SYSTEM', {
              key: t,
              value: groups[t]
            })
          })
          resolve(true)
        }).catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  // 开启命名空间，防止多模块命名冲突，调用方式： this.$store.dispatch('dict/system') 或者 ...mapActions('user', ['Logout'])
  namespaced: true,
  state,
  mutations,
  actions
}
