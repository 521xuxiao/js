import { getToken, setToken, removeToken } from '@/utils'
import { getInfo, logout } from '@/api/user'

const state = {
  token: '',
  name: '',
  userNo: '',
  avatar: '',
  introduction: '',
  roles: [],
  auth: null
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    setToken(token)
  },
  SET_AUTH(state, auth) {
    state.auth = auth
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_USER_NO(state, userNo) {
    state.userNo = userNo
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },
  SET_INTRODUCTION(state, introduction) {
    state.introduction = introduction
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  }
}

const getters = {
  getToken() {
    return getToken()
  },
  getAuth() {
    return state.auth
  }
}

const actions = {
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  removeToken({ commit }) {
    commit('REMOVE_TOKEN')
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        resolve()
      }).catch(error => {
        reject(error)
      }).finally(() => {
        commit('REMOVE_TOKEN')
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const { data } = res

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { menus, roles, fullName, avatar, remark, userNo } = data
        // access must be a non-empty array
        let auth = []
        if (menus) {
          auth = menus.map((t) => {
            return t.authority
          })
        }
        commit('SET_AUTH', auth)
        commit('SET_USER_NO', userNo)
        commit('SET_ROLES', roles)
        commit('SET_NAME', fullName)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', remark)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
