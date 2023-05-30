import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

const state = {
  lang: '',
  antdLang: null,
  sidebar: true,
  device: 'desktop'
}

const mutations = {
  SET_LANG(state, lang) {
    const antdLang = lang === 'zh' ? zh_CN : null
    state.antdLang = antdLang
    state.lang = lang
    localStorage.setItem('lang', lang)
  },
  SET_SIDEBAR_TYPE: (state, type) => {
    state.sidebar = type
  },
  CLOSE_SIDEBAR: (state) => {
    state.sidebar = false
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const getters = {
  getLang() {
    return state.lang || localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh'
  },
  getAntdLang() {
    const antdLang = getters.getLang() === 'zh' ? zh_CN : null
    return antdLang
  }
}

const actions = {
  setLang({ commit }, lang) {
    commit('SET_LANG', lang)
  },
  setSidebar({ commit }, type) {
    commit('SET_SIDEBAR_TYPE', type)
  },
  CloseSidebar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  ToggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
