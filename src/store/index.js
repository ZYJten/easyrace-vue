import { createStore } from 'vuex'
import Vuex from 'vuex'
import { USERLOGIN, USERLOGOUT, SETCRUMBOBJ } from './types'



// export default createStore({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
const state = {
  isLogin: false,
  token: null,
  crumbObj: {}
}

const mutations = {
  /*用户登录*/
  [USERLOGIN](state, payload) {
    state.isLogin = true
    state.token = payload
    window.sessionStorage.setItem('token', payload)
    window.sessionStorage.setItem('isLogin', true)
  },
  /*用户注销*/
  [USERLOGOUT](state) {
    state.isLogin = false
    state.token = null
    window.sessionStorage.clear('token')
    window.sessionStorage.clear('isLogin')
  },
  /*面包屑*/
  [SETCRUMBOBJ](state, payload) {
    state.crumbObj = payload
    window.sessionStorage.setItem('crumbObj', JSON.stringify(payload))
  }
}

const getters = {
  token: (state) => state.token
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
