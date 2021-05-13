import api from '../../api/index'
import jwt from 'jwt-decode'
import router from '../../router'
import element from 'element-ui'
export default {
  namespaced: true,
  state: {
    userInfo: {
      username: '',
      token: '',
      isLogined: false,
    },
  },
  mutations: {
    setUserInfo (state, params) {
      state.userInfo = params
    }
  },
  actions: {
    setUserInfoActions ({ commit }, params) {
      api.getLogin(params).then(res => {
        if (res.status === 200) {
          let temp = {
            username: jwt(res.data).username,
            token: res.data,
            isLogined: true
          }
          commit('setUserInfo', temp)
          localStorage.setItem('userInfo', JSON.stringify(temp))
          router.push('/')
        } else {
          element.Message.error('账户或密码错误')
        }
      })
    },
    setRegister ({ commit }, params) {
      api.register(params).then(res => {
        console.log(res)
        if (res.status === 200) {
          element.Message.success('注册成功,请登录')
        }
      })
    }
  }
}