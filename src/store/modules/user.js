import { login, logout, getInfo, getMenu } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_UUID: (state, uuid) => {
    state.uuid = uuid
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { obj } = response
        commit('SET_UUID', obj.userUuid)
        // commit('SET_ROLES', [obj.userRoleUuid])
        // commit('SET_NAME', obj.userName)
        // commit('SET_PHONE', obj.userPhone)
        setToken(obj.userUuid)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.uuid).then(response => {
        const { obj } = response

        if (!obj) {
          reject('Verification failed, please Login again.')
        }
        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        commit('SET_NAME', obj.userName)
        commit('SET_PHONE', obj.userPhone)
        getMenu().then(res => {
          commit('SET_ROLES', res.data)
          obj.roles = res.data
          resolve(obj)
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

